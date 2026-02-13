import React from 'react';
import { motion } from 'framer-motion';
import beginningImg from "../assets/beginningImg.jpg";
import firstDateImg from "../assets/firstDateImg.jpg";
import adventureImg from "../assets/adventureImg.jpg";
import todayImg from "../assets/todayImg.jpg";

// image: "https://images.unsplash.com/photo-1522673607200-1645062cd95c?q=80&w=2660&auto=format&fit=crop"
// image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2574&auto=format&fit=crop"
// image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=2670&auto=format&fit=crop"
// image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2670&auto=format&fit=crop"
const milestones = [
    {
        id: 1,
        title: "The Beginning",
        date: "January, 2013",
        description: "Where it all started. A simple hello that changed everything.",
        image: beginningImg,
    },
    {
        id: 2,
        title: "First Date",
        date: "August, 2013",
        description: "Invited to party, nervous laughter, and a connection that felt like home.",
        image: firstDateImg,
    },
    {
        id: 3,
        title: "First Adventure",
        date: "January, 2018",
        description: "Exploring new places, hand in hand. The world is better with you.",
        image: adventureImg,
    },
    {
        id: 4,
        title: "Today",
        date: "February, 2026",
        description: "Celebrating us, and all the beautiful moments yet to come.",
        image: todayImg,
    }
];

const TimelineItem = ({ milestone, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-8 mb-24 ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl transform transition-transform hover:scale-105 duration-500">
                    <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="flex-1 text-center md:text-left">
                <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'}`}>
                    <span className="text-[var(--accent-gold)] font-serif text-xl mb-2">{milestone.date}</span>
                    <h3 className="text-4xl text-[var(--accent-rose)] mb-4">{milestone.title}</h3>
                    <p className="text-[var(--secondary-text)] text-lg leading-relaxed max-w-md">
                        {milestone.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <section id="timeline" className="section bg-[var(--bg-color)] py-20">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl mb-4 text-[var(--text-color)]">Our Journey</h2>
                    <div className="w-24 h-1 bg-[var(--accent-rose)] mx-auto"></div>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[var(--accent-gold)] opacity-30 hidden md:block"></div>

                    {milestones.map((milestone, index) => (
                        <TimelineItem key={milestone.id} milestone={milestone} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
