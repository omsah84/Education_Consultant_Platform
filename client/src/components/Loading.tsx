"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      <div className="flex space-x-3">
        <span className="w-5 h-5 bg-white rounded-full animate-bounce [animation-delay:-0.4s] shadow-lg" />
        <span className="w-5 h-5 bg-white rounded-full animate-bounce [animation-delay:-0.2s] shadow-lg" />
        <span className="w-5 h-5 bg-white rounded-full animate-bounce shadow-lg" />
      </div>
    </div>
  );
};

export default Loading;
