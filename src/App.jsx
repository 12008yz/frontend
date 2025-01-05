import { BrowserRouter as Router } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider, useUserContext } from "./UserContext"; 

const Header = lazy(() => import("./components/header/index"));
const AppRoutes = lazy(() => import("./Routes"));

function App() {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [recentCaseOpenings, setRecentCaseOpenings] = useState([]);
  const [notification, setNotification] = useState();

  return (
    <UserProvider Provider> {/* Используйте UserProvider как компонент */}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header 
            onlineUsers={onlineUsers}
            recentCaseOpenings={recentCaseOpenings}
            notification={notification}
            setNotification={setNotification}
          />
          <AppRoutes />
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;