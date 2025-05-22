import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../features/products/productsSlice'
import { toggleFavorite } from '../features/favorites/favoritesSlice'
import { RootState, AppDispatch } from './store'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToCart } from '../features/cart/cartSlice' // cartSlice'tan import

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: RootState) => state.favorites.items)

  const handleRemoveFavorite = (product: Product) => {
    dispatch(toggleFavorite(product))
    toast.error("Favorilerinizden kaldırıldı", {
      position: "top-right",
      autoClose: 3000,
      theme: "light"

    })
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success(
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <span className="text-gray-700 font-sans">Sepete eklendi</span>
        </div>
        <Link to="/sepetim" className="text-green-600 text-sm ml-4">
          Sepete git
        </Link>
      </div>,
      {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          background: '#d4edda',
          color: '#fff',
          fontWeight: 'normal',
          padding: '10px 15px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        },
      }
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-20 px-4">
        <p className="text-gray-700 text-4xl font-semibold mb-6">
          Henüz favori ürün yok
        </p>
        <Link
          to="/"
          className="inline-block
           bg-gradient-to-r from-orange-400 to-orange-600 text-white
            font-medium px-6 py-3 rounded-lg shadow-2xl hover:from-orange-500
             hover:to-orange-700 transition duration-300" >
          Alışverişe başla
        </Link>
      </div>

    )
  }

  return (
    <div className="p-16">
      <h3 className="text-2xl font-bold mb-6 text-gray-700">Beğendiklerim</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((product: Product) => {
          const { discountRate, originalPrice } = { discountRate: 0, originalPrice: product.price }
          const discountedPrice = product.price

          return (
            <div key={product.id} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <button
                onClick={() => handleRemoveFavorite(product)}
                className="absolute top-2 right-2 z-20"
              >
                <svg
                  className="w-6 h-6 text-red-500 fill-current"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img alt={product.title} src={product.thumbnail} className="h-48 w-full object-cover" />
              <div className="p-3">
                <h3 className="text-sm text-gray-500 font-semibold line-clamp-2">{product.title}</h3>
                <p className="text-lg font-bold text-black mt-1">
                  {discountedPrice.toFixed(2)} TL{' '}
                  <span className="text-xs text-green-600">%{discountRate} indirim</span>
                </p>
                <p className="text-sm text-gray-400 line-through">
                  {originalPrice.toFixed(2)} TL
                </p>
                <button
                  className="mt-2 w-full bg-orange-500 text-white py-2 rounded-md transition duration-300 hover:bg-orange-600"
                  onClick={() => handleAddToCart(product)} // butonu bağladık
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Favorites