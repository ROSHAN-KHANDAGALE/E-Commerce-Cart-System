import React from "react";
import { FaInstagram, FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-lg">© 2024 Creator : Roshan Khandagale</p>
        <div className="flex space-x-4 text-gray-400">
          <a href="#" className="hover:text-gray-300">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaGithub size={20} />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
