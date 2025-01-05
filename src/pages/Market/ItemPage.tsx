import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetItemListingsQuery, useRemoveListingMutation } from "../../app/services/market/MarketServicer";
import Item from "./Item";
import Pagination from "../../components/Pagination";
import Skeleton from "react-loading-skeleton";
import { IMarketItem } from "../../app/types";
import SellItemModal from "./SellItemModal";
import ConfirmPurchaseModal from "./CoinfirmPurchaseModal";

interface ItemData {
  totalPages: number;
  currentPage: number;
  items: IMarketItem[];
}

const defaultItem: IMarketItem = {
  id: 0,
  sellerId: {
    id: 0,
    username: "",
  },
  item: {
    id: 0,
    name: "",
    image: "",
    uniqueId: "",
  },
  price: 0,
  itemName: "",
  itemImage: "",
  uniqueId: "",
};

const ItemPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [items, setItems] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loadingRemoval, setLoadingRemoval] = useState<boolean>(false);
  const [openBuyModal, setOpenBuyModal] = useState<boolean>(false);
  const [openSellModal, setOpenSellModal] = useState<boolean>(false);
  const [removeListing] = useRemoveListingMutation();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IMarketItem>(defaultItem);

  const { data: itemsData, isLoading, isFetching } = useGetItemListingsQuery({
   itemId: Number(itemId),
   page,
 });
 
 useEffect(() => {
   if (itemsData) {
     setItems({
       totalPages: 1, // или любое другое значение
       currentPage: 1, // или любое другое значение
       items: itemsData,
     });
   }
 }, [itemsData]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(isLoading || isFetching);
  }, [isLoading, isFetching]);

  const buyItem = (item: IMarketItem) => {
    setSelectedItem(item);
    setOpenBuyModal(true);
  };

  const removeItem = async (item: IMarketItem) => {
   setLoadingRemoval(true);
   try {
     await removeListing(item.id);
     setRefresh(true);
   } catch (err) {
     console.log(err);
   } finally {
     setLoadingRemoval(false);
   }
 };

  return (
    <div className="flex flex-col w-screen items-center justify-center">
      <SellItemModal
        isOpen={openSellModal}
        onClose={() => setOpenSellModal(false)}
        setRefresh={setRefresh}
      />
      <ConfirmPurchaseModal
        isOpen={openBuyModal}
        onClose={() => setOpenBuyModal(false)}
        item={selectedItem}
        setRefresh={setRefresh}
      />
      <h1 className="text-3xl font-bold mb-6">Item Listings</h1>
      {items?.totalPages && items?.totalPages > 1 && (
        <Pagination totalPages={items.totalPages} currentPage={page} setPage={setPage} />
      )}
      {loading ? (
        <div className="flex flex-wrap items-center gap-4 justify-center px-8 ">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-[226px] h-[334px]  ">
                <Skeleton height={334} width={226} />
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4 justify-center px-8 max-w-[1600px]">
          {items && items.items && items.items.length > 0 ? (
            items.items.map((item) => (
              <Item
                key={item.id}
                item={item}
                click={() => buyItem(item)}
                remove={() => removeItem(item)}
                loadingRemoval={loadingRemoval}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-2xl font-bold text-center">
                There are no listings for this item.
              </h1>
            </div>
          )}
        </div>
      )}
      {items?.totalPages && items?.totalPages > 1 && (
        <Pagination totalPages={items.totalPages} currentPage={page} setPage={setPage} />
      )}
    </div>
  );
};

export default ItemPage;