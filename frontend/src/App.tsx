import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import ContentListPage from './pages/ContentListPage';
import ContentPage from './pages/ContentPage';
import ErrorBoundary from './ErrorBoundary';
import RoutePaths from './constants/RoutePathNames';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to={RoutePaths.content} />} />
          <Route index path={RoutePaths.content} element={<ContentListPage />} errorElement={<ErrorBoundary />} />
          <Route path={RoutePaths.contentById} element={<ContentPage />} errorElement={<ErrorBoundary />} />
          <Route path={RoutePaths.home} element={<Home />} errorElement={<ErrorBoundary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
