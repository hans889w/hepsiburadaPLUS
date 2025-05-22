import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, Product } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'
import { toggleFavorite } from '../features/favorites/favoritesSlice'
import { AppDispatch, RootState } from './store'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const { items, loading, error } = useSelector((state: RootState) => state.products)
  const favorites = useSelector((state: RootState) => state.favorites.items)

  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const product = items.find((item: Product) => item.id === parseInt(id || '0'))

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0])
    } else if (product) {
      setSelectedImage(product.thumbnail)
    }
  }, [product])

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
          color: '#ffff',
          fontWeight: 'normal',
          padding: '10px 15px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        },
      }
    )
  }

  const handleToggleFavorite = (product: Product) => {
    const isCurrentlyFavorite = favorites.some(item => item.id === product.id)
    dispatch(toggleFavorite(product))
    if (isCurrentlyFavorite) {
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
            background: '#ffecd1',
            color: '#fff',
            fontWeight: 'normal',
            padding: '10px 15px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          },
        }
      )
    } else {
      toast.success(
        <div className="flex items-center">
          <span className="text-gray-700 font-medium">Favorilere eklendi</span>
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
  }

  const getDiscount = (price: number) => {
    const discountRate = Math.floor(Math.random() * 31) + 20
    const originalPrice = price * (1 + discountRate / 100)
    return { discountRate, originalPrice }
  }

  const isTopDeal = () => Math.random() > 0.7
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

  const mockReviews = [
    {
      user: 'Ahmet Y.',
      rating: 4.5,
      comment: 'Ürün harika, tam beklediğim gibi! Kargolama da çok hızlıydı.',
      date: '2025-05-10',
    },
    {
      user: 'Elif K.',
      rating: 3.8,
      comment: 'Fiyatına göre iyi, ama kutusu biraz hasarlı geldi.',
      date: '2025-05-08',
    },
    {
      user: 'Murat S.',
      rating: 5.0,
      comment: 'Kesinlikle mükemmel! Herkese tavsiye ederim.',
      date: '2025-05-07',
    },
  ]

  const getSimilarProducts = () => {
    if (!product) return []
    const similar = items.filter((item: Product) => item.category === product.category && item.id !== product.id)
    return similar.sort(() => 0.5 - Math.random()).slice(0, 4)
  }

  if (loading) return (
    <div className="flex justify-center mt-10">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (error) return <div className="text-red-500 text-center mt-10">Hata: {error}</div>
  if (!product) return <div className="text-gray-500 text-center mt-10">Ürün bulunamadı</div>

  const isFavorite = favorites.some(item => item.id === product.id)
  const { discountRate, originalPrice } = getDiscount(product.price)
  const discountedPrice = product.price
  const topDeal = isTopDeal()
  const topSellerRank = getTopSellerRank()
  const similarProducts = getSimilarProducts()

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <Link to="/" className="relative text-orange-500 hover:underline mb-4 inline-block z-50">
          Geri Dön
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative">
              {topDeal && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1 z-20">
                  En Avantajlı
                </div>
              )}
              <img
                alt={product.title}
                src={selectedImage}
                className="w-full h-96 object-cover rounded-lg border"
              />
              <div
                className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer shadow-md hover:bg-red-100 transition-colors"
                onClick={() => handleToggleFavorite(product)}
              >
                {isFavorite ? (
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images && product.images.length > 0 ? (
                product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title}-${index}`}
                    className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${
                      selectedImage === image ? 'border-orange-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))
              ) : (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md border border-gray-200 cursor-pointer"
                  onClick={() => setSelectedImage(product.thumbnail)}
                />
              )}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <p className="text-sm text-gray-500 mb-3">{product.category}</p>
            {topSellerRank <= 10 && (
              <p className="text-sm text-blue-500 mb-2">En çok satan #{topSellerRank}</p>
            )}
            <div className="flex items-center mb-3">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500 ml-2">{product.rating} ({mockReviews.length} değerlendirme)</span>
            </div>
            <p className="text-2xl font-bold text-black mb-1">
              {discountedPrice.toFixed(2)} TL{' '}
              <span className="text-sm text-green-600">%{discountRate} indirim</span>
            </p>
            <p className="text-lg text-gray-400 line-through mb-2">
              {originalPrice.toFixed(2)} TL
            </p>
            <p className="text-sm text-green-600 mb-4">900 TL üzeri 300 TL indirim</p>
            <button
              className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
              onClick={() => handleAddToCart(product)}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ürün Açıklaması</h2>
          <p className="text-gray-600 mb-6">{product.description || 'Bu ürün hakkında detaylı bilgi bulunmamaktadır.'}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Müşteri Yorumları</h2>
          {mockReviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">{review.user}</span>
                  <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                </div>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500 ml-2">{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Benzer Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((similarProduct) => (
              <Link to={`/product/${similarProduct.id}`} key={similarProduct.id}>
                <div className="border rounded-md p-2 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={similarProduct.thumbnail}
                    alt={similarProduct.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="text-sm font-semibold mt-2">{similarProduct.title}</h3>
                  <p className="text-sm text-gray-600">{similarProduct.price} TL</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail