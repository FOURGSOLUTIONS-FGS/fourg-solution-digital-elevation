import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 2.5;

function Nodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.005,
      });
    }
    return pos;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const handlePointerMove = useCallback(
    (e: THREE.Event) => {
      const event = e as unknown as { clientX: number; clientY: number };
      mouseRef.current.x = ((event.clientX || 0) / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((event.clientY || 0) / window.innerHeight) * 2 + 1;
    },
    []
  );

  useFrame(() => {
    if (!meshRef.current) return;

    positions.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Boundary bounce
      if (Math.abs(p.x) > 5) p.vx *= -1;
      if (Math.abs(p.y) > 3) p.vy *= -1;
      if (Math.abs(p.z) > 3) p.vz *= -1;

      // Mouse influence
      const mx = mouseRef.current.x * viewport.width * 0.5;
      const my = mouseRef.current.y * viewport.height * 0.5;
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        p.x += dx * 0.002;
        p.y += dy * 0.002;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Listen to pointer events on the canvas
  useThree(({ gl }) => {
    gl.domElement.onpointermove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
      <sphereGeometry args={[0.04, 12, 12]} />
      <meshBasicMaterial color="#00d4ff" />
    </instancedMesh>
  );
}

function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const positionsRef = useRef<Float32Array>(new Float32Array(NODE_COUNT * NODE_COUNT * 6));
  const colorsRef = useRef<Float32Array>(new Float32Array(NODE_COUNT * NODE_COUNT * 6));

  const nodesPositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.005,
      });
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!lineRef.current) return;
    let idx = 0;

    nodesPositions.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      if (Math.abs(p.x) > 5) p.vx *= -1;
      if (Math.abs(p.y) > 3) p.vy *= -1;
      if (Math.abs(p.z) > 3) p.vz *= -1;
    });

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const a = nodesPositions[i];
        const b = nodesPositions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          positionsRef.current[idx * 6] = a.x;
          positionsRef.current[idx * 6 + 1] = a.y;
          positionsRef.current[idx * 6 + 2] = a.z;
          positionsRef.current[idx * 6 + 3] = b.x;
          positionsRef.current[idx * 6 + 4] = b.y;
          positionsRef.current[idx * 6 + 5] = b.z;

          // Cyan color with alpha
          colorsRef.current[idx * 6] = 0;
          colorsRef.current[idx * 6 + 1] = 0.83 * alpha;
          colorsRef.current[idx * 6 + 2] = 1 * alpha;
          colorsRef.current[idx * 6 + 3] = 0;
          colorsRef.current[idx * 6 + 4] = 1 * alpha;
          colorsRef.current[idx * 6 + 5] = 0.8 * alpha;
          idx++;
        }
      }
    }

    const geom = lineRef.current.geometry;
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(positionsRef.current.slice(0, idx * 6), 3)
    );
    geom.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsRef.current.slice(0, idx * 6), 3)
    );
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial vertexColors transparent opacity={0.3} />
    </lineSegments>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return [pos];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00ffcc" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function NetworkScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Nodes />
        <Connections />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
