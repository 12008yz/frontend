import { useEffect, useState, useContext } from "react";
import { useGetUserQuery, useGetInventoryQuery } from "../../app/services/users/UserServicer";
import { useUserContext } from "../../UserContext"; // Импортируем правильный хук
import UserInfo from "./UserInfo";
import FixedItem from "./FixedItem";
import Pagination from "../../components/Pagination";
import Filters from "../../components/InventoryFilters";
import { FiFilter } from 'react-icons/fi';
import Skeleton from "react-loading-skeleton";

interface Inventory {
  totalPages: number;
  currentPage: number;
  items: any[];
}

const Profile = () => {
  const { user } = useUserContext(); // Используем контекст пользователя
  const id = window.location.pathname.split("/")[2]; // Получаем id как строку
  const { data: userData, isLoading: loadingUser } = useGetUserQuery(id); // Передаем id как строку
  const { data: inventory, isLoading: loadingInventory } = useGetInventoryQuery({ id: Number(id), page: 1, filters: {} });
  const [invItems, setInvItems] = useState<any[]>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    name: '',
    rarity: '',
    sortBy: 'newer',
    order: 'asc',
  });
console.log('USERDATA из PROFILE:', userData)
  useEffect(() => {
    if (inventory) {
      setInvItems(inventory.items);
    }
  }, [inventory]);

  console.log("User ID: PROFILE", id);
console.log("User Data: PROFILE", userData);
  return (
    <div className="flex flex-col items-center w-screen">
      <div className="flex flex-col max-w-[1312px] py-4 w-full">
        {loadingUser ? (
          <Skeleton circle={true} height={144} width={144} />
        ) : (
          userData && (
            <UserInfo user={userData} isSameUser={user?.id === Number(id)} />
          )
        )}
      </div>

      <div className="flex flex-col items-center w-full bg-[#141225] min-h-screen">
        <div className="flex flex-col p-8 gap-2 items-center w-full max-w-[1312px]">
          <h2 className="text-2xl font-bold py-4 ">Inventory</h2>
          <div className="flex flex-col w-full items-end mr-[70px] gap-4 -mt-10">
            <div onClick={() => setOpenFilters(!openFilters)} className="border p-2 rounded-md cursor-pointer">
              <FiFilter className="text-2xl " />
            </div>
            {openFilters && <Filters filters={filters} setFilters={setFilters} onKeyPress={() => {}} />}
          </div>
          {inventory && inventory.totalPages > 1 && (
            <Pagination totalPages={inventory.totalPages} currentPage={inventory.currentPage} setPage={setPage} />
          )}
          <div className="flex flex-wrap gap-6 justify-center">
            {loadingInventory ? (
              <Skeleton width={176} height={216} />
            ) : invItems.length > 0 ? (
              invItems.map((item: any, i: number) => (
                <FixedItem key={item.id} fixedItem={item} isSameUser={user?.id === Number(id)} />
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
