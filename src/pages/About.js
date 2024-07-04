import React from "react";
import Layout from "./../components/Layout/Layout";

import Lottie from "lottie-react";
import animationData from "../Animation - 1716743918714.json";

const About = () => {
  return (
    <Layout>
      <div className="container h-auto py-5 ">
        <Lottie animationData={animationData} className="w-75 mx-auto" />

        <h2>About Us</h2>
        <p>
          Welcome to NovaShop, your premier destination for all things
          eCommerce. At NovaShop, we are dedicated to transforming the online
          shopping experience, making it easier, faster, and more enjoyable for
          both businesses and customers.
        </p>

        <h3>Our Mission</h3>
        <p>
          Our mission is to empower businesses by providing an intuitive,
          feature-rich platform that meets the evolving needs of the modern
          marketplace. We believe in innovation, customer satisfaction, and
          continuous improvement, ensuring that our clients stay ahead in the
          competitive eCommerce landscape.
        </p>

        <h3>Who We Are</h3>
        <p>
          Founded by a team of passionate tech enthusiasts and retail experts,
          NovaShop combines cutting-edge technology with a deep understanding of
          consumer behavior. Our diverse backgrounds enable us to deliver a
          robust, user-friendly platform tailored to your business needs.
        </p>

        <h3>What We Offer</h3>

        <ul>
          <li>
            Customizable Storefronts: Create a unique shopping experience with
            our customizable templates and design tools.
          </li>
          <li>
            Secure Transactions: Our advanced security measures ensure that your
            data and transactions are always protected.
          </li>
          <li>
            Comprehensive Analytics: Gain valuable insights into your business
            performance with our detailed analytics and reporting features.
          </li>
          <li>
            24/7 Support: Our dedicated support team is always here to assist
            you, anytime you need it.
          </li>
        </ul>
        <h3>Why Choose NovaShop?</h3>
        <p>
          We pride ourselves on our commitment to excellence, innovation, and
          customer satisfaction. Whether you're a small business owner or a
          large enterprise, NovaShop offers the tools and support you need to
          succeed in the digital marketplace.
        </p>

        <p>
          Join us today and experience the future of eCommerce with NovaShop.
          Together, let's build something extraordinary.
        </p>
      </div>
    </Layout>
  );
};

export default About;
