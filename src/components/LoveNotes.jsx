import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

const notes = [
    "You make every day brighter just by being in it.",
    "Your smile is my favorite thing in the world.",
    "I love how you always know how to make me laugh.",
    "You are my best friend and my greatest adventure.",
    "Thank you for being you.",
    "I fall more in love with you every single day."
];

const Envelope = ({ note, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="relative flex justify-center items-center h-48 cursor-pointer perspective-1000"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className="relative w-full max-w-[280px] h-full flex items-center justify-center">
                {/* Closed Envelope */}
                <motion.div
                    animate={{ rotateX: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-[#D6EAF8] rounded-lg shadow-lg border-2 border-[#AED6F1] flex items-center justify-center z-20 backface-hidden origin-top"
                >
                    <Heart className="text-[var(--accent-rose)] w-12 h-12 fill-white/50" />
                </motion.div>

                {/* Open/Message State */}
                <motion.div
                    className="absolute inset-0 bg-white p-6 rounded-lg shadow-xl border border-[#A9CCE3] flex items-center justify-center text-center transform "
                    animate={{
                        scale: isOpen ? 1 : 0.9,
                        y: isOpen ? -10 : 0,
                        zIndex: isOpen ? 30 : 10
                    }}
                >
                    <p className="font-serif text-[var(--text-color)] italic text-lg leading-tight">
                        "{note}"
                    </p>
                </motion.div>

                {/* Envelope Back (static visual cue behind) */}
                <div className="absolute inset-0 bg-[#AED6F1] rounded-lg transform rotate-x-180 -z-10"></div>
            </div>
        </motion.div>
    );
};

const LoveNotes = () => {
    return (
        <section className="section bg-[#fdfbf7]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl mb-4 text-[var(--accent-rose)]">Love Notes</h2>
                    <p className="text-[var(--secondary-text)]">Hover to open</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {notes.map((note, index) => (
                        <Envelope key={index} note={note} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LoveNotes;
