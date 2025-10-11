import { useState } from 'react';
import './Contact.scss';
import { FaMapMarkerAlt, FaEnvelope, FaRocket, FaQuestionCircle } from 'react-icons/fa';

// Dummy FAQ data
const faqs = [
  { q: 'How does Volt select communities for campaigns?', a: 'Our AI takes into account past campaign data first and foremost to predict performance per community, also using our zero-party survey data showing interests, and location, and contextual fit.' },
  { q: 'What ad formats are available?', a: 'Depending on the brief, we’d recommend relevant formats like gaming tournament sponsorships, announcements, giveaways, UGC competitions or something bespoke like a Discord Activity!' },
  { q: 'Do you manage campaigns?', a: 'Volt is a fully-managed service, taking a brief and translating into a community-first creative strategy with reporting and measurement in place.' },
  { q: 'What campaign analytics are offered?', a: 'We report on estimated impressions, clicks, engagements (mentions/reactions), conversions and brand uplift studies are included on every campaign as added value, by default!' },
  { q: 'How do you ensure brand safety?', a: 'We vet communities during onboarding to assess content suitability and activity levels. Discord has its own ever-improving AI moderation capabilities, and ensure a community’s mods and Volt staff are watching closely during brand activations.' },
  { q: 'Can you provide case studies?', a: 'Absolutely! Get in touch and we can show how we’ve driven results with our creative strategy and audience network across Discord. You can get a log on your first campaign.' },
];

const Contact = () => {
  const [contactType, setContactType] = useState('brands'); // 'brands' or 'creators'

  const handleToggle = () => {
    setContactType(prevType => prevType === 'brands' ? 'creators' : 'brands');
  };

  return (
    <div className="contact-page">
      <section className="contact-hero-section animated-section in-view">
        <div className="contact-hero-content">
          <div className="contact-info">
            <h1 className="contact-title">
              GET IN <span className="highlight">TOUCH</span> <FaRocket className="title-icon" />
            </h1>
            <p className="contact-subtitle">Fill out your details and we’ll come back to you ASAP!</p>
            <div className="info-blocks">
              <div className="info-block">
                <FaMapMarkerAlt className="info-icon" />
                <h4>Live from</h4>
                <p>Office 7, 35-37 Ludgate Hill<br/>London, EC4M 7JN</p>
              </div>
              <div className="info-block">
                <FaEnvelope className="info-icon" />
                <h4>Get in Touch</h4>
                <p>info@volt.gg</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {/* New Toggle Switch inspired by the screenshot */}
            <div className="form-toggle-container">
              <span className={contactType === 'brands' ? 'active' : ''}>For Brands</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={contactType === 'creators'} onChange={handleToggle} />
                <span className="slider"></span>
              </label>
              <span className={contactType === 'creators' ? 'active' : ''}>For Creators</span>
            </div>
            
            <form className="contact-form">
              {contactType === 'brands' ? (
                <>
                  <div className="form-row">
                    <input type="text" placeholder="First Name*" required />
                    <input type="text" placeholder="Last Name*" required />
                  </div>
                  <input type="text" placeholder="Company name*" required />
                  <input type="email" placeholder="Email*" required />
                  <textarea placeholder="Message" rows={5}></textarea>
                  <input type="text" placeholder="Where did you hear about Volt?" />
                </>
              ) : (
                <>
                  <div className="form-row">
                    <input type="text" placeholder="First Name*" required />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <input type="text" placeholder="https://discord.gg/community*" required />
                  <input type="email" placeholder="Email*" required />
                  <textarea placeholder="Message" rows={5}></textarea>
                </>
              )}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </section>

      <section className="faq-section animated-section in-view">
        <h2 className="faq-title">
          FREQUENTLY ASKED <span className="highlight">QUESTIONS</span> <FaQuestionCircle className="title-icon" />
        </h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
