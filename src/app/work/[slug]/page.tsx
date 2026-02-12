import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageParams = {
  slug: string;
};

type ProjectPageProps = {
  params: Promise<ProjectPageParams>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found"
    };
  }

  return {
    title: `${project.name} Case Study`,
    description: project.shortDescription
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="section">
      <div className="container stack-gap">
        <Reveal>
          <p className="eyebrow">
            {project.client} / {project.industry} / {project.year}
          </p>
          <h1 className="section-title">{project.name}</h1>
          <p className="body-copy lead">{project.headline}</p>
        </Reveal>

        <Reveal className="hero-block">
          <div
            className="hero-gradient"
            style={{
              background: `linear-gradient(140deg, ${project.heroPalette[0]}, ${project.heroPalette[1]})`
            }}
            aria-hidden="true"
          />
        </Reveal>
      </div>

      <div className="container details-grid">
        <Reveal>
          <h2>Challenge</h2>
          <p>{project.challenge}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2>What we did</h2>
          <ul className="detail-list">
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.12}>
          <h2>Outcome</h2>
          <p>{project.outcome}</p>
        </Reveal>
      </div>

      <div className="container metrics-row">
        {project.metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.06}>
            <div className="metric-card">
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="container gallery-grid">
        {project.gallery.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <figure className="gallery-card">
              <div
                className="gallery-gradient"
                style={{
                  background: `linear-gradient(130deg, ${item.palette[0]}, ${item.palette[1]})`
                }}
                aria-hidden="true"
              />
              <figcaption>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </article>
  );
}
