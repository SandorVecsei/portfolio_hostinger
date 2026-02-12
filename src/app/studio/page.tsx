import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

const values = [
  {
    title: "Clarity over noise",
    text: "We simplify complex ideas into stories and systems people understand quickly."
  },
  {
    title: "Craft with intent",
    text: "Every visual and interaction choice should support strategy, not decoration."
  },
  {
    title: "Build for outcomes",
    text: "We care about beautiful work, but we optimize it for real business results."
  }
];

export const metadata: Metadata = {
  title: "Studio"
};

export default function StudioPage() {
  return (
    <section className="section">
      <div className="container section-head stack-gap">
        <Reveal>
          <p className="eyebrow">Studio</p>
          <h1 className="section-title">A compact team built for ambitious brand work.</h1>
          <p className="body-copy">
            GLM is a strategy, design, and development studio partnering with startups and
            growth brands worldwide.
          </p>
        </Reveal>
      </div>

      <div className="container values-grid">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.08}>
            <article className="value-card">
              <p className="step-index">0{index + 1}</p>
              <h2>{value.title}</h2>
              <p>{value.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
