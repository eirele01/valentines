import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import Flower from './Flower';

const Reveal = () => {
    const [revealed, setRevealed] = useState(false);

    return (
        <section className="h-screen w-full relative bg-[var(--bg-color)] overflow-hidden">
            <AnimatePresence>
                {!revealed && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--bg-color)] pointer-events-auto"
                    >
                        <h2 className="text-3xl mb-8 font-serif italic text-[var(--secondary-text)]">
                            One more surprise...
                        </h2>
                        <button
                            onClick={() => setRevealed(true)}
                            className="px-10 py-5 bg-[var(--accent-rose)] text-white text-xl rounded-full shadow-2xl hover:bg-sky-500 transition-all font-serif tracking-wide"
                        >
                            Unlock Your Real Gift
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <pointLight position={[-10, -10, -10]} />

                        <Flower />

                        <Environment preset="sunset" />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    </Suspense>
                </Canvas>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 50 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-0 right-0 z-30 text-center pointer-events-none"
            >
                <div className="bg-white/80 backdrop-blur-md p-6 max-w-lg mx-auto rounded-xl shadow-2xl border border-[var(--accent-gold)]">
                    <h2 className="text-3xl text-[var(--accent-rose)] font-bold mb-2">My Blue Flower</h2>
                    <p className="text-[var(--text-color)] font-serif">
                        Just like this flower, my love for you blooms forever.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Reveal;
