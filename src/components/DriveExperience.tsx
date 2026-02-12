"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";

type ProjectSpot = {
  slug: string;
  name: string;
  headline: string;
  colorA: string;
  colorB: string;
  position: [number, number, number];
};

type CameraControls = {
  position: {
    x: number;
    y: number;
    z: number;
    lerp: (target: { x: number; y: number; z: number }, alpha: number) => void;
  };
  lookAt: (x: number, y: number, z: number) => void;
};

type RuntimeModules = {
  fiber: {
    Canvas: React.ComponentType<React.ComponentProps<"canvas"> & Record<string, unknown>>;
    useFrame: (callback: (state: { camera: CameraControls }, delta: number) => void) => void;
  };
  drei: {
    Environment: React.ComponentType<Record<string, unknown>>;
  };
  three: {
    MathUtils: { lerp: (a: number, b: number, alpha: number) => number };
  };
};

type Control = "forward" | "backward" | "left" | "right";

const importFromUrl = (url: string) =>
  new Function("moduleUrl", "return import(moduleUrl)")(url) as Promise<Record<string, unknown>>;

const projectSpots: ProjectSpot[] = projects.map((project, index) => ({
  slug: project.slug,
  name: project.name,
  headline: project.headline,
  colorA: project.heroPalette[0],
  colorB: project.heroPalette[1],
  position: [((index % 2) * 18) - 9, 0.8, Math.floor(index / 2) * -18]
}));

