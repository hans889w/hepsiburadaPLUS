import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, Product } from '../features/products/productsSlice'
import { fetchCategories } from '../features/categories/categoriesSlice'
import { addToCart } from '../features/cart/cartSlice'
import { toggleFavorite } from '../features/favorites/favoritesSlice'
import { AppDispatch, RootState } from './store'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Footer from './Footer'

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: products, loading: productLoading, error: productError } = useSelector((state: RootState) => state.products)
  const { items: categoryItems, loading: categoryLoading, error: categoryError } = useSelector((state: RootState) => state.categories)
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const flyoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
        setIsFlyoutOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  const handleCategoryMouseEnter = (category: string) => setOpenCategory(category)
  const handleCategoryMouseLeave = () => setOpenCategory(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.value.trim()) {
      setIsFlyoutOpen(true)
    } else {
      setIsFlyoutOpen(false)
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/arama/${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setIsFlyoutOpen(false)
    }
  }

  const handleFavorite = (product: Product) => {
    if (!isAuthenticated) {
      console.log('isAuthenticated:', isAuthenticated)
      navigate('/girişyap')
      return
    }

    const isFavorited = favorites.some((fav) => fav.id === product.id)
    dispatch(toggleFavorite(product))
    if (isFavorited) {
      toast.error('Favorilerden kaldırıldı', {
        position: 'top-right',
        autoClose: 3000,
      })
    } else {
      toast.success('Favorilere eklendi', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

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
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.375 2.453a1 1 0 00-.364 1.118l1.287 3.975c.3 .921-.755 1.688-1.538 1.118l-3.375-2.453a1 1 0 00-.588-.34V3.616a1 1 0 00-.588-.34z" />
          </svg>
        )}
        {Array(emptyStars).fill(0).map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.375 2.453a1 1 0 00-.364 1.118l1.287 3.975c.3 .921-.755 1.688-1.538 1.118l-3.375-2.453a1 1 0 00-1.175 0l-3.375 2.453c-.783.57-1.838-.197-1.538-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.236 9.402c-.783-.57-.381-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.975z" />
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
          color: "orange",
          fontWeight: 'normal',
          padding: '10px 15px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        },
      }
    )
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products

  const searchSuggestions = searchTerm
    ? products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  if (productLoading || categoryLoading) return <div className="flex justify-center mt-10"><div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>
  if (productError) return <div className="text-red-500 text-center mt-10">Ürünlerde Hata: {productError}</div>
  if (categoryError) return <div className="text-red-500 text-center mt-10">Kategorilerde Hata: {categoryError}</div>
  if (!products || !categoryItems) return <div className="text-center mt-10">Veri yüklenemedi, lütfen tekrar deneyin.</div>

  return (
    <div>
      <div className="w-[117%] ml-[-150px]">
        <ul className="flex flex-row justify-end gap-6 pt-3 text-xs font-bold mr-[100px]">
          <li><Link to="/Siparişlerim" className="no-underline text-xs font-bold text-gray-500">Siparişlerim</Link></li>
          <li><Link to="/Süper Fiyat,Süper Teklif" className="no-underline text-xs font-bold text-gray-500">Süper Fiyat,Süper Teklif</Link></li>
          <li><Link to="/Yurt Dışından" className="no-underline text-xs font-bold text-gray-500">Yurt Dışından</Link></li>
          <li><Link to="/Kampanyalar" className="no-underline text-xs font-bold text-gray-500">Kampanyalar</Link></li>
          <li><Link to="/Girişimci Kadınlar" className="text-red-500 no-underline text-xs font-bold ">Girişimci Kadınlar</Link></li>
          <li><Link to="/Müşteri Hizmetleri" className="no-underline text-xs font-bold text-gray-500">Müşteri Hizmetleri</Link></li>
          <li><Link to="/Hepsiburada Premium" className="text-orange-500 no-underline text-xs font-bold">Hepsiburada Premium</Link></li>
          <li><Link to="/Hepsiburada'da Satıcı Ol" className="no-underline text-xs font-bold text-gray-500">Hepsiburada'da Satıcı Ol</Link></li>
        </ul>
      </div>

      <nav className="flex items-center justify-between p-6 shadow-md w-[120%] ml-[-103px]">
        <div className="flex items-center space-x-4">
          <Link to="/"><h1 className="text-[45px] ml-[90px] bottom-3 font-bold text-orange-500 font-sans relative">hepsiburada</h1>
          <img src="/src/assets/plus2.png" width={50} height={50} className='absolute top-[55px] left-[254px]'  />
          </Link>

          <Link to="/premium" className="absolute top-[110px] left-[120px] text-[16px]
           text-orange-500 no-underline font-bold
            hover:text-red-500 hover:underline cursor-pointer">
            Premium’u
          </Link>
          <span className="absolute top-[110px] left-[210px] font-medium">keşfet</span>
          <div className="flex-grow mx-10 relative left-5">
            <input
              type="text"
              placeholder="Ürün, kategori veya marka ara."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setIsFlyoutOpen(true)}
              className="w-96 p-2.5 pl-12 rounded-3xl text-black
               bg-gray-200 placeholder:text-gray-400
               placeholder:font-light focus:outline-none 
               focus:border-orange-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
              />
            </svg>
            {isFlyoutOpen && (
              <div
                ref={flyoutRef}
                className="absolute top-full w-96 bg-white border rounded-md shadow-lg z-20 max-h-64 overflow-y-auto"
              >
                <ul className="py-1 text-gray-700 text-sm">
                  {searchSuggestions.length > 0 ? (
                    searchSuggestions.slice(0, 5).map((product: Product) => (
                      <li key={product.id}>
                        <Link
                          to={`/product/${product.id}`}
                          className="px-4 py-2 hover:bg-gray-100 no-underline text-gray-700 flex items-center"
                          onClick={() => {
                            setSearchTerm('')
                            setIsFlyoutOpen(false)
                          }}
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-8 h-8 object-cover rounded mr-2"
                          />
                          <span className="line-clamp-1">{product.title}</span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">
                      Ürün bulunamadı
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="flex items-center rounded-md px-2 py-1 space-x-1 cursor-pointer absolute left-[260px] top-[-50px]">
              <svg
                className="w-10 h-10 absolute right-[70px] text-red-600 top-7 z-10"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="relative left-[-10px] z-10">
                <span className="absolute bottom-5">Konum</span>
                <span className="text-orange-500 text-sm relative top-10">Konum Seç</span>
                <svg
                  className="w-3 h-3 relative left-10 top-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 30 30"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setSelectedCategory(null)}
          className="mr-56 w-36 h-11 px-4 py-2 rounded-lg bg-gradient-to-r
           from-indigo-500 via-purple-500 to-pink-500 text-white
            font-semibold shadow-lg flex items-center justify-between
             hover:from-pink-500 hover:to-yellow-400 transition duration-700"
        >
          <span>Tüm Kategoriler</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        <div className="flex items-center space-x-4 mr-20">
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-2 text-gray-700
                 px-4 py-3 border border-gray-300 rounded-md
                  shadow-sm transition duration-200
                   relative right-24 w-44 ${isOpen ? '' : 'bg-white text-gray-700'
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A8.966 8.966 0 0112 15c2.28 0 4.355.847 5.879 2.242M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-gray-600'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="font-bold">{isAuthenticated ? 'Giriş Yap' : 'Giriş Yap'}</span>
              <span className="font-light text-xs">{isAuthenticated ? 'veya Üye Ol' : 'veya Üye Ol'}</span>
            </button>

            {isOpen && (
              <div
                className="absolute right-[93px] w-[180px] bg-white border rounded-md shadow-lg z-20"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="py-1 text-gray-700 text-sm ">
                  {!isAuthenticated ? (
                    <>
                      <li>
                        <a href="/girişyap" className="block px-14 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                          Giriş Yap
                        </a>
                      </li>
                      <li>
                        <a href="/üyeol" className="block px-14 py-2 text-gray-600 no-underline hover:text-gray-200 border-b-2 font-bold">
                          Üye Ol
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                          Siparişlerim
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                          Soru ve Taleplerim
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                          Sana Özel Fırsatlar
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                          Hepsipay
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-extrabold">
                          Kullanıcı Bilgilerim
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 border-b-2 font-bold">
                          Değerlendirmelerim
                        </a>
                      </li>
                      <li>
                        <Link to="/favorites" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                          Beğendiklerim
                        </Link>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 border-b-2 font-bold">
                          Tüm Listelerim
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                          Kuponlarım
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={() => dispatch({ type: 'auth/logout' })}
                          className="block px-4 py-2 text-center text-gray-600 no-underline hover:text-gray-200 font-bold w-full"
                        >
                          Çıkış Yap
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          <Link to="/sepetim" className="flex items-center bg-gray-500 rounded-md relative right-20 w-40 h-20 left-[-90px]">
            <div className="flex items-center px-3 py-5 rounded-md transition-colors">
              <svg
                className="w-8 h-8 text-white mr-1"
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
              <span className="text-white font-medium text-xl">Sepetim</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="flex justify-start flex-row w-[120%] ml-[-103px]">
        <div className="w-[550px] h-[8px] bg-[#FF6000]"></div>
        <div className="w-[230px] h-[8px] bg-[#49C7ED]"></div>
        <div className="w-[230px] h-[8px] bg-[#7723DB]"></div>
        <div className="w-[230px] h-[8px] bg-[#57B900]"></div>
        <div className="w-[230px] h-[8px] bg-[#5D196A]"></div>
      </div>

      <div className="flex flex-row gap-3 border-r-2 w-[120%] ml-[-100px] bg-gray-100 px-36">
        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('elektronik')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="text-black py-6 px-5 cursor-pointer border-r-2">Elektronik</div>
          {openCategory === 'elektronik' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Telefon</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bilgisayar</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Televizyon</a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('moda')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-6 px-6 cursor-pointer border-r-2">Moda</div>
          {openCategory === 'moda' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Giyim</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Ayakkabı</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Aksesuar</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('evyasam')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-4 px-2 cursor-pointer border-r-2">Ev,Yaşam, Kırtasiye,Ofis</div>
          {openCategory === 'evyasam' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mobilya</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dekorasyon</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Kırtasiye</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('otobahce')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-4 px-2 cursor-pointer border-r-2">Oto,Bahçe,Yapı Market</div>
          {openCategory === 'otobahce' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Oto Aksesuar</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bahçe Malzemeleri</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Yapı Malzemeleri</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('annebebek')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-4 px-2 cursor-pointer border-r-2">Anne,Bebek, Oyuncak</div>
          {openCategory === 'annebebek' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bebek Giyim</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bebek Arabası</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Oyuncaklar</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('sporoutdoor')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-4 px-2 cursor-pointer border-r-2">Spor,Outdoor</div>
          {openCategory === 'sporoutdoor' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Spor Ayakkabı</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Kamp Malzemeleri</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Fitness Aletleri</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('kozmetik')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-4 px-2 cursor-pointer border-r-2">Kozmetik,Kişisel Bakım</div>
          {openCategory === 'kozmetik' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Makyaj</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cilt Bakımı</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Parfüm</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('supermarket')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-4 px-2 cursor-pointer border-r-2">Süpermarket,<br />Pet Shop</div>
          {openCategory === 'supermarket' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Gıda Ürünleri</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Temizlik Ürünleri</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Pet Malzemeleri</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => handleCategoryMouseEnter('kitapmuzik')}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="py-4 px-2 cursor-pointer">Kitap,Müzik, Film,Hobi</div>
          {openCategory === 'kitapmuzik' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Romanlar</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Müzik Aletleri</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Hobi Malzemeleri</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      <div className="flex relative mt-[-270px] top-[320px]">
        <div className="w-64 flex-shrink-0">
          <div className="w-64 p-4 border-1 rounded-lg h-[1050px] ml-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className="block w-full text-left font-medium p-2 rounded-md bg-orange-500 text-white mb-4 transition-colors hover:bg-orange-600"
            >
              Tüm Kategoriler
            </button>
            <ul className="font-light">
              {categoryItems.map((category: any) => {
                const categoryName = typeof category === 'string' ? category : (category.name || category.toString())
                return (
                  <li key={categoryName}>
                    <button
                      onClick={() => setSelectedCategory(categoryName)}
                      className={`block w-full text-left p-2 rounded-md text-gray-600 transition-colors ${selectedCategory === categoryName ? 'bg-orange-500 text-white' : 'hover:bg-orange-500 hover:text-white'
                        }`}
                    >
                      {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="flex-1 p-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-700 ml-4">
            {selectedCategory
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Kategorisindeki Ürünler`
              : 'Tüm Ürünler'}
          </h3>
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 mt-10">
              Bu kritere uygun ürün bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-4">
              {filteredProducts.map((product: Product) => {
                const { discountRate, originalPrice } = getDiscount(product.price)
                const discountedPrice = product.price
                const topDeal = isTopDeal()
                const topSellerRank = getTopSellerRank()
                const isFavorited = favorites.some((fav) => fav.id === product.id)

                return (
                  <div key={product.id} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    {topDeal && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1 z-20">
                        En Avantajlı
                      </div>
                    )}
                    <div
                      className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer shadow-md hover:bg-red-100 transition-colors z-20"
                      onClick={() => handleFavorite(product)}
                    >
                      {isFavorited ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <img alt={product.title} src={product.thumbnail} className="h-48 w-full object-cover" />
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
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Categories