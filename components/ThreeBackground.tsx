"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null!)
  const { mouse } = useThree()

  const [positions, sizes, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
      siz[i] = Math.random() * 3 + 1
      vel[i] = Math.random() * 0.3 + 0.1
    }
    return [pos, siz, vel]
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(t * velocities[i] + i) * 0.003
      positions[i * 3] += Math.sin(t * velocities[i] * 0.7 + i * 0.5) * 0.002
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = t * 0.01 + mouse.x * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ff6b00"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingEmbers({ count = 30 }) {
  const mesh = useRef<THREE.Points>(null!)
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
      speeds[i] = Math.random() * 0.5 + 0.2
      phases[i] = Math.random() * Math.PI * 2
    }
    return { pos, speeds, phases }
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(t * data.speeds[i] + data.phases[i]) * 0.008
      positions[i * 3] += Math.cos(t * data.speeds[i] * 0.5 + data.phases[i]) * 0.005
      positions[i * 3 + 2] += Math.sin(t * data.speeds[i] * 0.3 + data.phases[i]) * 0.004
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.pos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ff8c00"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function Shapes() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const torusRef = useRef<THREE.Mesh>(null!)
  const icoRef = useRef<THREE.Mesh>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.05 + mouse.y * 0.1
    meshRef.current.rotation.y = t * 0.08 + mouse.x * 0.1
    meshRef.current.position.y = Math.sin(t * 0.3) * 0.3

    torusRef.current.rotation.x = t * 0.04
    torusRef.current.rotation.z = t * 0.07
    torusRef.current.position.y = Math.sin(t * 0.4 + 1) * 0.3

    icoRef.current.rotation.x = t * 0.06
    icoRef.current.rotation.y = t * 0.05
    icoRef.current.position.y = Math.sin(t * 0.35 + 2) * 0.3

    sphereRef.current.rotation.x = t * 0.03
    sphereRef.current.rotation.z = t * 0.05
    sphereRef.current.position.y = Math.sin(t * 0.25 + 3) * 0.4
  })

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={meshRef} position={[-4, 1.5, -3]} scale={1.3}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#ff6b00"
            speed={0.6}
            distort={0.4}
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={torusRef} position={[4.5, -1, -4]} scale={1.1}>
          <torusKnotGeometry args={[0.8, 0.3, 64, 8]} />
          <MeshDistortMaterial
            color="#4B2A7A"
            speed={0.5}
            distort={0.3}
            transparent
            opacity={0.25}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={icoRef} position={[-3, -2, -5]} scale={0.9}>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#ff8c00"
            speed={0.7}
            distort={0.25}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={sphereRef} position={[3, 2, -4]} scale={0.7}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#7B4FBF"
            speed={0.4}
            distort={0.35}
            transparent
            opacity={0.1}
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
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#ff6b00" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4B2A7A" />
        <pointLight position={[0, 3, 2]} intensity={0.4} color="#ff8c00" />
        <Particles count={300} />
        <FloatingEmbers count={40} />
        <Shapes />
      </Canvas>
    </div>
  )
}
