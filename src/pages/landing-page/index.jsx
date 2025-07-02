import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatisticsSection from './components/StatisticsSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>AnomalyTracker - ENSA Béni Mellal | Signalement et Suivi des Anomalies</title>
        <meta 
          name="description" 
          content="Plateforme moderne de signalement et de suivi des anomalies pour l'ENSA Béni Mellal. Signalez facilement les problèmes d'infrastructure et suivez leur résolution en temps réel." 
        />
        <meta name="keywords" content="ENSA, Béni Mellal, anomalies, signalement, suivi, infrastructure, étudiants, maintenance" />
        <meta name="author" content="ENSA Béni Mellal" />
        <meta property="og:title" content="AnomalyTracker - ENSA Béni Mellal" />
        <meta property="og:description" content="Signalez et suivez les anomalies d'infrastructure à l'ENSA Béni Mellal" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <PublicHeader />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Statistics Section */}
          <StatisticsSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* About Section */}
          <AboutSection />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
};

export default LandingPage;