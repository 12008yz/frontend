import React, { useState, useEffect } from "react";
import MarketItem from "./MarketItem";
import MainButton from "../../components/MainButton";
import Title from "../../components/Title";
import Skeleton from "react-loading-skeleton";
import { useUserContext } from "../../UserContext";
import Pagination from "../../components/Pagination";
import Filters from "./Filters";
import { FiFilter } from 'react-icons/fi';
import SellItemModal from './SellItemModal'
import { useGetItemsQuery } from "../../app/services/market/MarketServicer";
import { IMarketItem } from "../../app/types";

interface Props {

  image: string;
  name: string;
  rarity: number;
  id: string;
  uniqueId: string
  cheapestPrice: number;
  totalListings: number;

}

interface ItemData {
  totalPages: number;
  currentPage: number;
  items: Props[];
}

const Marketplace: React.FC<ItemData> = () => {
  const [items, setItems] = useState<IMarketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openSellModal, setOpenSellModal] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    name: '',
    rarity: '',
    sortBy: '',
    order: 'asc'
  });
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const { isLogged } = useUserContext();

  const { data: itemsData, isLoading, isFetching } = useGetItemsQuery({ page, filters });

  useEffect(() => {
    if (itemsData) {
      setItems(itemsData);
    }
  }, [itemsData]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    setRefresh(true);
    scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    setLoading(isLoading || isFetching);
  }, [isLoading, isFetching]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <SellItemModal
        isOpen={openSellModal}
        onClose={() => setOpenSellModal(false)}
        setRefresh={setRefresh}
      />
      <div className="flex items-center justify-center w-full max-w-[1600px] relative ">
        <Title title="Marketplace" />

        <div className="absolute md:right-24 -top-6 md:top-0">
          {isLogged && (
            <div className="w-52">
              <MainButton
                onClick={() => setOpenSellModal(true)}
                text="Sell an item"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center w-full justify-end gap-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div onClick={() => setOpenFilters(!openFilters)} className="border p-2 rounded-md cursor-pointer">
              <FiFilter className="text-2xl " />
            </div>
            {openFilters && (
              <Filters filters={filters} setFilters={setFilters} />
            )}
          </div>
        </div>
      </div>
      {
        items.length > 0 && (
          <Pagination totalPages={Math.ceil(items.length / 10)} currentPage={page} setPage={setPage} />
        )
      }
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
        <div className="flex flex-wrap items-center gap-4 justify-center px-8  max-w-[1600px]">
          {items.map((item) => (
            <MarketItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
      {
        items.length > 0 && (
          <Pagination totalPages={Math.ceil(items.length / 10)} currentPage={page} setPage={setPage} />
        )
      }
    </div>
  );
};

export default Marketplace;