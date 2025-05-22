import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, Product } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'
import { toggleFavorite } from '../features/favorites/favoritesSlice'
import { AppDispatch, RootState } from './store'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Footer from './Footer'

const FilteredProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.products)
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const products = useSelector((state: RootState) => state.products.items)
  const { query } = useParams<{ query: string }>()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const filteredProducts = query
    ? products.filter((product) =>
        product.title.toLowerCase().includes(decodeURIComponent(query).toLowerCase())
      )
    : items

  const getDiscount = (price: number) => {
    const discountRate = Math.floor(Math.random() * 31) + 20
    const originalPrice = price * (1 + discountRate / 100)
    return { discountRate, originalPrice }
  }

  const isTopDeal = () => Math.random() > 0.8
  const getTopSellerRank = () => Math.floor(Math.random() * 10) + 1

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStar

    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.375 2.453a1 1 0 00-.364 1.118l1.287 3.975c.3.921-.755 1.688-1.538 1.118l-3.375-2.453a1 1 0 00-1.175 0l-3.375 2.453c-.783.57-1.838-.197-1.538-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.236 9.402c-.783-.57-.381-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.975z" />
          </svg>
        ))}
        {halfStar === 1 && (
          <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.375 2.453a1 1 0 00-.364 1.118l1.287 3.975c.3.921-.755 1.688-1.538 1.118l-3.375-2.453a1 1 0 00-.588-.34V3.616a1 1 0 00-.588-.34z" />
          </svg>
        )}
        {Array(emptyStars).fill(0).map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.375 2.453a1 1 0 00-.364 1.118l1.287 3.975c.3.921-.755 1.688-1.538 1.118l-3.375-2.453a1 1 0 00-1.175 0l-3.375 2.453c-.783.57-1.838-.197-1.538-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.236 9.402c-.783-.57-.381-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.975z" />
          </svg>
        ))}
      </div>
    )
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

  const handleToggleFavorite = (product: Product) => {
    const isFavorite = favorites.some(item => item.id === product.id)
    dispatch(toggleFavorite(product))
    if (!isFavorite) {
        toast.success(
          <div className="flex items-center">
            <span className="text-gray-700 font-sans">Favorilere eklendi</span>
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
      } else {
        toast.error(
          <div className="flex items-center">
            <span className="text-gray-700 font-sans">Favorilerden kaldırıldı</span>
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
              background: 'white',
              color: '#fff',
              fontWeight: 'normal',
              padding: '10px 15px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            },
          }
        )
      }
    }
 
  if (loading) return (
    <div className="flex justify-center mt-10">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (error) return <div className="text-red-500 text-center mt-10">Hata: {error}</div>

  return (
    <div className="relative p-16 h-[full] mt-[-270px] top-80">
      <div>
        <h3 className="absolute left-15 top-0 text-2xl font-bold mb-6 text-gray-600">
          "{query ? decodeURIComponent(query) : ''}" için Arama Sonuçları
        </h3>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            Aradığınız kritere uygun ürün bulunamadı.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product: Product) => {
              const isFavorite = favorites.some(item => item.id === product.id)
              const { discountRate, originalPrice } = getDiscount(product.price)
              const discountedPrice = product.price
              const topDeal = isTopDeal()
              const topSellerRank = getTopSellerRank()

              return (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    {topDeal && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1 z-20">
                        En Avantajlı
                      </div>
                    )}
                    <div className="relative">
                      <img
                        alt={product.title}
                        src={product.thumbnail}
                        className="h-48 w-full object-cover"
                      />
                      <div
                        className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer shadow-md hover:bg-red-100 transition-colors"
                        onClick={(e) => { e.preventDefault(); handleToggleFavorite(product) }}
                      >
                        {isFavorite ? (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-gray-500 font-semibold line-clamp-2">{product.title}</h3>
                      {topSellerRank <= 10 && (
                        <p className="text-xs text-blue-500 mt-1">En çok satan #{topSellerRank}</p>
                      )}
                      <div className="mt-1 flex items-center">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                      </div>
                      <p className="text-lg font-bold text-black mt-1">
                        {discountedPrice.toFixed(2)} TL{' '}
                        <span className="text-xs text-green-600">%{discountRate} indirim</span>
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        {originalPrice.toFixed(2)} TL
                      </p>
                      <p className="text-xs text-green-600">900 TL üzeri 300 TL indirim</p>
                      <button
                        className="mt-2 w-full bg-orange-500 text-white py-2 rounded-md transition duration-300 hover:bg-orange-600"
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default FilteredProducts