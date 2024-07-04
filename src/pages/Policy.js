import React from "react";
import Layout from "./../components/Layout/Layout";

import Lottie from "lottie-react";
import animationData from "../Animation - 1716745476829.json";


const Policy = () => {
  return (
    <Layout>
      <div className="container h-100 py-4">
        
        <Lottie animationData={animationData} className="w-50 mx-auto" />
        
          <h2>Privacy Policy</h2>
          <h3>Introduction</h3>
          <p>
            Welcome to NovaShop. We are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, and safeguard your data when
            you use our website and services.
          </p>
          <h4>Information We Collect</h4>
          <ol>
            <li>
              Personal Information: When you register on our site, place an
              order, or subscribe to our newsletter, we may collect personal
              details such as your name, email address, mailing address, phone
              number, and payment information.
            </li>
            <li>
              Non-Personal Information: We may collect non-personal data,
              including browser type, operating system, and IP address, to
              improve our website's functionality and user experience.
            </li>
            <li>
              Cookies and Tracking Technologies: We use cookies and similar
              technologies to enhance your experience, gather general visitor
              information, and track visits to our site.
            </li>
          </ol>
          <h4>How We Use Your Information</h4>
          <ol>
            <li>
              To Process Transactions: Your personal information is used to
              process orders, manage payments, and deliver products or services.
            </li>
            <li>
              To Improve Our Website: We continually strive to improve our
              website offerings based on the information and feedback we receive
              from you.
            </li>
            <li>
              To Send Periodic Emails: The email address you provide may be used
              to send you information, respond to inquiries, and other requests
              or questions.
            </li>
          </ol>
          <h3>How We Protect Your Information</h3>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. Your data is stored on secure servers,
            and sensitive information (such as credit card details) is encrypted
            via Secure Socket Layer (SSL) technology.
          </p>
          <h3>Sharing Your Information</h3>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information. This does not include trusted
            third parties who assist us in operating our website, conducting our
            business, or servicing you, as long as those parties agree to keep
            this information confidential.
          </p>
          <h3>Your Rights</h3>
          <p>
            Access and Correction: You have the right to access and correct your
            personal information at any time by logging into your account or
            contacting us directly.
          </p>
          <p>
            Opt-Out: You may opt-out of receiving future emails from us by
            following the unsubscribe instructions included in each email.
          </p>
          <h3>Third-Party Links</h3>
          <p>
            Occasionally, at our discretion, we may include or offer third-party
            products or services on our website. These third-party sites have
            separate and independent privacy policies. We therefore have no
            responsibility or liability for the content and activities of these
            linked sites.
          </p>
          <h3>Changes to Our Privacy Policy</h3>
          <p>
            NovaShop reserves the right to update this Privacy Policy at any
            time. We will notify you of any changes by posting the new Privacy
            Policy on our website. You are advised to review this Privacy Policy
            periodically for any changes.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <h4>NovaShop</h4>
          <p>jagnade square nagpur</p>
          Email: novashop@ecommerce.com Phone: +91 9518902599
          <p>
            Thank you for choosing NovaShop. Your privacy is important to us,
            and we are committed to protecting your personal information.
          </p>
        
      </div>
    </Layout>
  );
};

export default Policy;
