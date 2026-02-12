export function MarqueeStrip() {
  const items = [
    "Brand Strategy",
    "Digital Product Design",
    "Creative Direction",
    "Frontend Development",
    "Campaign Systems"
  ];

  return (
    <div className="marquee-wrap" aria-label="Services">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
