import { animated, useSpring } from '@react-spring/three'
import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'
import { HollowHemisphere } from './HollowSemiSphere';

type Vec3 = [number, number, number];


export function Kusudama() {
    const [clicked, setClicked] = useState(false)
    const { rotation0, rotation1 } = useSpring({
    rotation0: clicked ? [0, 0, -Math.PI / 2.2] : [0, 0, 0],
    rotation1: clicked ? [0, 0, +Math.PI / 2.2] : [0, 0, 0],
  });
  return (
    <>
        <group position={[0, 2, 0]}>
            <animated.group rotation={rotation0 as unknown as Vec3}>
                <HollowHemisphere position={[0, -1, 0]} rotation={[0, 0, Math.PI / 2]} opened={clicked} onClick={() => setClicked(!clicked)}  />
            </animated.group>
            <animated.group rotation={rotation1 as unknown as Vec3}>
                <HollowHemisphere position={[0, -1, 0]} rotation={[0, 0, -Math.PI / 2]} opened={clicked} onClick={() => setClicked(!clicked)} />
            </animated.group>
        </group>
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
      <OrbitControls />
    </Canvas>
  </StrictMode>
)
