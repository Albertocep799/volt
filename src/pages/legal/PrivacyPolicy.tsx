import React from 'react';
import './Legal.scss'; // Using shared styles

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p>Last Updated: October 26, 2023</p>

      <p>Volt Technologies Inc. ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect personal information that you provide to us directly, such as your name, email address, and other contact details when you create an account. We also collect non-personal information, such as browser type and IP address, through cookies and other tracking technologies.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, operate, and maintain our Service.</li>
        <li>Improve, personalize, and expand our Service.</li>
        <li>Communicate with you, including for customer service and marketing purposes.</li>
        <li>Process your transactions.</li>
        <li>Monitor and analyze usage and trends to improve your experience.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>We do not sell your personal information. We may share information with third-party vendors and service providers who need access to such information to carry out work on our behalf. We may also share information if required by law.</p>

      <h2>4. Data Security</h2>
      <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.</p>
      
      <h2>5. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have rights regarding your personal data, such as the right to access, correct, or delete your information. Please contact us to exercise these rights.</p>

      <h2>6. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@volt.gg">privacy@volt.gg</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;
