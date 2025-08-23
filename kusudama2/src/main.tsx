import { animated, useSpring } from '@react-spring/three'
import type { ThreeElements } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'

import './index.css'
import './styles.css'

function HollowHemisphere(props: ThreeElements['group'] & { opened: boolean, onClick: () => void }) {
  const springs = useSpring({
    color: props.opened ? '#569AFF' : '#ff6d6d',
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

function Kusudama() {
  const [clicked, setClicked] = useState(false)
  return (
    <>
      <HollowHemisphere position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} opened={clicked} onClick={() => setClicked(!clicked)} />
      <HollowHemisphere position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} opened={clicked} onClick={() => setClicked(!clicked)} />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Kusudama />
    </Canvas>
  </StrictMode>
)

//            <!-- <Box position={[-1.2, 0, 0]} />
//            <Box position={[1.2, 0, 0]} /> -->
