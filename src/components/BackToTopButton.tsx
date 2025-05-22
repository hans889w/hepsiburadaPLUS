import React from 'react';
import { useState, useEffect } from "react";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={backToTop}
      id="btn-back-to-top"
      className={`${
        isVisible ? "flex" : "hidden"
      } fixed bottom-6 right-6 z-50 items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-800 font-semibold shadow-md border border-gray-300`}
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
      Başa dön
    </button>
  );
}

export default BackToTopButton;
