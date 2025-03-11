import React from "react";

export default function CTAButton({ text, onClick, className }) {
  return(
    <button 
      onClick={onClick}
      className={`p-2 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors ${className || "w-full"}`}
    >
      {text}
    </button>
  )
}