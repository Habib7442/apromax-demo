'use client'

import HeroSection from '@/components/marketing/HeroSection'
import ServicesBento from '@/components/marketing/ServicesBento'
import WhoWeAreContainer from '@/components/containers/who-we-are-container'
import ContactUsContainer from '@/components/containers/contact-us-container'
import FAQSection from '@/components/FaqSection'

const Home = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Services Bento Grid */}
      <div id="services-section">
        <ServicesBento />
      </div>

      {/* Who We Are Section */}
      <WhoWeAreContainer />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section 
        id="contact-section"
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <ContactUsContainer />
        </div>
      </section>
    </main>
  );
};

export default Home;