import React from 'react';
import { motion } from 'framer-motion';

const coupons = [
    {
        title: "Dinner Date",
        desc: "A romantic homemade dinner with your favorite meal.",
        bg: "bg-sky-100"
    },
    {
        title: "Movie Night",
        desc: "Unlimited movie picks + popcorn (and cuddles).",
        bg: "bg-indigo-100"
    },
    {
        title: "Weekend Getaway",
        desc: "A surprise trip to somewhere new.",
        bg: "bg-blue-100"
    },
    {
        title: "Massage",
        desc: "Redeemable for a 30-minute relaxing massage.",
        bg: "bg-teal-100"
    }
];

const VoucherCard = ({ coupon, index }) => {
    // Random rotation for polaroid effect
    const rotation = index % 2 === 0 ? 3 : -3;

    return (
        <motion.div
            className="bg-white p-4 pb-12 shadow-xl w-64 h-80 flex-shrink-0 relative overflow-hidden group cursor-pointer"
            initial={{ rotate: rotation, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{
                rotate: 0,
                scale: 1.1,
                zIndex: 50,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            viewport={{ once: true }}
        >
            <div className={`w - full h - 40 ${coupon.bg} mb - 4 flex items - center justify - center overflow - hidden`}>
                {/* Placeholder pattern or icon could go here */}
                <div className="text-4xl opacity-20">🎁</div>
            </div>

            <div className="text-center font-serif">
                <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">{coupon.title}</h3>
                <p className="text-sm text-[var(--secondary-text)] leading-snug px-2">
                    {coupon.desc}
                </p>
            </div>

            <div className="absolute bottom-2 right-4 text-xs font-mono text-gray-400">
                NO. {index + 1001}
            </div>
        </motion.div>
    );
};

const Vouchers = () => {
    return (
        <section className="section bg-[var(--bg-color)] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl mb-4 text-[var(--text-color)]">Your Gifts</h2>
                    <p className="text-[var(--secondary-text)]">Pick a polaroid to redeem</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-10">
                    {coupons.map((coupon, index) => (
                        <VoucherCard key={index} coupon={coupon} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vouchers;
