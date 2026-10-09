import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function seeded(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function NeuralNet() {
  const group = useRef()
  const { positions, linePositions } = useMemo(() => {
    const count = 72
    const pts = []
    for (let i = 0; i < count; i++) {
      const r = 1.8 + seeded(i + 1) * 2.4
      const theta = seeded(i + 17) * Math.PI * 2
      const phi = Math.acos(2 * seeded(i + 41) - 1)
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.72,
          r * Math.cos(phi),
        ),
      )
    }

    const positions = new Float32Array(count * 3)
    pts.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    })

    const segments = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.45) {
          segments.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }

    return { positions, linePositions: new Float32Array(segments) }
  }, [])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#7ff6e4"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3ee0c5" transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}

function Core() {
  const inner = useRef()
  const shell = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (inner.current) {
      inner.current.rotation.x = t * 0.25
      inner.current.rotation.y = t * 0.38
    }
    if (shell.current) {
      shell.current.rotation.x = -t * 0.12
      shell.current.rotation.z = t * 0.18
    }
  })

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color="#0d3d38"
          emissive="#3ee0c5"
          emissiveIntensity={0.85}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
      <mesh ref={shell} scale={1.55}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial color="#e8a54b" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function Agents() {
  const agents = useMemo(
    () => [
      { color: '#3ee0c5', radius: 2.6, speed: 0.35, size: 0.14, offset: 0 },
      { color: '#e8a54b', radius: 3.1, speed: -0.22, size: 0.11, offset: 2.1 },
      { color: '#c23b4a', radius: 3.5, speed: 0.18, size: 0.09, offset: 4.2 },
    ],
    [],
  )
  const refs = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    agents.forEach((agent, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      const a = t * agent.speed + agent.offset
      mesh.position.set(
        Math.cos(a) * agent.radius,
        Math.sin(a * 1.4) * 0.55,
        Math.sin(a) * agent.radius,
      )
      mesh.rotation.x += 0.02
      mesh.rotation.y += 0.03
    })
  })

  return (
    <group>
      {agents.map((agent, i) => (
        <mesh
          key={agent.color}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          <octahedronGeometry args={[agent.size, 0]} />
          <meshStandardMaterial
            color={agent.color}
            emissive={agent.color}
            emissiveIntensity={0.7}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.1, 0.035)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.25 + pointer.y * 0.45, 0.035)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#06070b']} />
      <fog attach="fog" args={['#06070b', 6, 16]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 3, 4]} intensity={18} color="#3ee0c5" distance={12} />
      <pointLight position={[-4, -2, -3]} intensity={10} color="#e8a54b" distance={10} />
      <CameraRig />
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>
        <Core />
      </Float>
      <NeuralNet />
      <Agents />
      <Sparkles count={80} scale={9} size={2.2} speed={0.35} color="#9ff7ea" opacity={0.55} />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <Scene />
    </Canvas>
  )
}
