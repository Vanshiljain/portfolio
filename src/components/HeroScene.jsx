import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const CYAN = "#3ee9ff";
const MAGENTA = "#ff2fd0";

function randomOnSphere(radius) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
  ];
}

function ParticleField({ count, radius }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const [x, y, z] = randomOnSphere(radius * (0.7 + Math.random() * 0.6));
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, radius]);

  const ref = useRef(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={CYAN}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitNodes({ count }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const radius = 1.5 + Math.random() * 0.9;
        const angle = (i / count) * Math.PI * 2;
        const tilt = (Math.random() - 0.5) * 1.2;
        return { radius, angle, tilt, speed: 0.15 + Math.random() * 0.2, color: i % 3 === 0 ? MAGENTA : CYAN };
      }),
    [count]
  );

  const group = useRef(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const n = nodes[i];
      if (!n) return;
      const a = n.angle + t * n.speed;
      child.position.set(Math.cos(a) * n.radius, Math.sin(a * 0.8) * n.tilt * n.radius, Math.sin(a) * n.radius);
    });
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <group key={i}>
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={n.color} />
          </mesh>
        </group>
      ))}
      {nodes.map((n, i) => (
        <NodeLink key={`link-${i}`} groupRef={group} index={i} color={n.color} />
      ))}
    </group>
  );
}

function NodeLink({ groupRef, index, color }) {
  const ref = useRef(null);
  useFrame(() => {
    const node = groupRef.current?.children[index];
    if (!node || !ref.current) return;
    const positions = ref.current.geometry.attributes.position;
    positions.setXYZ(0, 0, 0, 0);
    positions.setXYZ(1, node.position.x, node.position.y, node.position.z);
    positions.needsUpdate = true;
  });

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

function Core({ scrollRef }) {
  const mesh = useRef(null);
  const shell = useRef(null);
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    if (mesh.current) {
      mesh.current.material.distort = 0.35 + Math.sin(t * 0.6) * 0.08;
      mesh.current.material.emissiveIntensity = 0.75 + Math.sin(t * 1.4) * 0.25;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.08;
      shell.current.rotation.x += delta * 0.02;
    }
    if (group.current) {
      const targetY = pointer.current.x * 0.4;
      const targetX = -pointer.current.y * 0.3;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;

      group.current.position.z = scroll * -2.2;
      const s = Math.max(0, 1 - scroll * 1.3);
      group.current.scale.setScalar(0.85 + s * 0.15);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={MAGENTA}
          emissive={MAGENTA}
          emissiveIntensity={0.8}
          distort={0.35}
          speed={1.4}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>
      <mesh ref={shell} scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ scrollRef, tier = "full" }) {
  const isLite = tier === "lite";

  return (
    <Canvas
      dpr={isLite ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: !isLite, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={1.2} color={CYAN} />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color={MAGENTA} />

      {/* offset toward the right/upper area so it sits behind the profile
          photo instead of colliding with the copy on the left */}
      <group position={[1.7, 0.3, 0]} scale={0.8}>
        <Core scrollRef={scrollRef} />
        <OrbitNodes count={isLite ? 5 : 9} />
        <ParticleField count={isLite ? 220 : 550} radius={2.6} />
      </group>

      {!isLite && (
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
