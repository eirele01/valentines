import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const coupons = [
  {
    title: "Dinner Date",
    desc: "A romantic homemade dinner with your favorite meal.",
    bg: "bg-sky-100",
  },
  {
    title: "Movie Night",
    desc: "Unlimited movie picks + popcorn (and cuddles).",
    bg: "bg-indigo-100",
  },
  {
    title: "Weekend Getaway",
    desc: "A surprise trip to somewhere new.",
    bg: "bg-blue-100",
  },
  {
    title: "Massage",
    desc: "Redeemable for a 30-minute relaxing massage.",
    bg: "bg-teal-100",
  },
];

const VoucherCard = ({ coupon, index, redeemed, onClick }) => {
  const rotation = index % 2 === 0 ? 3 : -3;

  return (
    <motion.div
      onClick={onClick}
      className={`bg-white p-4 pb-12 shadow-xl w-64 h-80 flex-shrink-0 relative overflow-hidden group cursor-pointer select-none ${
        redeemed ? "opacity-60" : ""
      }`}
      initial={{ rotate: rotation, opacity: 0 }}
      whileInView={{ opacity: 1 }}
      whileHover={{
        rotate: 0,
        scale: 1.07,
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      whileTap={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
    >
      {/* Image/Header block */}
      <div
        className={`w-full h-40 ${coupon.bg} mb-4 flex items-center justify-center overflow-hidden rounded-md`}
      >
        <div className="text-4xl opacity-20">🎁</div>
      </div>

      {/* Text */}
      <div className="text-center font-serif">
        <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">
          {coupon.title}
        </h3>
        <p className="text-sm text-[var(--secondary-text)] leading-snug px-2">
          {coupon.desc}
        </p>
      </div>

      {/* Footer number */}
      <div className="absolute bottom-2 right-4 text-xs font-mono text-gray-400">
        NO. {index + 1001}
      </div>

      {/* Redeemed badge */}
      {redeemed && (
        <div className="absolute top-3 right-3 text-xs font-semibold bg-black text-white px-2 py-1 rounded">
          Redeemed
        </div>
      )}
    </motion.div>
  );
};

const Modal = ({ isOpen, coupon, index, redeemed, onClose, onRedeem }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 z-10"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-gray-400 mb-1">
                  NO. {index + 1001}
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-color)]">
                  {coupon.title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div
              className={`mt-4 w-full h-40 ${coupon.bg} rounded-lg flex items-center justify-center`}
            >
              <div className="text-5xl opacity-25">🎁</div>
            </div>

            <p className="mt-4 text-[var(--secondary-text)]">
              {coupon.desc}
            </p>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                onClick={onRedeem}
                disabled={redeemed}
                className={`px-4 py-2 rounded-lg text-white ${
                  redeemed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-900"
                }`}
              >
                {redeemed ? "Already Redeemed" : "Redeem"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Vouchers = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [redeemedSet, setRedeemedSet] = React.useState(() => new Set());

  const selectedCoupon =
    selectedIndex !== null ? coupons[selectedIndex] : null;

  const isRedeemed =
    selectedIndex !== null ? redeemedSet.has(selectedIndex) : false;

  const closeModal = () => setSelectedIndex(null);

  const redeemSelected = () => {
    if (selectedIndex === null) return;
    setRedeemedSet((prev) => new Set(prev).add(selectedIndex));
  };

  return (
    <section className="section bg-[var(--bg-color)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--text-color)]">
            Your Gifts
          </h2>
          <p className="text-[var(--secondary-text)]">
            Pick a polaroid to redeem
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-10">
          {coupons.map((coupon, index) => (
            <VoucherCard
              key={index}
              coupon={coupon}
              index={index}
              redeemed={redeemedSet.has(index)}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={selectedIndex !== null}
        coupon={selectedCoupon || { title: "", desc: "", bg: "bg-gray-100" }}
        index={selectedIndex ?? 0}
        redeemed={isRedeemed}
        onClose={closeModal}
        onRedeem={redeemSelected}
      />
    </section>
  );
};

export default Vouchers;
