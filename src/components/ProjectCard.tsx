"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const style = {
    "--from": project.heroPalette[0],
    "--to": project.heroPalette[1]
  } as CSSProperties;

  return (
    <motion.article
      className="project-card"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/work/${project.slug}`} className="project-link">
        <div className="project-media" aria-hidden="true">
          <div className="project-orb" />
        </div>
        <div className="project-body">
          <p className="project-meta">
            {project.client} / {project.year}
          </p>
          <h3>{project.name}</h3>
          <p>{project.shortDescription}</p>
          <ul className="tag-list">
            {project.services.slice(0, 2).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}
