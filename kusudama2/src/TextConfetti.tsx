import * as THREE from 'three'
import { useRef } from 'react';
import type { Vec3 } from './types';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

type TextConfettiProps = {
    active: boolean;
    pos: Vec3;
    vel: Vec3;
    rot: Vec3;
    color: string;
    text: string;
    clickHandler?: () => void;
}

function rnorm(): number {
    return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

export function TextConfetti(props: TextConfettiProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const pos = useRef<Vec3>([...props.pos]);
    const vel = useRef<Vec3>([...props.vel]);
    const rot = useRef<Vec3>([...props.rot]);

    useFrame(() => {
        if (!props.active) return;
        if (pos.current[1] <= -5) return;
        pos.current[0] += vel.current[0];
        pos.current[1] += vel.current[1];
        pos.current[2] += vel.current[2];

        // brown movement
        vel.current[0] += rnorm() / 100;
        vel.current[1] += rnorm() / 100 - 0.001;
        vel.current[2] += rnorm() / 100;

        rot.current[0] = (rot.current[0] + rnorm() / 10) % (2 * Math.PI);
        rot.current[1] = (rot.current[1] + rnorm() / 10) % (2 * Math.PI);
        rot.current[2] = (rot.current[2] + rnorm() / 10) % (2 * Math.PI);

        if (meshRef.current) {
            meshRef.current.position.set(...pos.current);
            meshRef.current.rotation.set(...rot.current);
        }
    });

    return (
        <mesh ref={meshRef} position={pos.current} rotation={rot.current} onClick={props.clickHandler}>
            <Text
                fontSize={0.1}
            >
                {props.text}
                <meshStandardMaterial color={props.color} side={THREE.DoubleSide} />
            </Text>
        </mesh>
    );
}
