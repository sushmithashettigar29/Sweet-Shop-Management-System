const Footer = () => {
  return (
    <footer className="font-sans text-[#FCE4EC] bg-[#8B2321] body-font pt-12">
      {/* Top Banner Section */}
      <div className="bg-[#FFC0CB] py-10 px-6 sm:px-12 md:px-24 flex flex-col md:flex-row justify-between items-center text-[#8B2321] rounded-4xl mx-10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Got a sweet tooth?
            <br />
            Join our newsletter!
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto max-w-sm">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow w-full bg-white bg-opacity-50 rounded border-3 border-[#8B2321]
              focus:ring-2 focus:bg-transparent focus:ring-[#8B2321] focus:border-[#8B2321]
              text-base outline-none text-[#8B2321] py-2 px-3 leading-8 transition-colors
              duration-200 ease-in-out mb-3 sm:mb-0 sm:mr-3"
          />
          <button
            className="inline-flex text-white bg-[#8B2321] border-0 py-2 px-6
            focus:outline-none rounded-full font-semibold transition-colors duration-200 shadow-md cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="py-16 px-6 sm:px-12 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo and Link Columns */}
          <div className="flex flex-col md:flex-row md:space-x-16 w-full md:w-auto">
            <div className="mb-8 md:mb-0">
              <h1 className="text-5xl font-extrabold text-white mb-2">
                Sweet.
              </h1>
            </div>
            {/* Link Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
              <ul className="space-y-3">
                <li>
                  <h3 className="font-bold text-white mb-2">Shop</h3>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    All Sweets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Seasonal Treats
                  </a>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <h3 className="font-bold text-white mb-2">Company</h3>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <h3 className="font-bold text-white mb-2">Support</h3>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    My Account
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* "Let's talk" Section */}
          <div className="mt-12 md:mt-0 text-center md:text-right">
            <h4 className="uppercase text-[#FFDAB9] text-sm mb-2">
              Ready to Order?
            </h4>
            <h2 className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight">
              Let's Go!
            </h2>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="bg-[#8B2321] border-t border-[#A84A47] py-6 px-6 sm:px-12 md:px-24 flex flex-col-reverse md:flex-row justify-between items-center text-sm">
        <div className="flex flex-col md:flex-row md:space-x-6 items-center mt-6 md:mt-0">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 bg-white text-[#8B2321] flex items-center justify-center rounded-lg shadow-lg cursor-pointer transition-colors duration-200 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
          <div className="flex flex-col md:flex-row md:space-x-6 text-white">
            <a
              href="#"
              className=" transition-colors mb-2 md:mb-0"
            >
              Cookies Policy
            </a>
            <a
              href="#"
              className=" transition-colors mb-2 md:mb-0"
            >
              Legal Terms
            </a>
            <a href="#" className=" transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6 inline-block"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6 inline-block"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
