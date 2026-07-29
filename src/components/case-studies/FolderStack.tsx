"use client";

import { motion } from "framer-motion";

type Folder = {
  label: string;
  width: number;
  height: number;
  top: number;
  right: number;
  tabAlign: "left" | "center" | "right";
  z: number;
  accent?: boolean;
  floatDelay: number;
};

const folders: Folder[] = [
  { label: "the challenge.", width: 360, height: 180, top: 20, right: 48, tabAlign: "right", z: 10, floatDelay: 0 },
  { label: "the data.", width: 312, height: 156, top: 68, right: 360, tabAlign: "left", z: 20, floatDelay: 0.4 },
  { label: "the insight?", width: 408, height: 204, top: 164, right: 156, tabAlign: "center", z: 30, floatDelay: 0.8 },
  { label: "the solution.", width: 336, height: 168, top: 284, right: 24, tabAlign: "right", z: 40, floatDelay: 1.2 },
  { label: "the impact.", width: 264, height: 132, top: 384, right: 264, tabAlign: "center", z: 50, accent: true, floatDelay: 1.6 },
];

function tabPosition(align: Folder["tabAlign"]) {
  if (align === "left") return "left-6";
  if (align === "right") return "right-6";
  return "left-1/2 -translate-x-1/2";
}

export function FolderStack() {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none">
      {folders.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: f.top,
            right: f.right,
            width: f.width,
            height: f.height,
            zIndex: f.z,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: f.floatDelay,
          }}
        >
          <div
            className="absolute inset-0 rounded-[38px] border border-accent/15"
            style={{
              background: f.accent
                ? "radial-gradient(circle at 30% 20%, rgba(62,207,142,0.18), rgba(6,20,14,0.95) 70%)"
                : "radial-gradient(circle at 30% 20%, rgba(62,207,142,0.08), rgba(4,12,8,0.95) 70%)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          />

          <div
            className={`absolute -top-5 ${tabPosition(f.tabAlign)} px-5 py-2.5 rounded-t-2xl text-sm whitespace-nowrap border border-b-0 border-accent/15`}
            style={{
              background: f.accent
                ? "rgba(11,32,22,0.97)"
                : "rgba(7,18,13,0.97)",
            }}
          >
            {f.accent ? (
              <>
                <span className="text-accent font-semibold">the</span>{" "}
                <span className="text-foreground font-semibold">impact.</span>
              </>
            ) : (
              <span className="text-muted">{f.label}</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}