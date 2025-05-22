import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import LoadingPage from './components/LoadingPage';

const Banner = lazy(() => import('./components/Banner'));
const Navi = lazy(() => import('./components/Navi'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Categories = lazy(() => import('./components/Categories'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./components/Home'));
const Fregrances = lazy(() => import('./components/Fregrances'));
const Sepetim = lazy(() => import('./components/Sepetim'));
const ProductList = lazy(() => import('./components/ProductList'));
const FilteredProducts = lazy(() => import('./components/FilteredProducts'));
const Auth = lazy(() => import('./components/Auth'));
const Favorites = lazy(() => import('./components/Favorites'));
const BackToTopButton = lazy(() => import('./components/BackToTopButton'));
const Odeme = lazy(() => import('./components/Odeme'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="light"
        style={{ zIndex: 9999 }}
      />
      <Suspense>
        <BackToTopButton />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Navi />
                <Home />
                <Fregrances />
                <ProductList />
                <ProductDetail />
                <Footer />
              </>
            }
          />
          <Route
            path="/sepetim"
            element={
              <>
                <Banner />
                <Navi />
                <Sepetim />
              </>
            }
          />
          <Route
            path="/arama/:query"
            element={
              <>
                <Banner />
                <Navi />
                <FilteredProducts />
              </>
            }
          />
          <Route path="/odeme" element={<Odeme />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/girişyap" element={<Auth />} />
          <Route path="/üyeol" element={<Auth />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
