import { animated, useSpring } from '@react-spring/three'
import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'
import { HollowHemisphere } from './HollowSemiSphere';
import type { Vec3 } from './types';
import { Confetti } from './Confetti';
import { TextConfetti } from './TextConfetti';

export function Kusudama() {
    const [clicked, setClicked] = useState(false)
    const { rotation0, rotation1 } = useSpring({
        rotation0: clicked ? [0, 0, -Math.PI / 2.2] : [0, 0, 0],
        rotation1: clicked ? [0, 0, +Math.PI / 2.2] : [0, 0, 0],
    });
    const confettis = Array.from({ length: 100 }, () => {
        if (Math.random() < 0.5) {
            return { color: 'red' };
        } else {
            return { color: 'white' };
        }
    });
    return (
        <>
            <group position={[0, 2, 0]}>
                <animated.group rotation={rotation0 as unknown as Vec3}>
                    <HollowHemisphere position={[0, -1, 0]} rotation={[0, 0, Math.PI / 2]} opened={clicked} onClick={() => setClicked(!clicked)} />
                </animated.group>
                <animated.group rotation={rotation1 as unknown as Vec3}>
                    <HollowHemisphere position={[0, -1, 0]} rotation={[0, 0, -Math.PI / 2]} opened={clicked} onClick={() => setClicked(!clicked)} />
                </animated.group>
            </group>
            {confettis.map((c, idx) => {
                return (<Confetti key={idx} active={clicked} pos={[0, 1, 0]} vel={[0, -0.03, 0]} rot={[0.1, 0.1, 0.1]} color={c.color} />)
            })}
            <TextConfetti active={clicked}  pos={[0, 1, 0]} vel={[0, -0.03, 0]} rot={[0.1, 0.1, 0.1]} color='#00ff00' text='windymelt/kusudama2' clickHandler={() => window.open("https://github.com/windymelt/kusudama2", "_blank")} />
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
