import { ArrowUp, Headphones, MapPin, Newspaper } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <a className="back-to-top" href="#top">
        <ArrowUp size={24} />
        <span>Back To Top</span>
      </a>

      <div className="page-width footer-grid">
        <section className="footer-column">
          <h2>
            <MapPin aria-hidden="true" />
            Location
          </h2>
          <p>
            Shoes Market Co.
            <br />
            2026 Alberta St SW
            <br />
            Calgary
            <br />
            AB
            <br />
            (1A2 B3C)
          </p>
        </section>

        <section className="footer-column">
          <h2>
            <Headphones aria-hidden="true" />
            Customer Service
          </h2>
          <p>
            +1 123 456 7890
            <br />
            shoesService@gmail.com
            <br />
            <a href="#faqs">FAQs</a>
          </p>
        </section>

        <section className="footer-column">
          <h2>
            <Newspaper aria-hidden="true" />
            Follow Up
          </h2>

          <div className="social-links" aria-label="social media">
            <a href="#instagram" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#X" className="x-link" aria-label="X">
              <FaXTwitter />
            </a>
            <a href="#facebook" className="text-social" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#youtube" aria-label="Youtube">
              <FaYoutube />
            </a>
            <a href="#tiktok" className="text-social" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>

          <p>
            Stay in the know with
            <br />
            our latest offers.
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
