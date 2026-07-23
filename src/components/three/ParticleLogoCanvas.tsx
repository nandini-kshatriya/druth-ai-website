"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { generateLogoPoints } from "@/lib/generateLogoPoints";

function useGlowTexture() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    setTexture(new THREE.CanvasTexture(canvas));
  }, []);

  return texture;
}

function ParticlePoints({ positions }: { positions: Float32Array }) {
  const pointsRef = useRef<THREE.Points>(null);
  const glowTexture = useGlowTexture();
  const clockRef = useRef(0);

  // Keep a mutable copy we can displace, plus the original "home" positions
  const originalPositions = useRef(positions.slice());
  const displayPositions = useRef(positions.slice());

  const { camera, size, gl } = useThree();
  const mouse = useRef(new THREE.Vector2(9999, 9999)); // start off-screen
  const mouseWorld = useRef(new THREE.Vector3());

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const handlePointerLeave = () => {
      mouse.current.set(9999, 9999);
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    clockRef.current += delta;

    // Rotation + breathing (from 4.4)
    pointsRef.current.rotation.y += delta * 0.15;
    const breathe = 1 + Math.sin(clockRef.current * 0.8) * 0.03;
    pointsRef.current.scale.setScalar(breathe);
    pointsRef.current.rotation.x = Math.sin(clockRef.current * 0.3) * 0.05;
    pointsRef.current.rotation.z = Math.cos(clockRef.current * 0.25) * 0.03;

    // Project mouse into world space at the logo's depth (z = 0 plane)
    const vector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    mouseWorld.current.copy(camera.position).add(dir.multiplyScalar(distance));

    const posAttr = pointsRef.current.geometry.attributes.position;
    const orig = originalPositions.current;
    const disp = displayPositions.current;

    const repelRadius = 0.6;
    const repelStrength = 0.4;
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

      // Smoothly interpolate current displayed position toward target (spring-like)
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
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={glowTexture}
      />
    </points>
  );
}

function Scene() {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 1500 : 4000;
  generateLogoPoints("/logo.png", count).then(setPositions);
}, []);

  if (!positions) return null;

  return <ParticlePoints positions={positions} />;
}

export function ParticleLogoCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Scene />
    </Canvas>
  );
}