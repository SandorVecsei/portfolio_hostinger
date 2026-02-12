import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio"
};

export default function WorkPage() {
  return (
    <section className="section">
      <div className="container section-head stack-gap">
        <Reveal>
          <p className="eyebrow">Portfolio</p>
          <h1 className="section-title">Case studies built to move brands forward.</h1>
          <p className="body-copy">
            A collection of recent work spanning identity systems, launch campaigns, and
            digital product experiences.
          </p>
        </Reveal>
      </div>

      <div className="container project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
