import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import MainButton from "../../MainButton"; 
import { clearTokens } from "../../../features/authSlice"; 
import { useGetUserQuery } from "../../../app/services/users/UserServicer"; 
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineSell } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { SlPlane } from "react-icons/sl";
import { GiUpgrade } from 'react-icons/gi';
import { TbCat } from "react-icons/tb";
import { toast } from "react-toastify";
import { FaBars } from 'react-icons/fa';
import RightContent from "./RightContent"; 
import { useUserContext } from "../../../UserContext";
import LoginPage from "../userFlow/Login"; 
import { selectUser } from "../../../features/authSlice"; 

interface NavbarProps {
  openNotifications: boolean;
  setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ openSidebar, setOpenSidebar }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  const user = useSelector(selectUser); // Получаем данные пользователя из состояния
  const isLogged = !!user; 
console.log("selectUser:",selectUser)
console.log("Данные пользователя из selectUser:", user);
  return (
    <div className="w-full flex justify-center">
      <nav className="py-4 px-8 bg-[#19172D] w-[calc(100vw-2rem)] max-w-[1920px] flex justify-center notched">
        <div className="flex items-center justify-between w-full">
          <div className="md:hidden">
            <FaBars onClick={() => setOpenSidebar(true)} className="text-2xl cursor-pointer" />
          </div>
          <div className="hidden md:flex">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img src="" alt="logo" className="w-12 h-12 object-contain" />
                <div className="hidden md:flex flex-col justify-center">
                  <div className="font-normal text-xl text-white">
                    KaniCasino
                  </div>
                  <div className="absolute">
                    <div className="flex items-center justify-center transition-all duration-300 text-[#9793ba] text-[10px]">
                      {isLogged ? `Привет, ${user.username}` : (
                        <button onClick={() => setIsModalOpen(true)}>Войти</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            {/* Остальная часть Navbar */}
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <LoginPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;