import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { removeFromCart } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMemo } from 'react'

const Sepet: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id))
    toast.error('Sepetinizden kaldırıldı', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'light',
    })
  }

  const total = useMemo(
    () =>
      cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2),
    [cartItems]
  )

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-white px-4 text-center">
        <div className="mb-6">
          <svg
            className="w-24 h-24 text-orange-500 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-700 mb-4">Sepetiniz şu an boş</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Sepetini <span className='text-orange-600'>Hepsiburada PLUS</span>'ın fırsatlarla dolu dünyasından doldurmak için alışverişe başlayarabilirsin.
        </p>
        <Link
          to="/"
          className="inline-block
           bg-gradient-to-r from-orange-400 to-orange-600 text-white
            font-medium px-6 py-3 rounded-lg shadow-2xl hover:from-orange-500
             hover:to-orange-700 transition duration-300"
        >
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
        <svg
            className="w-24 h-24 text-orange-500 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800">Sepetim</h1>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 pb-4 last:border-b-0 hover:bg-gray-50 transition duration-200 rounded-lg p-3"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.price.toFixed(2)} TL</p>
                <p className="text-gray-600">Adet: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-medium flex items-center"
                aria-label="Ürünü sepetten kaldır"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Kaldır
              </button>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold text-gray-800">Toplam: {total} TL</h3>
            <Link
              to="/odeme"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Ödemeye Geç
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sepet
