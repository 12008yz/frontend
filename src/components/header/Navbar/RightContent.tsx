import React, { useEffect, useState } from "react";
import Avatar from "../../Avatar";
import { FaRegBell } from "react-icons/fa";
import { FaRegBellSlash } from "react-icons/fa";
import ClaimBonus from "../ClaimBonus";
import { IoMdExit } from "react-icons/io";
import { BiWallet } from "react-icons/bi";
import Monetary from "../../Monetary";
import { User } from '../../../app/types';
import { useDispatch, useSelector } from 'react-redux'; // Импортируем useDispatch и useSelector
import { logout } from "../../../features/authSlice"; // Импортируем функцию logout
import { useGetNotificationsQuery } from '../../../app/services/users/UserServicer'; // Импортируем хук для получения уведомлений
import Notifications from './Notitfications'; // Импортируем компонент уведомлений

interface RightContentProps {
    loading: boolean;
    openNotifications: boolean;
    setOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightContent: React.FC<RightContentProps> = ({ loading, openNotifications, setOpenNotifications }) => {
    const dispatch = useDispatch(); // Инициализируем dispatch
    const userData = useSelector((state: any) => state.user.user); // Получаем данные пользователя из Redux
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const isMobile = window.innerWidth <= 768;

    const { data: notifications = [] } = useGetNotificationsQuery(1); // Получаем уведомления для первой страницы
    useEffect(() => {
        // Проверяем наличие непрочитанных уведомлений
        const unreadCount = notifications.filter((notification: { read: boolean }) => !notification.read).length;
        setHasUnreadNotifications(unreadCount > 0);
    }, [notifications]);

    const handleLogout = () => {
        dispatch(logout()); // Вызываем действие logout
    };

    return ( 
        <>
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

            <div className="relative cursor-pointer" onClick={() => {
                console.log("Текущие уведомления:", openNotifications);
                setOpenNotifications(!openNotifications);
            }}>
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
                <Notifications openNotifications={openNotifications} setOpenNotifications={setOpenNotifications} />
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
        </>
    );
}

export default RightContent;
