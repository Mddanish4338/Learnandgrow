import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import TeachingComponent from "./components/TeachingComponent";
import { AllInOneApp } from "./components/AllInOne";
import ImageGallery from "./components/imageGallery.jsx";
import { FeatureSection } from "./components/FeatureSection.jsx";
import TrendingCards from "./components/TrendingCards.jsx";
import CompanyCarousel from "./components/CompanyCarousal.jsx";
import StatsSection from "./components/numbers.jsx";
import TestimonialSection from "./components/RatingSection.jsx";
import JoinLearningWorld from "./components/JoinLearningWorld.jsx";
import Footer from "./components/Footer.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import About from "./pages/About.jsx";

const LandingRoutes = () => {
  const images = [
    "https://global.cornell.edu/sites/default/files/styles/landscape_banner_832x347/public/2021-08/2021_1121_002.jpg?h=d07d10a6&itok=meKUCCkT",
    "https://idsb.tmgrup.com.tr/ly/uploads/images/2022/11/30/244143.jpg",
    "https://www.nordangliaeducation.com/-/media/corporate/optimised-images/dcis_singapore_2020_252.jpg?rev=2d51d347f9eb4497907942d56a57a26c&hash=5E961AF61A6338CA2A4AF71581C20EF6",
    "https://www.upeducators.com/wp-content/uploads/2022/08/coding-for-educators-upeducators-copy1.png",
    "https://www.shutterstock.com/image-photo/code-academy-online-young-serious-260nw-1776939107.jpg",
    "https://www.bisedu.org.in/wp-content/uploads/2020/03/bis.jpg",
    "https://pxl-southwalesacuk.terminalfour.net/fit-in/549x549/filters:format(webp)/prod01/channel_2/media/university-of-south-wales/site-assets/images/03-courses/education/ma-education-innovation-in-learning-and-teaching-1.jpg",
    "https://code.org/images/self-paced-pl-tile-ai-101.jpg",
    "https://br.codecombat.com/images/pages/schools/boxes/box_privacy.webp",
    "https://www.raspberrypi.org/app/uploads/2023/03/image4-500x333.png",
  ];

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-gray-100 min-h-screen">
            <Header />
            <TeachingComponent />
            <AllInOneApp />
            <ImageGallery images={images} />
            <TrendingCards />
            <FeatureSection />
            <CompanyCarousel />
            <StatsSection />
            <TestimonialSection />
            <JoinLearningWorld />
            <Footer />
          </div>
        }
      />
      <Route path="/Terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default LandingRoutes;