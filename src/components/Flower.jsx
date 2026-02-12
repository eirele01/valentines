import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const BlueRose = () => {
    const roseRef = useRef();
    const [model, setModel] = useState(null);
    const { scene } = useThree();

    // Load the 3D rose model
    useEffect(() => {
        const loader = new OBJLoader();

        loader.load(
            'https://happy358.github.io/Images/Model/red_rose3.obj',
            (obj) => {
                // Traverse the model and apply blue materials
                obj.traverse((child) => {
                    if (child.isMesh) {
                        const material = new THREE.MeshStandardMaterial({
                            metalness: 0,
                            roughness: 0.8,
                            side: THREE.DoubleSide
                        });

                        // Apply different blue shades to different parts
                        if (child.name === 'rose') {
                            material.color.set('#3b82f6'); // Blue rose petals
                        } else if (child.name === 'calyx') {
                            material.color.set('#001a14'); // Dark green calyx
                        } else if (child.name === 'leaf1' || child.name === 'leaf2') {
                            material.color.set('#00331b'); // Dark green leaves
                        } else {
                            material.color.set('#60a5fa'); // Light blue for other parts
                        }

                        child.material = material;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                obj.rotation.set(0, Math.PI / 1.7, 0);
                setModel(obj);
            },
            (xhr) => {
                // Progress callback
                if (xhr.lengthComputable) {
                    const percentComplete = (xhr.loaded / xhr.total) * 100;
                    console.log('Model ' + Math.round(percentComplete, 2) + '% loaded');
                }
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }, []);

    // Auto-rotate animation
    useFrame((state) => {
        if (roseRef.current) {
            roseRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group ref={roseRef} scale={0.01} position={[0, -0.5, 0]}>
            {model && <primitive object={model} />}

            {/* Lighting setup */}
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
        </group>
    );
};

const Flower = () => {
    return <BlueRose />;
};

export default Flower;
