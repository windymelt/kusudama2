import * as THREE from 'three'
import { animated, useSpring } from '@react-spring/three'
import type { ThreeElements } from '@react-three/fiber'
import { useRef } from 'react'

type HollowHemisphereProps = ThreeElements['group'] & {
    opened: boolean;
    onClick: () => void;
}

export function HollowHemisphere(props: HollowHemisphereProps) {
  const springs = useSpring({
    color: props.opened ? '#ffc859' : '#ffc859',
  })
  const groupRef = useRef<THREE.Mesh>(null!)
  //useFrame((state, delta) => (groupRef.current.rotation.z += delta))

  const R = 1;            // 外半径
  const thickness = 0.1;  // 肉厚
  const r = Math.max(0, R - thickness) // 内半径

  return (
    <group ref={groupRef} {...props} >
      {/* 外側半球（表面） */}
      <mesh castShadow receiveShadow onClick={props.onClick}>
        <sphereGeometry args={[R, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <animated.meshStandardMaterial color={springs.color} side={THREE.FrontSide} />
      </mesh>

      {/* 内側半球（裏面を描画） */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[r, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <animated.meshStandardMaterial color={springs.color} side={THREE.BackSide} />
      </mesh>

      {/* 切断面の肉（リングで塞ぐ） */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <ringGeometry args={[r, R, 128]} />
        <animated.meshStandardMaterial color={springs.color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
