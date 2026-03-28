import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Highlights from '../components/Highlights';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Highlights />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Home;