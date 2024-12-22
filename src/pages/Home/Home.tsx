import { useEffect } from "react";
import { useGetCasesQuery } from "../../features/casesSlice"; 
import Banner from "./Banner"; 
import CaseListing from "./CaseListing";
import GameListing from "./GamesListing";
import Leaderboard from "./Leaderboard";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bitBG from '../../images/8bit.gif'
import hero from '../../images/hero.png'
import wallpaper from '../../images/wallpaper.jpg'
import bg_repead from '../../images/bg_repeat.jpg'

const Home = () => {
  // Используйте хук для получения данных о кейсах
  const { data: cases = [], error, isLoading } = useGetCasesQuery();

  useEffect(() => {
    if (error) {
      toast.error("Error while connecting to the server");
    }
  }, [error]);

  const BannerContent = [
    {
      left: {
        image: wallpaper,
        title: "CRASH GAME",
        description: "Не сгорай, лети высоко! Испытай свою удачу прямо сейчас!",
        link: "/crash",
      },
      right: (
        <div>
          <img src={bg_repead} alt="upgrade" />
        </div>
      ),
    },
    {
      left: {
        image: bitBG,
        title: "NEW UPGRADE GAME",
        description: "Go big or go home. Try your luck now!",
        link: "/upgrade",
      },
      right: null,
    },
    {
      left: {
        image: hero,
        title: "hide",
        description: "Try your luck now!",
        link: "/slots",
      },
      right: (
        <div className="hidden 2xl:flex 2xl:mr-36">
          <img src={hero} alt="kanicasino" />
        </div>
      ),
    },
  ];

  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        interval={7000}
        stopOnHover={false}
      >
        {BannerContent.map((item, index) => (
          <Banner key={index} left={item.left} right={item.right} />
        ))}
      </Carousel>

      {isLoading ? (
        <div className="flex items-center justify-center w-full mt-[164px]">
          <p className="text-white">Loading...</p>
        </div>
      ) : (
        <CaseListing
          name="Новые Кейсы"
          cases={cases.length > 6 ? cases.slice(0, 6) : cases}
        />
      )}
      <GameListing name="Our Games" />
      <Leaderboard />
    </>
  );
};

export default Home;