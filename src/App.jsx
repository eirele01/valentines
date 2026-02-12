import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import LoveNotes from './components/LoveNotes';
import Vouchers from './components/Vouchers';
import Reveal from './components/Reveal';

function App() {
  return (
    <div className="app bg-[var(--bg-color)] min-h-screen">
      <Hero />
      <Timeline />
      <LoveNotes />
      <Vouchers />
      <Reveal />

      <footer className="text-center py-8 text-gray-400 text-sm font-serif">
        Made with ❤️ for you
      </footer>
    </div>
  );
}

export default App;
