import React, { useState } from "react";
import MainButton from "../../components/MainButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store"; // Adjust the import based on your store setup
import { Link } from "react-router-dom";
import { IMarketItem } from "../../app/types";

interface Props {
  item: IMarketItem;
  click: () => void;
  remove: () => void;
  loadingRemoval: boolean;
}

const MarketItem: React.FC<Props> = ({ item, click, remove, loadingRemoval }) => {
  const user = useSelector((state: RootState) => state.user.user); // Access the user object directly
  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const isFromLoggedUser = user && user.id === item.sellerId.id; // Check if user exists before accessing id

  return (
    <div className="border border-[#161448] rounded-lg p-4 bg-gradient-to-tr from-[#1D1730] to-[#141333] transition-all duration-500 ease-in-out w-[226px] h-[334px]">
      <div className="flex items-center gap-2 relative">
        <span className="text-lg font-semibold text-white truncate">
          {item.itemName}
        </span>
        <Link to={`/profile/${item.sellerId.id}`}>
          <span className="text-xs text-white underline truncate">({item.sellerId.username})</span>
        </Link>
      </div>
      <img
        src={item.itemImage}
        alt={item.itemName}
        className={`mb-2 w-full h-48 object-cover rounded ${loading ? "hidden" : ""}`}
        onLoad={handleImageLoad}
      />

      <p className="text-blue-500 text-center py-1 text-ellipsis truncate">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "DOL",
          minimumFractionDigits: 0,
        })
          .format(item.price)
          .replace("DOL", "K₽")}
      </p>
      <MainButton text={isFromLoggedUser ? "Remove" : "Buy"} onClick={
        click && (isFromLoggedUser ? remove : click)
      } disabled={loadingRemoval} />
    </div>
  );
};

export default MarketItem;