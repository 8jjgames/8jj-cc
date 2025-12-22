import Alliance from "../../components/Alliance/Alliance";
import NewsTabs from "../../components/NewsTabs/NewsTabs";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import Slider from "../../components/Slider/Slider";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <Alliance />
      <Slider /> 
      <NewsTabs />
    </>
  );
}
