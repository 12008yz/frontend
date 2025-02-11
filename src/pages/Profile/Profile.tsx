import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../app/services/users/UserServicer";
import UserInfo from "./UserInfo";
import FixedItem from "./FixedItem";
import Pagination from "../../components/Pagination";
import Skeleton from "react-loading-skeleton";
import Item from "../../components/Item";

interface Inventory {
  totalPages: number;
  currentPage: number;
  items: any[];
}

const Profile = () => {
  const id = window.location.pathname.split("/")[2]; // Получаем id как строку
  const { data: userData, isLoading: loadingUser } = useGetUserQuery(id); // Передаем id как строку
  
  const [invItems, setInvItems] = useState<any[]>([]);
  const [inventory, setInventory] = useState<Inventory>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (userData) {
      setInvItems(userData.inventory); // Устанавливаем инвентарь из userData
      setInventory({
        totalPages: 1,
        currentPage: 1,
        items: userData.inventory,
      });
    }
  }, [userData]);

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="flex flex-col max-w-[1312px] py-4 w-full">
        {loadingUser ? (
          <Skeleton circle={true} height={144} width={144} />
        ) : (
          userData && (
            <UserInfo user={userData} isSameUser={userData.id === Number(id)} />
          )
        )}
      </div>

      <div className="flex flex-col items-center w-full bg-[#141225] min-h-screen">
        <div className="flex flex-col p-8 gap-2 items-center w-full max-w-[1312px]">
          <h2 className="text-2xl font-bold py-4 ">Inventory</h2>
          <div className="flex flex-wrap gap-6 justify-center">
          {invItems.length > 0 ? (
    invItems.map((item: any, i: number) => (
        <Item key={item.id} item={item} />
    ))
) : (
    <h2>No items</h2>
)}
          </div>
          {inventory && inventory.totalPages > 1 && (
            <Pagination totalPages={inventory.totalPages} currentPage={inventory.currentPage} setPage={setPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
