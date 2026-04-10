import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useState } from 'react'
import './App.css'
import Button from './components/Button';
import Card from './components/Card';
import Users from './components/Users';
import Home from './pages/Home'
import About from './pages/About'
import AboutDetails from './pages/AboutDetails'
import Login from './pages/Login';
import Register from './pages/Register';
import { ProtectedRoutes, PublicRoutes } from './ProtectedRoutes';
// import HomePage from './pages/HomePage';

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
      <Routes>

        <Route element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
          {/* <Route path="/students" element={<HomePage />} /> */}
          <Route path="/about" element={<About cardItems={cardItems} />} />
          <Route path="/about/:id" element={<AboutDetails cardItems={cardItems} />} />
        </Route>


        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
