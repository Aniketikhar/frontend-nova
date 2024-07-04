import Layout from "./../components/Layout/Layout";
import React , {useState} from "react";
import "./Contact.css";
const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "497433c2-de7b-43d4-8797-eb5412cb1bcb");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      alert("form submit succcessfully");
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <Layout>
       <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get In Touch</h1>
        
      </div>
      <div className="contact-section">
        <div className="contact-left">
         
          <p>
          We're here to help! If you have any questions, feedback, or need assistance, please feel free to reach out to us. At NovaShop, your satisfaction is our top priority, and we're always ready to provide the support you need.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
              <p>novashop@ecommerce.com</p>
            </div>
            <div className="contact-detail">
            <i className="fa-solid fa-phone fa-lg me-3 fa-fw" />
              <p>+91 9518926199</p>
            </div>
            <div className="contact-detail">
            <i className="fa-solid fa-location-crosshairs fa-lg me-3 fa-fw" />
              <p>Jagnade Square</p>
            </div>
          </div>
          
        </div>
        <form onSubmit={onSubmit} className="contact-right">
            <label htmlFor="">Your Name</label>
            <input type="text" name="name" id="name " placeholder="Enter your name" />
            <label htmlFor="">Your Email</label>
            <input type="email" name="email" id="email " placeholder="Enter your email" />
            <label htmlFor="">write your message here</label>
            <textarea name="message" id="message" rows="8"></textarea>
            <button className="contact-submit">Submit Now</button>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;