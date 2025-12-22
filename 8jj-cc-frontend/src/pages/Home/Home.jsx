import Header from "../../components/Header/Header";
import Alliance from "../../components/Alliance/Alliance";
import NewsTabs from "../../components/NewsTabs/NewsTabs";
import Footer from "../../components/Footer/Footer";
import HeroVideo from "../../components/HeroVideo/HeroVideo";


export default function Home() {
  return (
    <>
      <HeroVideo />
      <Alliance />
      <NewsTabs />
    </>
  );
}
