export function FocusGrid() {
  return (
    <div
      className="absolute -inset-16 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(62,207,142,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,142,0.35) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage:
          "radial-gradient(ellipse 70% 70% at center, black 35%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 70% at center, black 35%, transparent 80%)",
      }}
    />
  );
}