"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function Shapes() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const torusRef = useRef<THREE.Mesh>(null!)
  const icoRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.08
    meshRef.current.rotation.y = t * 0.12
    torusRef.current.rotation.x = t * 0.06
    torusRef.current.rotation.z = t * 0.1
    icoRef.current.rotation.x = t * 0.1
    icoRef.current.rotation.y = t * 0.07
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} position={[-3.5, 1, -2]} scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#6366f1"
            speed={0.8}
            distort={0.3}
            transparent
            opacity={0.25}
            wireframe
          />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={torusRef} position={[4, -0.5, -3]} scale={1}>
          <torusKnotGeometry args={[0.8, 0.3, 64, 8]} />
          <MeshDistortMaterial
            color="#06b6d4"
            speed={0.6}
            distort={0.2}
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={icoRef} position={[0, -1.5, -4]} scale={0.9}>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#818cf8"
            speed={0.5}
            distort={0.15}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#06b6d4" />
        <Shapes />
      </Canvas>
    </div>
  )
}