function ExperienceScene({
  runtime,
  onNearestChange,
  touchControls
}: {
  runtime: RuntimeModules;
  onNearestChange: (slug: string | null) => void;
  touchControls: Set<Control>;
}) {
  const carRef = useRef<{ position: { x: number; y: number; z: number }; rotation: { y: number } } | null>(
    null
  );
  const velocity = useRef({ x: 0, z: 0 });
  const keys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => keys.current.add(event.key.toLowerCase());
    const handleKeyUp = (event: KeyboardEvent) => keys.current.delete(event.key.toLowerCase());

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  runtime.fiber.useFrame((state, delta) => {
    if (!carRef.current) {
      return;
    }

    const acceleration = 16;
    const drag = 8;

    const forward = Number(
      keys.current.has("w") || keys.current.has("arrowup") || touchControls.has("forward")
    );
    const backward = Number(
      keys.current.has("s") || keys.current.has("arrowdown") || touchControls.has("backward")
    );
    const left = Number(
      keys.current.has("a") || keys.current.has("arrowleft") || touchControls.has("left")
    );
    const right = Number(
      keys.current.has("d") || keys.current.has("arrowright") || touchControls.has("right")
    );

    velocity.current.x += (right - left) * acceleration * delta;
    velocity.current.z += (backward - forward) * acceleration * delta;

    velocity.current.x = runtime.three.MathUtils.lerp(velocity.current.x, 0, drag * delta);
    velocity.current.z = runtime.three.MathUtils.lerp(velocity.current.z, 0, drag * delta);

    carRef.current.position.x += velocity.current.x * delta;
    carRef.current.position.z += velocity.current.z * delta;

    carRef.current.position.x = Math.max(-20, Math.min(20, carRef.current.position.x));
    carRef.current.position.z = Math.max(-36, Math.min(6, carRef.current.position.z));

    if (Math.abs(velocity.current.x) + Math.abs(velocity.current.z) > 0.06) {
      carRef.current.rotation.y = Math.atan2(velocity.current.x, velocity.current.z);
    }

    const nearest = projectSpots
      .map((spot) => {
        const dx = spot.position[0] - carRef.current!.position.x;
        const dz = spot.position[2] - carRef.current!.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        return { slug: spot.slug, distance };
      })
      .sort((a, b) => a.distance - b.distance)[0];

    onNearestChange(nearest.distance <= 5.2 ? nearest.slug : null);

    state.camera.position.lerp(
      {
        x: carRef.current.position.x,
        y: 14,
        z: carRef.current.position.z + 12
      },
      0.08
    );
    state.camera.lookAt(carRef.current.position.x, 0, carRef.current.position.z - 2.4);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight intensity={1.2} position={[10, 15, 7]} castShadow />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#8db584" />
      </mesh>

      {projectSpots.map((project) => (
        <group key={project.slug} position={project.position}>
          <mesh castShadow receiveShadow position={[0, 1, 0]}>
            <boxGeometry args={[5.2, 1.3, 3]} />
            <meshStandardMaterial color={project.colorA} />
          </mesh>
          <mesh castShadow position={[0, 2.3, 0]}>
            <boxGeometry args={[0.32, 1.2, 0.32]} />
            <meshStandardMaterial color="#2f2a26" />
          </mesh>
          <mesh castShadow position={[0, 3.05, 0]}>
            <boxGeometry args={[2.4, 0.7, 0.32]} />
            <meshStandardMaterial color={project.colorB} />
          </mesh>
        </group>
      ))}

      <group ref={carRef as never} position={[0, 0.8, 4]}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.7, 2.5]} />
          <meshStandardMaterial color="#cc5831" />
        </mesh>
        <mesh position={[0, 0.48, -0.2]} castShadow>
          <boxGeometry args={[1.15, 0.55, 1.2]} />
          <meshStandardMaterial color="#ffc38a" />
        </mesh>
        <mesh position={[0.62, -0.22, 0.84]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.35, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#1f1d1b" />
        </mesh>
        <mesh position={[-0.62, -0.22, 0.84]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.35, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#1f1d1b" />
        </mesh>
        <mesh position={[0.62, -0.22, -0.84]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.35, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#1f1d1b" />
        </mesh>
        <mesh position={[-0.62, -0.22, -0.84]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.35, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#1f1d1b" />
        </mesh>
      </group>

      <runtime.drei.Environment preset="sunset" />
    </>
  );
}

export function DriveExperience() {
  const [runtime, setRuntime] = useState<RuntimeModules | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [touchControls, setTouchControls] = useState<Set<Control>>(new Set());

  useEffect(() => {
    let cancelled = false;

    const loadRuntime = async () => {
      const [fiber, drei, three] = await Promise.all([
        importFromUrl("https://esm.sh/@react-three/fiber@8.17.14?external=react,react-dom,three"),
        importFromUrl(
          "https://esm.sh/@react-three/drei@9.120.3?external=react,react-dom,three,@react-three/fiber"
        ),
        importFromUrl("https://esm.sh/three@0.173.0")
      ]);

      if (!cancelled) {
        setRuntime({
          fiber: fiber as RuntimeModules["fiber"],
          drei: drei as RuntimeModules["drei"],
          three: three as RuntimeModules["three"]
        });
      }
    };

    loadRuntime().catch(() => setRuntime(null));

    return () => {
      cancelled = true;
    };
  }, []);

  const setControl = (control: Control, isActive: boolean) => {
    setTouchControls((prev) => {
      const next = new Set(prev);
      if (isActive) {
        next.add(control);
      } else {
        next.delete(control);
      }
      return next;
    });
  };

  const activeProject = useMemo(
    () => projectSpots.find((project) => project.slug === activeSlug) ?? null,
    [activeSlug]
  );

  if (!runtime) {
    return (
      <div className="drive-loading">
        <p>Loading low poly world…</p>
      </div>
    );
  }

  const Canvas = runtime.fiber.Canvas;

  return (
    <div className="drive-game-shell">
      <div className="drive-hud">
        <p>Drive with WASD / arrows or touch controls and park near a project table.</p>
      </div>

      <Canvas shadows camera={{ position: [0, 12, 16], fov: 55 }}>
        <ExperienceScene
          runtime={runtime}
          onNearestChange={setActiveSlug}
          touchControls={touchControls}
        />
      </Canvas>

      <div className="drive-controls" aria-label="Touch controls">
        <button
          type="button"
          className="drive-control-btn"
          onTouchStart={() => setControl("forward", true)}
          onTouchEnd={() => setControl("forward", false)}
          onMouseDown={() => setControl("forward", true)}
          onMouseUp={() => setControl("forward", false)}
          onMouseLeave={() => setControl("forward", false)}
        >
          ↑
        </button>
        <div className="drive-control-row">
          <button
            type="button"
            className="drive-control-btn"
            onTouchStart={() => setControl("left", true)}
            onTouchEnd={() => setControl("left", false)}
            onMouseDown={() => setControl("left", true)}
            onMouseUp={() => setControl("left", false)}
            onMouseLeave={() => setControl("left", false)}
          >
            ←
          </button>
          <button
            type="button"
            className="drive-control-btn"
            onTouchStart={() => setControl("backward", true)}
            onTouchEnd={() => setControl("backward", false)}
            onMouseDown={() => setControl("backward", true)}
            onMouseUp={() => setControl("backward", false)}
            onMouseLeave={() => setControl("backward", false)}
          >
            ↓
          </button>
          <button
            type="button"
            className="drive-control-btn"
            onTouchStart={() => setControl("right", true)}
            onTouchEnd={() => setControl("right", false)}
            onMouseDown={() => setControl("right", true)}
            onMouseUp={() => setControl("right", false)}
            onMouseLeave={() => setControl("right", false)}
          >
            →
          </button>
        </div>
      </div>

      {activeProject ? (
        <aside className="drive-popup" role="dialog" aria-live="polite">
          <p className="eyebrow">Project discovered</p>
          <h2>{activeProject.name}</h2>
          <p>{activeProject.headline}</p>
          <Link href={`/work/${activeProject.slug}`} className="btn btn-primary">
            Open project page
          </Link>
        </aside>
      ) : null}
    </div>
  );
}
