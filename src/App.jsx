import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Импортируйте Router
import './App.css';

const AppRoutes = lazy(() => import("./Routes"));

function App() {
  return (
    <Router> {/* Оберните ваши маршруты в Router */}
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
