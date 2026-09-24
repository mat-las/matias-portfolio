import { asset } from "../lib/assets";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

function StudioLighting() {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    invalidate();
    room.dispose();
    generator.dispose();
    return () => {
      scene.environment = null;
      target.dispose();
    };
  }, [gl, scene, invalidate]);
  return null;
}
function RotorBlade({ wire }: { wire: boolean }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.46, -0.05);
    s.bezierCurveTo(0.7, 0.03, 1.03, -0.12, 1.28, 0.19);
    s.lineTo(1.3, 0.29);
    s.bezierCurveTo(1.04, -0.02, 0.74, 0.13, 0.46, 0.025);
    s.closePath();
    return s;
  }, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <extrudeGeometry
        args={[
          shape,
          {
            depth: 0.32,
            bevelEnabled: true,
            bevelSize: 0.015,
            bevelThickness: 0.012,
            bevelSegments: 2,
            curveSegments: 10,
          },
        ]}
      />
      <meshStandardMaterial
        color="#dce4eb"
        metalness={0.9}
        roughness={0.22}
        wireframe={wire}
      />
    </mesh>
  );
}

function Part({
  radius,
  inner,
  depth,
  y,
  color,
  wire,
}: {
  radius: number;
  inner: number;
  depth: number;
  y: number;
  color: string;
  wire: boolean;
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, radius, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
    s.holes.push(hole);
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const h = new THREE.Path();
      h.absarc(
        Math.cos(a) * (radius * 0.8),
        Math.sin(a) * (radius * 0.8),
        0.055,
        0,
        Math.PI * 2,
        true,
      );
      s.holes.push(h);
    }
    return s;
  }, [radius, inner]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <extrudeGeometry
        args={[
          shape,
          {
            depth,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 1,
            bevelSize: 0.025,
            bevelThickness: 0.02,
            curveSegments: 48,
          },
        ]}
      />
      <meshStandardMaterial
        color={color}
        metalness={0.65}
        roughness={0.28}
        wireframe={wire}
      />
    </mesh>
  );
}
function Assembly({
  explode,
  wire,
  angle,
  tilt,
}: {
  explode: number;
  wire: boolean;
  angle: number;
  tilt: number;
}) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [explode, wire, angle, tilt, invalidate]);
  return (
    <group rotation={[0.12 + tilt, angle, -0.3]}>
      <Part
        radius={1.52}
        inner={0.64}
        depth={0.15}
        y={-0.62 - explode * 0.65}
        color="#6783a4"
        wire={wire}
      />
      <Part
        radius={1.31}
        inner={0.53}
        depth={0.12}
        y={-0.22 - explode * 0.12}
        color="#174ce5"
        wire={wire}
      />
      <group position={[0, 0.02 + explode * 0.2, 0]}>
        <Part
          radius={0.62}
          inner={0.33}
          depth={0.38}
          y={-0.1}
          color="#b9c6d4"
          wire={wire}
        />
        {Array.from({ length: 16 }, (_, i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 8, 0]}>
            <RotorBlade wire={wire} />
          </group>
        ))}
      </group>
      <Part
        radius={1.48}
        inner={0.69}
        depth={0.13}
        y={0.61 + explode * 0.8}
        color="#c1cddd"
        wire={wire}
      />
      {Array.from({ length: 4 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 1.17,
            0.91 + explode * 0.94,
            Math.sin((i * Math.PI) / 2) * 1.17,
          ]}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.3, 8]} />
          <meshStandardMaterial
            color="#a76542"
            metalness={0.7}
            roughness={0.35}
            wireframe={wire}
          />
        </mesh>
      ))}
    </group>
  );
}
export default function AssemblyScene(props: {
  explode: number;
  wire: boolean;
  angle: number;
  tilt: number;
  active: boolean;
  onFailure: () => void;
}) {
  return (
    <Canvas
      frameloop={props.active ? "demand" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [4.6, 3.7, 5.5], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", props.onFailure, {
          once: true,
        });
      }}
      fallback={
        <img
          src={asset("/media/precision-impeller.webp")}
          alt="Static concept render of a machined impeller"
        />
      }
    >
      <StudioLighting />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={2} />
      <directionalLight
        position={[-4, 2, -1]}
        color="#5c9af0"
        intensity={1.5}
      />
      <directionalLight position={[0, -2, 4]} intensity={1.5} />
      <Assembly {...props} />
    </Canvas>
  );
}
