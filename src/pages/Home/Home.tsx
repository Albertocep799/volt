import React from 'react';
import Hero from '../../components/Hero/Hero';
import Features from '../Features/Features';
import HowItWorks from '../HowItWorks/HowItWorks';
import Testimonials from '../Testimonials/Testimonials';
import FAQ from '../FAQ/FAQ';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
