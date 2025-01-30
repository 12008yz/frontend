import React, { useEffect, useState } from "react";
import Avatar from "../../Avatar";
import { FaRegBell } from "react-icons/fa";
import { FaRegBellSlash } from "react-icons/fa";
import ClaimBonus from "../ClaimBonus";
import { IoMdExit } from "react-icons/io";
import { BiWallet } from "react-icons/bi";
import Monetary from "../../Monetary";
import { User } from '../../../app/types';
import { useDispatch } from 'react-redux'; // Импортируем useDispatch
import { logout } from "../../../features/authSlice"; // Импортируем функцию logout
import { useUserContext } from "../../../UserContext"; // Импортируем контекст пользователя

interface RightContentProps {
    loading: boolean;
    userData: User;
    openNotifications: boolean;
    setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightContent: React.FC<RightContentProps> = ({ loading, userData, openNotifications, setOpenNotifications }) => {
    const dispatch = useDispatch(); // Инициализируем dispatch
    const { toggleUserData } = useUserContext(); // Получаем функцию из контекста
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const isMobile = window.innerWidth <= 768;

    const handleLogout = () => {
        dispatch(logout()); // Вызываем действие logout
    };

    return (
        <div className="flex items-center gap-4">
            <div className="hidden md:flex">
                {
                     !loading && userData && userData.nextBonus && (
                        <ClaimBonus bonusDate={userData.nextBonus} userData={userData} />
                    )
                }
            </div>

            {!loading && (
                <div className="flex items-center gap-2 text-green-400 font-normal text-lg hover:text-green-300 transition-all">
                    <BiWallet className="text-2xl hidden md:block" />
                    <div className="max-w-[80px] md:max-w-[140px] overflow-hidden text-sm md:text-lg truncate">
                        <Monetary value={Math.floor(userData?.walletBalance)} />
                    </div>
                </div>
            )}

            <div className="relative cursor-pointer" onClick={() => setOpenNotifications(!openNotifications)}>
                {
                    openNotifications ? (
                        <FaRegBellSlash style={{ fontSize: "20px" }} />
                    ) : (
                        <FaRegBell style={{ width: "20px" }} />
                    )
                }
                {
                    hasUnreadNotifications && !openNotifications && (
                        <div className="absolute -top-1 -right-[2px] w-3 h-3 bg-red-500 rounded-full" />
                    )
                }
            </div>
            <Avatar 
                image={userData?.profilePicture} 
                loading={loading} 
                id={userData?.id} 
                size={isMobile ? "small" : "medium"} 
                level={userData?.level} 
                showLevel={true} 
            />
            <div
                className="text-[#625F7E] font-normal text-lg cursor-pointer hover:text-gray-200 transition-all"
                onClick={handleLogout}
            >
                <IoMdExit className="text-2xl" />
            </div>
        </div>
    );
}

export default RightContent;
