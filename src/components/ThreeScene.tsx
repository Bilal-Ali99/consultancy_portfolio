"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return progress;
}

function TechModule({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <RoundedBox args={[1.3, 0.72, 0.18]} radius={0.07} smoothness={6}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.16} roughness={0.34} metalness={0.42} />
      </RoundedBox>
      <mesh position={[0.46, 0.02, 0.13]}>
        <boxGeometry args={[0.15, 0.15, 0.08]} />
        <meshStandardMaterial color="#f0f0f5" emissive="#f0f0f5" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[-0.38, 0.02, 0.13]}>
        <boxGeometry args={[0.44, 0.06, 0.08]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
    </group>
  );
}

function RotatingBlock({
  position,
  color,
  accent,
  scale = 1,
  speed = 1,
  offset = 0,
  isStatic,
}: {
  position: [number, number, number];
  color: string;
  accent: string;
  scale?: number;
  speed?: number;
  offset?: number;
  isStatic: boolean;
}) {
  const blockRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!blockRef.current || isStatic) return;

    const time = clock.elapsedTime * speed + offset;
    blockRef.current.rotation.x = 0.35 + Math.sin(time * 0.7) * 0.18;
    blockRef.current.rotation.y = time * 0.48;
    blockRef.current.rotation.z = -0.18 + Math.cos(time * 0.55) * 0.14;
  });

  return (
    <group ref={blockRef} position={position} scale={scale}>
      <RoundedBox args={[0.86, 0.86, 0.86]} radius={0.09} smoothness={7}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.08} roughness={0.32} metalness={0.28} transparent opacity={0.72} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.5, 0.08]} radius={0.04} smoothness={5} position={[0, 0, 0.45]}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} roughness={0.28} />
      </RoundedBox>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.66, 0.018, 10, 72]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} roughness={0.45} transparent opacity={0.68} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const groupRef = useRef<Group>(null);
  const progress = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  const modulePositions = useMemo<[number, number, number][]>(
    () => [
      [-2.4, 0.8, -0.5],
      [-1.15, -0.55, 0.2],
      [0, 1.05, -0.15],
      [1.2, -0.45, 0.3],
      [2.45, 0.72, -0.35],
    ],
    []
  );

  const rotatingBlocks = useMemo<
    {
      position: [number, number, number];
      color: string;
      accent: string;
      scale: number;
      speed: number;
      offset: number;
    }[]
  >(
    () => [
      { position: [-3.25, 1.65, -1.85], color: "#c7d2fe", accent: "#6366f1", scale: 0.72, speed: 0.78, offset: 0.1 },
      { position: [3.05, 1.45, -2.2], color: "#fed7aa", accent: "#f59e0b", scale: 0.58, speed: 0.9, offset: 1.2 },
      { position: [-3.05, -1.7, -2.35], color: "#bae6fd", accent: "#38bdf8", scale: 0.64, speed: 0.68, offset: 2.4 },
      { position: [2.95, -1.55, -1.95], color: "#bbf7d0", accent: "#10b981", scale: 0.68, speed: 0.82, offset: 3.1 },
      { position: [0.15, -2.05, -2.8], color: "#fbcfe8", accent: "#ec4899", scale: 0.5, speed: 0.96, offset: 4.2 },
    ],
    []
  );

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return;

    const easedProgress = prefersReducedMotion ? 0.18 : progress;
    const time = prefersReducedMotion ? 0 : clock.elapsedTime;

    groupRef.current.rotation.y = time * 0.09 + easedProgress * 1.2;
    groupRef.current.rotation.x = -0.18 + easedProgress * 0.22;
    groupRef.current.position.x = 1.9 - easedProgress * 1.45;
    groupRef.current.position.y = 0.2 - easedProgress * 0.9;
    groupRef.current.position.z = -easedProgress * 1.4;

    camera.position.x = easedProgress * 0.8;
    camera.position.y = 0.7 - easedProgress * 0.35;
    camera.position.z = 6.2 - easedProgress * 1.2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 4]} intensity={1.45} />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#6366f1" />
      <pointLight position={[3, -1, 1]} intensity={0.9} color="#f59e0b" />

      <group ref={groupRef}>
        {rotatingBlocks.map((block, index) => (
          <Float key={`${block.color}-${index}`} speed={prefersReducedMotion ? 0 : 0.75 + index * 0.12} rotationIntensity={0.16} floatIntensity={0.25}>
            <RotatingBlock
              position={[
                block.position[0] + progress * (index % 2 === 0 ? 0.45 : -0.35),
                block.position[1] + Math.sin(progress * Math.PI + index) * 0.35,
                block.position[2] - progress * 0.6,
              ]}
              color={block.color}
              accent={block.accent}
              scale={block.scale}
              speed={block.speed}
              offset={block.offset}
              isStatic={prefersReducedMotion}
            />
          </Float>
        ))}

        <Float speed={prefersReducedMotion ? 0 : 1.4} rotationIntensity={0.35} floatIntensity={0.55}>
          <RoundedBox args={[2.35, 1.38, 0.16]} radius={0.08} smoothness={8} position={[0, 0.2, 0]}>
            <meshStandardMaterial color="#e8ecff" roughness={0.28} metalness={0.25} />
          </RoundedBox>
          <RoundedBox args={[2.08, 1.08, 0.09]} radius={0.05} smoothness={8} position={[0, 0.25, 0.1]}>
            <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.12} roughness={0.38} />
          </RoundedBox>
          <mesh position={[0, -0.7, 0.08]} rotation={[0.22, 0, 0]}>
            <boxGeometry args={[2.75, 0.13, 0.95]} />
            <meshStandardMaterial color="#c7d2fe" roughness={0.36} metalness={0.28} />
          </mesh>
        </Float>

        {modulePositions.map((position, index) => (
          <Float key={position.join("-")} speed={prefersReducedMotion ? 0 : 1 + index * 0.18} rotationIntensity={0.25} floatIntensity={0.35}>
            <TechModule
              position={[
                position[0],
                position[1] - 0.25 + progress * (index % 2 === 0 ? 0.7 : -0.55),
                position[2] - 1.25 - progress * 0.8,
              ]}
              color={index % 2 === 0 ? "#6366f1" : "#f59e0b"}
              scale={0.68}
            />
          </Float>
        ))}
      </group>
    </>
  );
}

export function ThreeScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-25" aria-hidden="true">
      <Canvas
        className="!pointer-events-none"
        style={{ pointerEvents: "none" }}
        camera={{ position: [0, 0.7, 6.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
