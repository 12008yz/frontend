import React, { useEffect, useState } from "react";
import Avatar from "../../Avatar";
import { FaRegBell } from "react-icons/fa";
import { FaRegBellSlash } from "react-icons/fa";
import ClaimBonus from "../ClaimBonus";
import { IoMdExit } from "react-icons/io";
import { BiWallet } from "react-icons/bi";
import Monetary from "../../Monetary";
import { User } from '../../../app/types';
import { useDispatch } from 'react-redux'; 
import { logout } from "../../../features/authSlice"; 
import { useGetNotificationsQuery } from '../../../app/services/users/UserServicer'; 
import Notifications from './Notitfications'; 
import { useLazyMeQuery } from '../../../app/services/auth/auth'; 

const RightContent: React.FC = () => {
    const dispatch = useDispatch(); 
    const [userData, setUserData] = useState<User | null>(null); 
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const isMobile = window.innerWidth <= 768;

    const { data: notifications = [] } = useGetNotificationsQuery(1); 
    const [fetchUser, { data: userQueryData, isLoading, error }] = useLazyMeQuery(); 

    useEffect(() => {
        fetchUser(); 
    }, [fetchUser]);

    useEffect(() => {
        if (userQueryData) {
            setUserData(userQueryData); 
        }
    }, [userQueryData]);

    useEffect(() => {
        const unreadCount = notifications.filter((notification: { read: boolean }) => !notification.read).length;
        setHasUnreadNotifications(unreadCount > 0);
    }, [notifications]);

    const handleLogout = () => {
        dispatch(logout()); 
    };

    if (isLoading) return <div>Загрузка...</div>;

    return ( 
        <>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex">
                {
                     !isLoading && userData && userData.nextBonus && (
                        <ClaimBonus bonusDate={userData.nextBonus} userData={userData} />
                    )
                }
            </div>

            {!isLoading && userData && (
                <div className="flex items-center gap-2 text-green-400 font-normal text-lg hover:text-green-300 transition-all">
                    <BiWallet className="text-2xl hidden md:block" />
                    <div className="max-w-[80px] md:max-w-[140px] overflow-hidden text-sm md:text-lg truncate">
                        <Monetary value={Math.floor(userData.walletBalance)} />
                    </div>
                </div>
            )}

            <div className="relative cursor-pointer" onClick={() => {
                console.log("Текущие уведомления:", notifications);
                setOpenNotifications(!setOpenNotifications);
            }}>
                {
                    notifications ? (
                        <FaRegBellSlash style={{ fontSize: "20px" }} />
                    ) : (
                        <FaRegBell style={{ width: "20px" }} />
                    )
                }
                {
                    hasUnreadNotifications && !setOpenNotifications && (
                        <div className="absolute -top-1 -right-[2px] w-3 h-3 bg-red-500 rounded-full" />
                    )
                }
               <Notifications openNotifications={openNotifications} setOpenNotifications={setOpenNotifications} />
            </div>
            {userData && (
                <div className="flex items-center gap-2">
                    <Avatar 
                        image={userData.profilePicture} 
                        loading={isLoading} 
                        id={userData.id} 
                        size={isMobile ? "small" : "medium"} 
                        level={userData.level} 
                        showLevel={true} 
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{userData.username}</span>
                        <span className="text-xs text-gray-400">XP: {userData.xp}</span>
                    </div>
                </div>
            )}
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