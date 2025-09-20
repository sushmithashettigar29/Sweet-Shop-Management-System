const AboutUs = () => {
  return (
    <div className="font-sans text-[#8B2321] bg-[#FDF0D5] min-h-screen py-16 px-6 sm:px-12 md:px-24">
      {/* Hero Section */}
      {/* "About Us" Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#8B2321] mb-4 leading-tight tracking-tight">
          About Us
        </h1>
        <p className="text-xl sm:text-2xl text-[#8B2321] max-w-3xl mx-auto">
          We believe in the magic of a perfect sweet treat.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-12 mb-20">
        {/* Left Section - Hero Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#8B2321] mb-6 leading-tight">
            Our Story, Our Sweetness
          </h1>
          <p className="text-[#8B2321] text-lg max-w-lg mx-auto md:mx-0">
            Welcome to the heart of our sweet shop. We are a family of candy
            lovers dedicated to crafting the most delightful treats. Our journey
            is a blend of tradition, innovation, and a whole lot of love.
          </p>
        </div>

        {/* Right Section - Image & Statistics */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full relative">
            <img
              src="https://placehold.co/800x600/FDF0D5/FDF0D5?text=A+Pile+of+Candy"
              alt="A large pile of assorted candies"
              className="w-full h-auto object-cover rounded-3xl shadow-2xl transform rotate-2"
            />
            <img
              src="https://5.imimg.com/data5/AS/UH/DU/SELLER-8711856/sweet-shop-designing-service.jpeg"
              alt="Sweet Shop Interior"
              className="w-full h-auto object-cover rounded-3xl shadow-2xl absolute top-0 left-0 transform -rotate-6"
            />
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      {/* Philosophy Section */}
      <div className="relative bg-[#8B2321] py-16 px-6 sm:px-12 md:px-20">
        <div className="text-center md:text-left mx-auto max-w-4xl text-[#FDF0D5]">
          <h2 className="text-3xl font-bold mb-4">The Art of Confectionery</h2>
          <p className="text-lg">
            From classic candies to unique creations, we take pride in our
            diverse selection. Each sweet is a small work of art, made to
            delight your senses and satisfy your cravings. We are constantly
            experimenting to bring you the next perfect treat.
          </p>
        </div>
      </div>

      {/* Why Us? Section */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#8B2321] mb-12 leading-tight tracking-tight">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Box 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h3 className="text-2xl font-bold text-[#8B2321] mb-4">
              Quality Ingredients
            </h3>
            <p className="text-[#8B2321]">
              We use only the finest ingredients to craft our delicious treats.
            </p>
          </div>
          {/* Box 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h3 className="text-2xl font-bold text-[#8B2321] mb-4">
              Handcrafted with Love
            </h3>
            <p className="text-[#8B2321]">
              Every sweet is made with care and passion by our dedicated team.
            </p>
          </div>
          {/* Box 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h3 className="text-2xl font-bold text-[#8B2321] mb-4">
              Unique Flavors
            </h3>
            <p className="text-[#8B2321]">
              We constantly innovate to bring you unique and exciting flavor
              combinations.
            </p>
          </div>
          {/* Box 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h3 className="text-2xl font-bold text-[#8B2321] mb-4">
              Customer Delight
            </h3>
            <p className="text-[#8B2321]">
              Your happiness is our top priority, and we strive to provide the
              best service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
