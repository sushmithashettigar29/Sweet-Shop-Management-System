import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  return (
    <div className="relative font-sans">
      <section className="py-16 px-6 sm:px-12 md:px-24 bg-[#FDF0D5]">
        <div className="relative w-full md:w-3/4 max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden z-10">
          {/* Left side with contact info */}
          <div className="w-full md:w-2/5 p-8 text-white bg-[#8B2321] flex flex-col justify-center">
            <div className="space-y-6">
              {/* CALL */}
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h4 className="text-xl font-bold">CALL US</h4>
                  <p className="text-sm">1 (234) 567-891, 1 (234) 987-654</p>
                </div>
              </div>
              {/* LOCATION */}
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-xl font-bold">LOCATION</h4>
                  <p className="text-sm">Sweet Street, USA</p>
                </div>
              </div>
              {/* BUSINESS HOURS */}
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-xl font-bold">BUSINESS HOURS</h4>
                  <p className="text-sm">Mon-Sat: 10am - 8pm, Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side with form */}
          <div className="w-full md:w-3/5 p-8 md:p-12 bg-white">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-[#8B2321] mb-12 leading-tight tracking-tight">
              Contact Us
            </h3>
            {submitSuccess && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">
                  Thank you for your message! We'll be in touch soon.
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#8B2321] transition-colors placeholder:text-gray-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-8">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter a valid email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#8B2321] transition-colors placeholder:text-gray-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-8">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#8B2321] transition-colors placeholder:text-gray-500"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 border-2 border-[#8B2321] text-white font-semibold bg-[#8B2321] cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
