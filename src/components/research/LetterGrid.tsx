function Letter({ char, accent }: { char: string; accent?: boolean }) {
  return (
    <span
      className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-md font-mono text-sm font-bold shrink-0"
      style={{
        background: "linear-gradient(180deg, #101712 0%, #0a0f0c 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)",
        color: accent ? "#3ecf8e" : "#f5f5f5",
        textShadow: accent
          ? "0 0 6px rgba(62,207,142,0.9), 0 0 16px rgba(62,207,142,0.5)"
          : "0 0 4px rgba(255,255,255,0.25)",
      }}
    >
      {char}
    </span>
  );
}

function Word({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <div className="flex gap-1.5">
      {text.split("").map((c, i) => (
        <Letter key={i} char={c} accent={accent} />
      ))}
    </div>
  );
}

export function LetterGrid() {
  return (
    <div className="hidden lg:grid grid-cols-1 gap-2 justify-items-end">
      <div className="flex gap-3">
        <Word text="DISCOVER" accent />
      </div>
      <div className="flex gap-3">
        <Word text="THE" />
        <Word text="SIGNAL" accent />
      </div>
      <div className="flex gap-3 pr-14">
        <Word text="BEYOND" />
      </div>
      <div className="flex gap-3">
        <Word text="THE" />
        <Word text="NOISE" accent />
      </div>
    </div>
  );
}