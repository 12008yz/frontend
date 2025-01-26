import { useEffect, useState } from "react";
import UserFlow from "./userFlow";
import Navbar from "./Navbar/Navbar";
import { useUserContext } from "../../UserContext";
import { useGetCasesQuery } from "../../features/casesSlice";

const Header = ({}) => {
  const [openNotifications, setOpenNotifications] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const { isLogged } = useUserContext();
  const { data: recentCaseOpenings = [] } = useGetCasesQuery();


  return (
    <div className="flex flex-col p-4 justify-center ">
      <Navbar 
        openNotifications={openNotifications}
        setOpenNotifications={setOpenNotifications}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      {/* Остальная часть Header */}
    </div>
  );
};

export default Header;