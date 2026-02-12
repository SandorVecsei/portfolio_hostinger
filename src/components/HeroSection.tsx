"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const titleLines = ["Awwwards-inspired", "creative agency", "portfolio site"];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldReduceMotion = mounted && reduceMotion;

  return (
    <section className="hero section">
      <div className="container">
        <p className="eyebrow">Independent creative partner</p>

        <div className="hero-title-wrap">
          {titleLines.map((line, index) => (
            <motion.h1
              key={line}
              className="hero-line"
              initial={shouldReduceMotion ? false : { y: 60, opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
              transition={{
                duration: 0.72,
                delay: 0.12 * index,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.p
          className="hero-subtitle"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          GLM helps challenger brands feel iconic through strategy, design, and modern web
          experiences.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.64, duration: 0.7 }}
        >
          <Link href="/work" className="btn btn-primary">
            Explore work
          </Link>
          <Link href="/studio" className="btn btn-secondary">
            Meet the studio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
