import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Hero from "../components/Hero";
import PopularSweets from "../components/PopularSweets";

const Home = () => {
  return (
    <div>
      <Hero/>
      <PopularSweets text = "Popular Sweets"/>
      <AboutUs />
      <ContactUs/>
    </div>
  );
};

export default Home;
