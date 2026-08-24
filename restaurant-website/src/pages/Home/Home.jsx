import "./Home.css";

import FeaturedDishes from "./components/FeaturedDishes";
import HeroSection from "./components/HeroSection";
import InfoSection from "./components/InfoSection";
import StorySection from "./components/StorySection";

function Home() {



  return (
    <main className="home-page">

      <HeroSection></HeroSection>
      <FeaturedDishes></FeaturedDishes>
      <StorySection></StorySection>
      <InfoSection></InfoSection>
    </main>
  );
}

export default Home;