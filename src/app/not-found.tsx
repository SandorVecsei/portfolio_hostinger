import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container stack-gap">
        <p className="eyebrow">404</p>
        <h1 className="section-title">Project not found</h1>
        <p className="body-copy">The page you are looking for does not exist in this portfolio.</p>
        <Link href="/work" className="btn btn-primary">
          Back to work
        </Link>
      </div>
    </section>
  );
}
