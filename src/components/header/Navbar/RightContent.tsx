import React, { useEffect, useState } from "react";
import Avatar from "../../Avatar";
import { FaRegBell, FaRegBellSlash } from "react-icons/fa";
import ClaimBonus from "../ClaimBonus";
import { IoMdExit } from "react-icons/io";
import { BiWallet } from "react-icons/bi";
import Monetary from "../../Monetary";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../features/authSlice";
import { useGetNotificationsQuery } from '../../../app/services/users/UserServicer';
import Notifications from './Notitfications';
import { RootState } from '../../../app/store';
import { useNavigate } from "react-router-dom";
import { localStorageService } from "../../../utils/localStorage";

const RightContent: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Получаем данные пользователя из authSlice
    const userData = useSelector((state: RootState) => state.auth.user);
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    
    // Состояния для уведомлений
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    
    // Проверяем мобильное устройство
    const isMobile = window.innerWidth <= 768;
    
    // Получаем уведомления
    const { data: notifications = [] } = useGetNotificationsQuery(1);

    // Проверяем непрочитанные уведомления
    useEffect(() => {
        const unreadCount = notifications.filter((notification: { read: boolean }) => !notification.read).length;
        setHasUnreadNotifications(unreadCount > 0);
    }, [notifications]);

    // Обработка выхода
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    // Если идет загрузка, показываем индикатор
    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div className="flex items-center gap-4">
            {/* Бонус */}
            {userData?.nextBonus && (
                <div className="hidden md:flex">
                    <ClaimBonus bonusDate={userData.nextBonus} userData={userData} />
                </div>
            )}

            {/* Основной контент */}
            {userData && (
                <>
                    {/* Баланс */}
                    <div className="flex items-center gap-2 text-green-400 font-normal text-lg hover:text-green-300 transition-all">
                        <BiWallet className="text-2xl hidden md:block" />
                        <div className="max-w-[80px] md:max-w-[140px] overflow-hidden text-sm md:text-lg truncate">
                            <Monetary value={Math.floor(userData.walletBalance)} />
                        </div>
                    </div>

                    {/* Уведомления */}
                    <div className="relative cursor-pointer" onClick={() => setOpenNotifications(!openNotifications)}>
                        {notifications ? (
                            <FaRegBellSlash style={{ fontSize: "20px" }} />
                        ) : (
                            <FaRegBell style={{ width: "20px" }} />
                        )}
                        {hasUnreadNotifications && !openNotifications && (
                            <div className="absolute -top-1 -right-[2px] w-3 h-3 bg-red-500 rounded-full" />
                        )}
                        <Notifications openNotifications={openNotifications} setOpenNotifications={setOpenNotifications} />
                    </div>

                    {/* Профиль пользователя */}
                    <div className="flex items-center gap-2">
                        <div>
                            <Avatar 
                                image={userData.profilePicture} 
                                loading={isLoading} 
                                id={userData.id} 
                                size={isMobile ? "small" : "medium"} 
                                level={userData.level} 
                                showLevel={true} 
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{userData.username}</span>
                        </div>
                    </div>
                </>
            )}

            {/* Выход */}
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
