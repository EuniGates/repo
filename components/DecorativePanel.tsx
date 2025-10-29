import React from 'react';

const DecorativePanel: React.FC = () => {
  return (
    <div className="m-12 xl:m-16 w-full flex flex-col justify-center items-center text-center">
        <div className="bg-white/30 backdrop-blur-sm p-8 rounded-2xl">
            <h1 className="text-4xl font-bold mb-4 text-indigo-900">Your Admin Hub</h1>
            <p className="text-lg leading-relaxed max-w-md text-indigo-800">
                Manage your store, track sales, and connect with customers all in one place.
            </p>
        </div>
        <div className="mt-10">
            <svg width="300" height="250" viewBox="0 0 329 279" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                <path d="M229.355 241.272C288.763 214.933 328.67 151.737 325.734 89.2847C322.798 26.8322 277.026 -33.7291 216.924 -46.4312C156.822 -59.1333 82.3905 -23.9766 38.6508 26.5492C-5.08888 77.075 -19.1265 155.127 15.932 208.538C50.9904 261.949 169.947 267.611 229.355 241.272Z" fill="url(#paint0_linear_1_2)"/>
                <path d="M198.665 278.43C275.096 256.331 324.93 186.853 322.031 112.553C319.132 38.2533 264.331 -28.1691 190.222 -46.7369C116.113 -65.3047 37.8876 -25.7368 -1.22234 32.748C-40.3323 91.2328 -48.5522 176.19 2.50346 230.158C53.5592 284.126 122.235 300.528 198.665 278.43Z" fill="url(#paint1_linear_1_2)"/>
                <defs>
                <linearGradient id="paint0_linear_1_2" x1="164.5" y1="-52" x2="164.5" y2="267" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A5B4FC"/>
                <stop offset="1" stopColor="#6366F1"/>
                </linearGradient>
                <linearGradient id="paint1_linear_1_2" x1="160.5" y1="-52" x2="160.5" y2="279" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.7"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                </defs>
            </svg>
        </div>
    </div>
  );
};

export default DecorativePanel;