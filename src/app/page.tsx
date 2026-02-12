import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { featuredProjects } from "@/data/projects";

const process = [
  {
    title: "Discover",
    description: "We map goals, audience signals, and category whitespace."
  },
  {
    title: "Design",
    description: "We shape the narrative, identity, and interaction language."
  },
  {
    title: "Deliver",
    description: "We launch refined, performant experiences that scale."
  }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />

      <section className="section">
        <div className="container section-head">
          <Reveal>
            <p className="eyebrow">Featured projects</p>
            <h2 className="section-title">Selected work shaping culture and commerce.</h2>
          </Reveal>
          <Link href="/work" className="section-link">
            View all projects
          </Link>
        </div>
        <div className="container project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our approach</p>
            <h2 className="section-title">Small team. High standards. Fast outcomes.</h2>
          </Reveal>
          <div className="process-grid">
            {process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1}>
                <article className="process-card">
                  <p className="step-index">0{index + 1}</p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-card">
          <Reveal>
            <p className="eyebrow">Start a project</p>
            <h2 className="section-title">Need a standout digital presence?</h2>
            <p className="cta-copy">
              We partner with founders and teams that want work people remember.
            </p>
            <Link href="/work" className="btn btn-primary">
              See case studies
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
