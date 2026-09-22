import "./Home.css";

import FeaturedDishes from "./components/FeaturedDishes";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";

function Home() {
  return (
    <main className="home-page">

      <HeroSection />

      <FeaturedDishes />

      <StorySection />

    </main>
  );
}

export default Home;