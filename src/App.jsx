import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import './App.css'
import Button from './components/Button';
import Card from './components/Card';
import Users from './components/Users';
import Home from './pages/Home'
import About from './pages/About'
import AboutDetails from './pages/AboutDetails'

import Register from './pages/Register';
import { ProtectedRoutes, PublicRoutes } from './ProtectedRoutes';
//import HomePage from './pages/HomePage';
//import Login from './pages/Login';

const Login = lazy(() => import('./pages/Login')); 
const HomePage = lazy(() => import('./pages/HomePage'));

function PageLoader() {
  return (
    <div style={{
      display: "flex", justifyContent: "center",
      alignItems: "center", minHeight: "100vh",
      backgroundColor: "#F0F7F1",
    }}>
      <p style={{ color: "#1A5C2A", fontSize: "18px", fontWeight: "bold" }}>
        Loading...
      </p>
    </div>
  );
}


function App() {

  const cardItems = [{
    id: 1,
    title: 'Nabihag mo part 2',
    description: 'This is a movie called nabihag mo part 2'
  }, {
    id: 2,
    title: 'The Notebook',
    description: 'This is a movie called notebook'
  }, {
    id: 3,
    title: 'BSCS 3A',
    description: 'This is a movie called BSCS 3A'
  },];


  return (
    <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
          <Route path="/students" element={<HomePage />} />
          <Route path="/about" element={<About cardItems={cardItems} />} />
          <Route path="/about/:id" element={<AboutDetails cardItems={cardItems} />} />
        </Route>


        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
