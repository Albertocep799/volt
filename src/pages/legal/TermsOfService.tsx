import React from 'react';
import './Legal.scss'; // Using shared styles

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      
      <p>Last Updated: October 26, 2023</p>

      <p>Welcome to Volt! These Terms of Service ("Terms") govern your use of the Volt website and services (collectively, the "Service"), operated by Volt Technologies Inc. By using our Service, you agree to these Terms.</p>

      <h2>1. Use of Our Service</h2>
      <p>You must be at least 13 years old to use the Service. You are responsible for your conduct and any data, text, information, and other content ("Content") that you submit to the Service.</p>

      <h2>2. User Accounts</h2>
      <p>To access certain features, you may need to create an account. You are responsible for safeguarding your account and for all activities that occur under it. You must notify us immediately of any unauthorized use of your account.</p>

      <h2>3. Prohibited Conduct</h2>
      <p>You agree not to engage in any of the following prohibited activities:</p>
      <ul>
        <li>Using the service for any illegal purpose or in violation of any local, state, national, or international law.</li>
        <li>Harassing, threatening, or defrauding other users.</li>
        <li>Interfering with the proper working of the Service.</li>
      </ul>

      <h2>4. Termination</h2>
      <p>We may terminate or suspend your access to the Service at any time, for any reason, without prior notice or liability.</p>

      <h2>5. Disclaimers</h2>
      <p>The Service is provided "as is" without any warranties of any kind. We do not guarantee that the Service will be available at all times or that it will be free of errors.</p>

      <h2>6. Governing Law</h2>
      <p>These Terms shall be governed by the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.</p>

       <h2>7. Changes to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@volt.gg">legal@volt.gg</a>.</p>
    </div>
  );
};

export default TermsOfService;
