import React, { useEffect, useRef, useState } from "react";
import { useSellItemMutation } from "../../app/services/market/MarketServicer";
import { useGetInventoryQuery } from "../../app/services/users/UserServicer";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store"; // Adjust the import based on your store setup

import Item from "../../components/Item";
import MainButton from "../../components/MainButton";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import Pagination from "../../components/Pagination";
import Filters from "./Filters";
import { FiFilter } from 'react-icons/fi';
import Modal from "../../components/Modal";
import { userApi } from '../../app/services/users/UserServicer'; // Импортируем userApi

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setRefresh?: (value: boolean) => void;
}

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  rarity: string;
  uniqueId: string
}

interface Inventory {
  totalPages: number;
  currentPage: number;
  items: InventoryItem[];
}

const SellItemModal: React.FC<Props> = ({ isOpen, onClose, setRefresh }) => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [price, setPrice] = useState<number | undefined>();
  const [inventory, setInventory] = useState<Inventory>();
  const [invItems, setInvItems] = useState<InventoryItem[]>([]);
  const [loadingInventory, setLoadingInventory] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    name: '',
    rarity: '',
    sortBy: '',
    order: 'asc'
  });
  const delayDebounceFn = useRef<NodeJS.Timeout | null>(null);

  const user = useSelector((state: RootState) => state.user.user); // Access the user object directly

  const [sellItem] = useSellItemMutation();
  if (!user) {
    return null; // or return some fallback UI
  }

  const { data: inventoryData, isLoading, isFetching } = useGetInventoryQuery({ id: user.id, page, filters });

  const CloseModal = () => {
    if (user) {
      setSelectedItem(null);
      setPrice(0);
      setInvItems([]);
      setPage(1);
      onClose();
    }
  };

  const handleSubmit = async () => {
    setLoadingButton(true);

    if (price && (price < 0 || price > 1000000)) {
      setLoadingButton(false);
      return toast.error("Price must be between 0 and 1.000.000", {});
    }

    try {
      await sellItem({ item: selectedItem.uniqueId, price: price || 0 });
      setRefresh && setRefresh(true);
      toast.success("Item listed for sale!", {});

      // Обновляем данные пользователя после успешной продажи
      userApi.endpoints.getMe.initiate(); // Запрос для получения актуальных данных о пользователе

      CloseModal();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setLoadingButton(false);
  };

  useEffect(() => {
    if (inventoryData) {
      setInventory(inventoryData);
      setLoadingInventory(false);
    }
  }, [inventoryData]);

  useEffect(() => {
    if (isOpen) {
      setInvItems([]);
      setLoadingInventory(true);
    }
  }, [isOpen, page]);



  if (!isOpen) {
    return null;
  }

  return (
    <Modal open={isOpen} setOpen={onClose}>
      <div>
        <div className="flex">
          <h2 className="text-lg font-semibold mb-2">Sell an Item</h2>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 w-1/2">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Set Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              min={0}
              max={100000}
              placeholder="Price in KP"
              value={price}
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                  event.preventDefault();
                }
              }}
              onChange={
                (e) => setPrice(parseInt(e.target.value) || 0)
              }
            />
          </div>
          {selectedItem && (
            <div className="flex  items-center">
              <span className="text-white text-lg font-semibold mr-2">
                {selectedItem.name}
                </span>
              <img src={selectedItem.image} alt="" className=" h-20" />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full items-start gap-4 mt-2 ">
          <div onClick={() => setOpenFilters(!openFilters)} className="border p-2 rounded-md cursor-pointer">
            <FiFilter className="text-2xl " />
          </div>
          {openFilters && <Filters filters={filters} setFilters={setFilters} />}
        </div>
        <div className="flex flex-col justify-center max-h-[190px]  gap-4 ">
          <div className="flex flex-wrap justify-center gap-4 overflow-auto overflow-x-hidden mt-4 ">
            {loadingInventory ? (
              [1, 2, 3, 4].map((item) => (
                <div className="w-1/4 p-2" key={item}>
                  <Skeleton height={120} />
                </div>
              ))
            ) : (
              invItems.map((item, index) => (
                <div
                  className="w-1/4 p-2 cursor-pointer"
                  key={item.id + index}
                  onClick={() => setSelectedItem(item)}
                >
                  <Item item={item} size="small" />
                </div>
              ))
            )}
            {inventory && (
              <div className="w-full flex justify-center">
                <Pagination totalPages={inventory.totalPages} currentPage={inventory.currentPage} setPage={setPage} />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-4 ">
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={CloseModal}
          >
            Close
          </button>
          <div className="w-44">
            <MainButton
              text="Sell Item"
              onClick={handleSubmit}
              loading={loadingButton}
              disabled={!selectedItem || !price || loadingButton}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SellItemModal;
