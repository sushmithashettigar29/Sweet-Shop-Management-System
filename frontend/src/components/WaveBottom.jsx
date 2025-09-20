import React from "react";

function WaveBottom() {
  return (
    <div className="absolute bottom-0 w-full h-32 md:h-48">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#8B2321"
          d="M0,192L48,176C96,160,192,128,288,106.7C384,85,480,75,576,96C672,117,768,171,864,192C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default WaveBottom;
