import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext"; // Обновленный путь к UserContext
import MainButton from "../../MainButton"; // Обновленный путь к MainButton
import { clearTokens } from "../../../features/authSlice"; // Обновленный путь к функции clearTokens
import { useMeQuery } from "../../../app/services/auth/auth"; // Обновленный путь к функции получения информации о пользователе
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineSell } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { SlPlane } from "react-icons/sl";
import { GiUpgrade } from 'react-icons/gi';
import { TbCat } from "react-icons/tb";
import { toast } from "react-toastify";
import { FaBars } from 'react-icons/fa';
import RightContent from "./RightContent"; 

interface NavbarProps {
  openNotifications: boolean;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ openNotifications, setOpenNotifications, openSidebar, setOpenSidebar }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { isLogged, toggleUserFlow, toggleUserData, user } = useUserContext();

  const handleHover = () => {
    setIsHovering(!isHovering);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const Logout = () => {
    clearTokens();
    toggleUserData(null);
  };

  const getUserInfo = async () => {
    const { data, error } = useMeQuery(); // Используем RTK Query для получения информации о пользователе
    if (data) {
      toggleUserData(data);
      setLoading(false);
    } else {
      console.log(error);
      toast.error("Please, login again");
      Logout();
      setLoading(false);
    }
  };

  const links = [
    {
      name: "Market",
      path: "/marketplace",
      icon: <MdOutlineSell className="text-2xl" />,
    },
    {
      name: "Coin Flip",
      path: "/coinflip",
      icon: <BsCoin className="text-2xl" />,
    },
    {
      name: "Crash",
      path: "/crash",
      icon: <SlPlane className="text-2xl" />,
    },
    {
      name: "Upgrade",
      path: "/upgrade",
      icon: <GiUpgrade className="text-2xl" />,
    },
    {
      name: "Slots",
      path: "/slot",
      icon: <TbCat className="text-2xl" />,
    }
  ];

  useEffect(() => {
    if (isLogged) {
      getUserInfo();
      toggleUserFlow();
    }
  }, [isLogged]);

  return (
    <div className="w-full flex justify-center">
      <nav className="py-4 px-8 bg-[#19172D] w-[calc(100vw-2rem)] max-w-[1920px] flex justify-center notched">
        <div className="flex items-center justify-between w-full">
          <div className="md:hidden">
            <FaBars onClick={toggleSidebar} className="text-2xl cursor-pointer" />
          </div>
          <div className="hidden md:flex">
            <Link to="/">
              <div
                className="flex items-center gap-2"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
              >
                <img
                  src=""
                  alt="logo"
                  className="w-12 h-12 object-contain"
                />
                <div className="hidden md:flex flex-col justify-center">
                  <div className="font-normal text-xl text-white">
                    KaniCasino
                  </div>
                  <div className="absolute">
                    <div
                      className={`flex items-center justify-center transition-all duration-300 text-[#9793ba] text-[10px] ${isHovering ? "opacity-100 mt-10" : "opacity-0 -mt-2"}`}
                    >
                      REIMU FUMO ᗜ˰ᗜ
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            <div className="hidden md:flex items-center gap-6 ml-8 overflow-hidden">
              {links.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="flex items-center gap-2 font-normal text-xs 2xl:text-lg cursor-pointer"
                >
                  <span className="text-[#625F7E] hover:text-gray-200 transition-all">
                    {link.icon}
                  </span>
                  <span className="text-white hover:text-gray-200 transition-all">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {isLogged ? (
  <RightContent 
    loading={loading} 
    userData={user!} // Использование оператора "!" для утверждения, что user не null
    openNotifications={openNotifications} 
    setOpenNotifications={setOpenNotifications} 
    Logout={Logout} 
  />
) : (
  <div className="flex items-center gap-4">
    <MainButton
      text="Sign In"
      onClick={toggleUserFlow} // Используем функцию для открытия пользовательского интерфейса
    />
  </div>
)}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;