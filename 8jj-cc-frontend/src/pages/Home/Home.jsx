import Alliance from "../../components/Alliance/Alliance";
import NewsTabs from "../../components/NewsTabs/NewsTabs";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import Slider from "../../components/Slider/Slider";
import Slide1 from "../../../public/images/slide1.jpg";
import Slide2 from "../../../public/images/slide2.jpg";
import Slide3 from "../../../public/images/slide3.jpg";

export default function Home() {

  const slides = [
    {
      id: 1,
      image: Slide1,
      link: "/news/8jj-official-announcement",
    },
    {
      id: 2,
      image: Slide2,
      link: "/news/deepak-chahar-brand-ambassador",
    },
    {
      id: 3,
      image: Slide3,
      link: "/news/harbhajan-singh-brand-ambassador",
    },
  ];

  return (
    <>
      <HeroVideo />
      <Alliance />
      <Slider slides={slides} /> 
      <NewsTabs />
    </>
  );
}
