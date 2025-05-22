import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const Navi = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const navigate = useNavigate()
  const flyoutRef = useRef<HTMLDivElement>(null)

  const products = useSelector((state: RootState) => state.products.items)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const handleCategoryMouseEnter = (category: string) => {
    setOpenCategory(category)
  }

  const handleCategoryMouseLeave = () => {
    setOpenCategory(null)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/arama/${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setIsFlyoutOpen(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.trim()) {
      const filtered = products.filter((product: any) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredProducts(filtered)
      setIsFlyoutOpen(true)
    } else {
      setFilteredProducts([])
      setIsFlyoutOpen(false)
    }
  }

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`)
    setSearchTerm('')
    setIsFlyoutOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setIsFlyoutOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
     <div>
        <ul className="flex flex-row justify-end gap-6 pt-3 text-xs font-bold mr-[20px]">
          <li>
            <Link to="/Siparişlerim" className="no-underline text-xs font-bold text-gray-500">
              Siparişlerim
            </Link>
          </li>
          <li>
            <Link to="/Süper Fiyat,Süper Teklif" className="no-underline text-xs font-bold text-gray-500">
              Süper Fiyat,Süper Teklif
            </Link>
          </li>
          <li>
            <Link to="/Yurt Dışından" className="no-underline text-xs font-bold text-gray-500">
              Yurt Dışından
            </Link>
          </li>
          <li>
            <Link to="/Kampanyalar" className="no-underline text-xs font-bold text-gray-500">
              Kampanyalar
            </Link>
          </li>
          <li>
            <Link to="/Girişimci Kadınlar" className="text-red-500 no-underline text-xs font-bold">
              Girişimci Kadınlar
            </Link>
          </li>
          <li>
            <Link to="/Müşteri Hizmetleri" className="no-underline text-xs font-bold text-gray-500">
              Müşteri Hizmetleri
            </Link>
          </li>
          <li>
            <Link to="/Hepsiburada Premium" className="text-orange-500 no-underline text-xs font-bold ">
              Hepsiburada Premium
            </Link>
          </li>
          <li>
            <Link to="/Hepsiburada'da Satıcı Ol" className="no-underline text-xs font-bold text-gray-500">
              Hepsiburada'da Satıcı Ol
            </Link>
          </li>
        </ul>
      </div>

      <nav className="flex items-center justify-between p-6 shadow-md w-[120%] ml-[-103px]">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <h1 className="text-[45px] ml-[90px] bottom-5 font-bold text-orange-500 font-sans relative">hepsiburada</h1>
            <img src="/src/assets/plus2.png" width={50} height={50} className='absolute top-[140px] left-[254px]' />
          </Link>
          <Link
          to="/premium"
          className="absolute top-[200px] left-[120px] text-[16px]
          text-orange-500 no-underline font-bold
          hover:text-red-500 hover:underline cursor-pointer"
          >
            Premium’u
          </Link>
          <span className="absolute top-[200px] left-[210px] font-medium">keşfet</span>
          <div className="flex-grow mx-10 relative left-[25px]" ref={flyoutRef}>
            <input
              type="text"
              placeholder="Ürün, kategori veya marka ara"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setIsFlyoutOpen(true)}
              className="w-96 p-4 pl-12 rounded-md text-black border-orange-500 border-2 placeholder:text-gray-600 placeholder:font-light focus:outline-none focus:border-orange-500"
            />
            <svg
              className="w-5 h-5 absolute left-1 top-1/2 transform -translate-y-1/2 text-black"
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
              <div className="absolute left-0 w-96 bg-white border rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                <ul className="py-1 text-gray-700 text-sm">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded-md mr-3"
                        />
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-xs text-gray-500">{product.price} TL</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">Ürün bulunamadı</li>
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
                <span className="absolute bottom-5 ">Konum</span>
                <span className="text-orange-500 text-sm relative top-10">Konum Seç</span>
                <svg
                  className="w-3 h-3 relative left-[40px] top-4"
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
        <Link
          to="/categories"
          className="mr-56 w-36 h-11 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg flex items-center justify-between hover:from-pink-500 hover:to-yellow-400 transition duration-100"
        >
          <span>Tüm Kategoriler</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="flex items-center mr-[90px] gap-2 text-gray-700 px-4 py-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition duration-200 relative right-24 w-44">
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
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="font-bold">Giriş Yap</span>
              <span className="font-light text-xs"> veya Üye Ol</span>
            </button>

            {isOpen && (
              <div
                className="absolute right-[180px] w-[180px] bg-white border rounded-md shadow-lg z-20"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="py-1 text-gray-700 text-sm">
                  <li>
                    <a
                      href="/girişyap"
                      className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold"
                    >
                      Giriş Yap
                    </a>
                  </li>
                  <li>
                    <a
                      href="/üyeol"
                      className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 border-b-2 font-bold"
                    >
                      Üye Ol
                    </a>
                  </li>
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
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-extrabold"
                    >
                      Kullanıcı Bilgilerim
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 border-b-2 font-bold"
                    >
                      Değerlendirmelerim
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold"
                    >
                      Beğendiklerim
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 border-b-2 font-bold"
                    >
                      Tüm Listelerim
                    </a>
                  </li>
                  <li>
                    
                    <a href="#" className="block px-4 py-2 text-gray-600 no-underline hover:text-gray-200 font-bold">
                      Kuponlarım
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link to="/sepetim" className="flex items-center bg-gray-500 rounded-md left-[-180px] relative w-40 h-20">
            <div className="flex items-center px-3 py-5 rounded-md transition-colors">
              <svg
                className="w-8 h-8 text-white mr-1 ml-2"
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
              <span className="text-white font-medium text-xl w-5">Sepetim</span>
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

      <div className="flex flex-row gap-3 border-r-2 w-[110%] ml-[-100px] bg-gray-100 px-32">
        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('elektronik')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="text-black py-6 px-5 cursor-pointer border-r-2">Elektronik</div>
          {openCategory === 'elektronik' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Telefon
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Bilgisayar
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Televizyon
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('moda')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-6 px-6 cursor-pointer border-r-2">Moda</div>
          {openCategory === 'moda' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Giyim
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Ayakkabı
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Aksesuar
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('evyasam')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-4 px-2 cursor-pointer border-r-2">Ev,Yaşam, Kırtasiye,Ofis</div>
          {openCategory === 'evyasam' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Mobilya
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Dekorasyon
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Kırtasiye
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('otobahce')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-4 px-2 cursor-pointer border-r-2">Oto,Bahçe,Yapı Market</div>
          {openCategory === 'otobahce' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Oto Aksesuar
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Bahçe Malzemeleri
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Yapı Malzemeleri
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('annebebek')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-4 px-2 cursor-pointer border-r-2">Anne,Bebek, Oyuncak</div>
          {openCategory === 'annebebek' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Bebek Giyim
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Bebek Arabası
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Oyuncaklar
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('sporoutdoor')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-4 px-2 cursor-pointer border-r-2">Spor,Outdoor</div>
          {openCategory === 'sporoutdoor' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Spor Ayakkabı
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Kamp Malzemeleri
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Fitness Aletleri
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('kozmetik')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-4 px-2 cursor-pointer border-r-2">Kozmetik,Kişisel Bakım</div>
          {openCategory === 'kozmetik' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Makyaj
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Cilt Bakımı
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Parfüm
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('supermarket')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-4 px-2 cursor-pointer border-r-2">
            Süpermarket,
            <br />
            Pet Shop
          </div>
          {openCategory === 'supermarket' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Gıda Ürünleri
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Temizlik Ürünleri
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Pet Malzemeleri
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative" onMouseEnter={() => handleCategoryMouseEnter('kitapmuzik')} onMouseLeave={handleCategoryMouseLeave}>
          <div className="py-4 px-2 cursor-pointer">Kitap,Müzik, Film,Hobi</div>
          {openCategory === 'kitapmuzik' && (
            <div className="absolute left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
              <ul className="py-1 text-gray-700 text-sm">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Romanlar
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Müzik Aletleri
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Hobi Malzemeleri
                  </a>
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
    </>
  )
}

export default Navi