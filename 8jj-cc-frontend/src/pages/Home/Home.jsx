import Alliance from "../../components/Alliance/Alliance";
import NewsTabs from "../../components/NewsTabs/NewsTabs";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import Slider from "../../components/Slider/Slider";

import slide1 from "../../assets/Slide1.jpg";
import slide2 from "../../assets/Slide2.jpg";
import slide3 from "../../assets/Slide3.jpg";

export default function Home() {
  const slides = [
    {
      id: 1,
      image: slide1,
      link: "/news/8jj-official-announcement",
    },
    {
      id: 2,
      image: slide2,
      link: "/news/deepak-chahar-brand-ambassador",
    },
    {
      id: 3,
      image: slide3,
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
