"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { generateShapePoints, IconShape } from "@/lib/generateShapePoints";

function useGlowTexture() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    setTexture(new THREE.CanvasTexture(canvas));
  }, []);

  return texture;
}

function ParticlePoints({ positions, active }: { positions: Float32Array; active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const glowTexture = useGlowTexture();
  const clockRef = useRef(0);

  const originalPositions = useRef(positions.slice());
  const displayPositions = useRef(positions.slice());

  const { camera, gl } = useThree();
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const mouseWorld = useRef(new THREE.Vector3());

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const handlePointerLeave = () => mouse.current.set(9999, 9999);

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl]);

  useEffect(() => {
    originalPositions.current = positions.slice();
    displayPositions.current = positions.slice();
  }, [positions]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    clockRef.current += delta;

    // Fixed tilt on X + Z so 3D structure (diamonds, cube depth, brain lobes) is visible,
    // combined with continuous Y rotation so it still feels alive.
    pointsRef.current.rotation.x = 0.4;
    pointsRef.current.rotation.z = 0.15;
    pointsRef.current.rotation.y += delta * (active ? 0.25 : 0.12);

    const baseScale = 0.95;
    const breathe = baseScale + Math.sin(clockRef.current * 0.9) * 0.02;
    pointsRef.current.scale.setScalar(breathe);

    const vector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    mouseWorld.current.copy(camera.position).add(dir.multiplyScalar(distance));

    const posAttr = pointsRef.current.geometry.attributes.position;
    const orig = originalPositions.current;
    const disp = displayPositions.current;

    const repelRadius = 0.5;
    const repelStrength = 0.35;
    const returnSpeed = 0.08;

    for (let i = 0; i < disp.length / 3; i++) {
      const ix = i * 3;
      const ox = orig[ix], oy = orig[ix + 1], oz = orig[ix + 2];

      const dx = ox - mouseWorld.current.x;
      const dy = oy - mouseWorld.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = ox, targetY = oy;
      if (dist < repelRadius) {
        const force = (1 - dist / repelRadius) * repelStrength;
        const angle = Math.atan2(dy, dx);
        targetX = ox + Math.cos(angle) * force;
        targetY = oy + Math.sin(angle) * force;
      }

      disp[ix] += (targetX - disp[ix]) * returnSpeed;
      disp[ix + 1] += (targetY - disp[ix + 1]) * returnSpeed;
      disp[ix + 2] += (oz - disp[ix + 2]) * returnSpeed;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[displayPositions.current, 3]}
          count={displayPositions.current.length / 3}
          array={displayPositions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#3ecf8e"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={glowTexture}
      />
    </points>
  );
}

function Scene({ shape, active }: { shape: IconShape; active: boolean }) {
  const count = useMemo(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 700 : 1600), []);
  const positions = useMemo(() => generateShapePoints(shape, count), [shape, count]);
  return <ParticlePoints positions={positions} active={active} />;
}

export function ParticleIconCanvas({ shape, active = false }: { shape: IconShape; active?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full" />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1} />
      <Scene shape={shape} active={active} />
    </Canvas>
  );
}