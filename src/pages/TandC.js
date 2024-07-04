import React from "react";
import Layout from "./../components/Layout/Layout";

const TandC = () => {
  return (
    <Layout>
      <div className="tandc container py-4">
        <div>
          <h1>Terms and Conditions</h1>
          <h2>Introduction</h2>
          <p>
            Welcome to NovaShop. These Terms and Conditions outline the rules
            and regulations for the use of NovaShop's website and services. By
            accessing or using our site, you agree to comply with these terms.
            If you disagree with any part of these terms, please do not use our
            services.
          </p>
          <h2>Definitions</h2>
          <ul>
            <li>
              <strong>"Website"</strong> refers to the NovaShop website,
              accessible from www.novashop.com.
            </li>
            <li>
              <strong>"We", "Us", "Our"</strong> refers to NovaShop.
            </li>
            <li>
              <strong>"User", "You"</strong> refers to the individual using our
              website or services.
            </li>
          </ul>
          <h2>Use of the Website</h2>
          <ol>
            <li>
              <strong>Eligibility</strong>: You must be at least 18 years old to
              use our website. By using our site, you represent and warrant that
              you meet this age requirement.
            </li>
            <li>
              <strong>Account</strong>: To access certain features, you may need
              to create an account. You are responsible for maintaining the
              confidentiality of your account information and for all activities
              under your account.
            </li>
            <li>
              <strong>Prohibited Uses</strong>: You agree not to use the website
              for any unlawful purpose or any purpose prohibited under these
              terms. You agree not to engage in any activity that could harm the
              website, its services, or its users.
            </li>
          </ol>
          <h2>Products and Services</h2>
          <ol>
            <li>
              <strong>Product Descriptions</strong>: We strive to provide
              accurate descriptions of our products and services. However, we do
              not warrant that the descriptions are accurate, complete,
              reliable, current, or error-free.
            </li>
            <li>
              <strong>Pricing</strong>: Prices for products are subject to
              change without notice. We reserve the right to modify or
              discontinue any product or service without notice at any time.
            </li>
            <li>
              <strong>Orders</strong>: We reserve the right to refuse or cancel
              any order at our discretion. If we cancel an order, we will notify
              you and provide a full refund.
            </li>
          </ol>
          <h2>Payment</h2>
          <ol>
            <li>
              <strong>Payment Methods</strong>: We accept various payment
              methods as indicated on our website. By providing payment
              information, you represent and warrant that the information is
              accurate, you are authorized to use the payment method, and you
              authorize us to charge the payment method for the total amount of
              your order.
            </li>
            <li>
              <strong>Billing Information</strong>: You agree to provide
              current, complete, and accurate billing information for all
              purchases made at our website.
            </li>
          </ol>
          <h2>Shipping and Delivery</h2>
          <ol>
            <li>
              <strong>Shipping</strong>: We will ship products to the address
              you provide. Delivery times are estimates and are not guaranteed.
              We are not liable for any delays in shipping.
            </li>
            <li>
              <strong>Risk of Loss</strong>: All items purchased from NovaShop
              are made pursuant to a shipment contract. The risk of loss and
              title for such items pass to you upon our delivery to the carrier.
            </li>
          </ol>
          <h2>Returns and Refunds</h2>
          <p>
            Please refer to our{" "}
            <a href="www.novashop.com/return-policy">Return Policy</a> for
            information on returns and refunds.
          </p>
          <h2>Intellectual Property</h2>
          <ol>
            <li>
              <strong>Ownership</strong>: The website and its original content,
              features, and functionality are owned by NovaShop and are
              protected by international copyright, trademark, patent, trade
              secret, and other intellectual property or proprietary rights
              laws.
            </li>
            <li>
              <strong>License</strong>: We grant you a limited, non-exclusive,
              non-transferable, revocable license to use our website for
              personal, non-commercial use.
            </li>
          </ol>
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, NovaShop shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your use or inability to use our website;</li>
            <li>
              Any unauthorized access to or use of our servers and/or any
              personal information stored therein;
            </li>
            <li>
              Any interruption or cessation of transmission to or from our
              website;
            </li>
            <li>
              Any bugs, viruses, trojan horses, or the like that may be
              transmitted to or through our website by any third party;
            </li>
            <li>
              Any errors or omissions in any content or for any loss or damage
              incurred as a result of your use of any content posted, emailed,
              transmitted, or otherwise made available through the website.
            </li>
          </ul>
          <h2>Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with the laws of [Your State/Country], and you
            irrevocably submit to the exclusive jurisdiction of the courts in
            that State or location.
          </p>
          <h2>Changes to These Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms and Conditions
            at any time. Your continued use of the website following the posting
            of any changes constitutes acceptance of those changes.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p>
            NovaShop
            <br />
            Email:{" "}
            <a href="mailto:support@novashop.com">support@novashop.com</a>
            <br />
            Phone: +1 (800) 123-4567
          </p>
          <p>Thank you for choosing NovaShop.</p>
        </div>
      </div>
    </Layout>
  );
};

export default TandC;
