"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";
import { MathUtils } from "three";

type DashboardKind = "finance" | "inventory" | "manufacturing" | "projects" | "integrations";

const panelColors = ["#5b67f1", "#12a594", "#f59e0b", "#38a9e8", "#e6588f"];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function usePageProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? window.scrollY / maximum : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function FinanceGraphic({ color }: { color: string }) {
  return (
    <group position={[-0.36, -0.05, 0.08]}>
      {[0.22, 0.4, 0.3, 0.55].map((height, index) => (
        <mesh key={height} position={[index * 0.24, height / 2 - 0.2, 0]}>
          <boxGeometry args={[0.13, height, 0.045]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.14} />
        </mesh>
      ))}
    </group>
  );
}

function InventoryGraphic({ color }: { color: string }) {
  return (
    <group position={[-0.3, -0.08, 0.1]} rotation={[-0.2, 0.24, 0]}>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <mesh key={item} position={[(item % 3) * 0.29, Math.floor(item / 3) * 0.27, 0]}>
          <boxGeometry args={[0.22, 0.2, 0.13]} />
          <meshStandardMaterial color={item % 2 ? "#ffffff" : color} roughness={0.38} />
        </mesh>
      ))}
    </group>
  );
}

function ManufacturingGraphic({ color }: { color: string }) {
  return (
    <group position={[-0.42, 0, 0.09]}>
      {[0, 1, 2, 3].map((item) => (
        <group key={item}>
          <mesh position={[item * 0.29, Math.sin(item * 1.8) * 0.16, 0.02]}>
            <sphereGeometry args={[0.085, 18, 18]} />
            <meshStandardMaterial color={item === 3 ? "#ffffff" : color} emissive={color} emissiveIntensity={0.1} />
          </mesh>
          {item < 3 && (
            <mesh position={[item * 0.29 + 0.145, Math.sin(item * 1.8) * 0.08, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.24, 0.025, 0.025]} />
              <meshStandardMaterial color={color} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

function ProjectsGraphic({ color }: { color: string }) {
  return (
    <group position={[-0.42, 0.2, 0.09]}>
      {[0.75, 0.48, 0.92, 0.6].map((width, index) => (
        <mesh key={width} position={[-0.08 + width / 2, -index * 0.15, 0]}>
          <boxGeometry args={[width, 0.065, 0.04]} />
          <meshStandardMaterial color={index % 2 ? "#ffffff" : color} emissive={color} emissiveIntensity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

function IntegrationGraphic({ color }: { color: string }) {
  return (
    <group position={[0, 0, 0.09]}>
      <mesh>
        <torusGeometry args={[0.29, 0.035, 12, 42]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} />
      </mesh>
      {[-0.48, 0.48].map((x) => (
        <group key={x}>
          <mesh position={[x, 0, 0]}>
            <sphereGeometry args={[0.1, 18, 18]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[x / 2, 0, -0.01]}>
            <boxGeometry args={[0.2, 0.025, 0.025]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function DashboardGraphic({ kind, color }: { kind: DashboardKind; color: string }) {
  if (kind === "finance") return <FinanceGraphic color={color} />;
  if (kind === "inventory") return <InventoryGraphic color={color} />;
  if (kind === "manufacturing") return <ManufacturingGraphic color={color} />;
  if (kind === "projects") return <ProjectsGraphic color={color} />;
  return <IntegrationGraphic color={color} />;
}

function DashboardPanel({
  index,
  kind,
  progress,
  reducedMotion,
  compact,
}: {
  index: number;
  kind: DashboardKind;
  progress: number;
  reducedMotion: boolean;
  compact: boolean;
}) {
  const panelRef = useRef<Group>(null);
  const assembled: [number, number, number][] = [
    [-0.95, 0.55, 0.05],
    [0.66, 0.68, -0.12],
    [-0.75, -0.5, -0.08],
    [0.86, -0.46, 0.08],
    [0.05, 0.05, 0.34],
  ];
  const spread: [number, number, number][] = [
    [-2.2, 1.1, -0.35],
    [0, 1.4, -0.62],
    [2.2, 0.95, -0.28],
    [-1.35, -1.25, -0.45],
    [1.45, -1.15, -0.18],
  ];

  useFrame(({ clock }) => {
    if (!panelRef.current) return;

    const motionProgress = reducedMotion ? 0.18 : progress;
    const separation = MathUtils.smoothstep(motionProgress, 0.06, 0.34);
    const alignment = MathUtils.smoothstep(motionProgress, 0.62, 0.84);
    const orbit = motionProgress > 0.32 && motionProgress < 0.72 ? (motionProgress - 0.32) * 1.15 : 0;
    const targetScale = compact ? 0.72 : 1;

    let x = MathUtils.lerp(assembled[index][0], spread[index][0], separation);
    let y = MathUtils.lerp(assembled[index][1], spread[index][1], separation);
    let z = MathUtils.lerp(assembled[index][2], spread[index][2], separation);

    if (!reducedMotion) {
      const angle = orbit + index * 1.25;
      x += Math.cos(angle) * orbit * 0.28;
      y += Math.sin(angle) * orbit * 0.2;
    }

    x = MathUtils.lerp(x, (index - 2) * 1.22, alignment);
    y = MathUtils.lerp(y, index % 2 === 0 ? 0.12 : -0.12, alignment);
    z = MathUtils.lerp(z, -0.65, alignment);

    panelRef.current.position.x = MathUtils.lerp(panelRef.current.position.x, x, 0.07);
    panelRef.current.position.y = MathUtils.lerp(panelRef.current.position.y, y, 0.07);
    panelRef.current.position.z = MathUtils.lerp(panelRef.current.position.z, z, 0.07);
    panelRef.current.scale.setScalar(MathUtils.lerp(panelRef.current.scale.x, targetScale, 0.08));

    if (!reducedMotion) {
      panelRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35 + index) * 0.12;
      panelRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.28 + index) * 0.055;
    }
  });

  const color = panelColors[index];

  return (
    <group ref={panelRef} position={assembled[index]}>
      <RoundedBox args={[1.42, 0.88, 0.1]} radius={0.07} smoothness={6}>
        <meshStandardMaterial color="#f8fbff" roughness={0.28} metalness={0.08} transparent opacity={0.96} />
      </RoundedBox>
      <mesh position={[-0.47, 0.32, 0.065]}>
        <boxGeometry args={[0.24, 0.045, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.15, 0.32, 0.065]}>
        <boxGeometry args={[0.28, 0.045, 0.02]} />
        <meshStandardMaterial color="#d7deea" />
      </mesh>
      <DashboardGraphic kind={kind} color={color} />
    </group>
  );
}

function SceneContent() {
  const progress = usePageProgress();
  const reducedMotion = useReducedMotion();
  const { size } = useThree();
  const commandRef = useRef<Group>(null);
  const compact = size.width < 768;
  const kinds: DashboardKind[] = ["finance", "inventory", "manufacturing", "projects", "integrations"];

  useFrame(({ clock, camera }) => {
    if (!commandRef.current) return;
    const motionProgress = reducedMotion ? 0.18 : progress;
    const time = reducedMotion ? 0 : clock.elapsedTime;

    commandRef.current.rotation.y = -0.12 + Math.sin(time * 0.08) * 0.08 + motionProgress * 0.28;
    commandRef.current.position.x = compact ? 0 : 1.35 - motionProgress * 1.15;
    commandRef.current.position.y = compact ? -0.55 : 0.05 - motionProgress * 0.35;
    commandRef.current.scale.setScalar(compact ? 0.72 : 0.9);
    camera.position.z = compact ? 7.2 : 6.7;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} />
      <pointLight position={[-3, 2, 3]} intensity={1.35} color="#6366f1" />
      <pointLight position={[3, -1, 2]} intensity={0.95} color="#14b8a6" />

      <group ref={commandRef}>
        <RoundedBox args={[3.65, 2.55, 0.08]} radius={0.16} smoothness={8} position={[0, 0.08, -0.72]}>
          <meshStandardMaterial color="#dfe8f7" transparent opacity={0.16} roughness={0.2} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, -1.33, -0.62]}>
          <boxGeometry args={[2.2, 0.06, 0.08]} />
          <meshStandardMaterial color="#6366f1" transparent opacity={0.5} />
        </mesh>

        {kinds.map((kind, index) => (
          <DashboardPanel
            key={kind}
            index={index}
            kind={kind}
            progress={progress}
            reducedMotion={reducedMotion}
            compact={compact}
          />
        ))}
      </group>
    </>
  );
}

export function ERPNextScene() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white opacity-45"
      aria-hidden="true"
      data-testid="erpnext-scene"
    >
      <div className="absolute inset-0 service-grid-background" />
      <Canvas
        className="!pointer-events-none"
        camera={{ position: [0, 0.3, 6.7], fov: 43 }}
        dpr={[1, 1.4]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
