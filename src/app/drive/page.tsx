import { DriveExperience } from "@/components/DriveExperience";

export default function DrivePage() {
  return (
    <section className="section">
      <div className="container stack-gap">
        <p className="eyebrow">Interactive demo</p>
        <h1 className="section-title">Drive the low poly project world.</h1>
        <p className="body-copy lead">
          Explore tables in the scene and open each case study when you park nearby.
        </p>
      </div>
      <div className="container">
        <DriveExperience />
      </div>
    </section>
  );
}
