import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import type { Product } from '../features/products/productsSlice';
import { fetchProducts } from '../features/products/productsSlice';
import * as bootstrap from 'bootstrap'; 

interface CarouselEvent extends Event {
  to: number;
  from: number;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.products);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    console.log('Fetching products, current status:', status);
    dispatch(fetchProducts()).then((result) => {
      console.log('Fetch products result:', result);
    });
  }, [dispatch]);

  console.log('All products (items):', items);
  console.log('Products state error:', error);
  const allCategories = [...new Set(items.map((product: Product) => product.category))];
  console.log('All categories in items:', allCategories);

  

  const slides = [
    {
      title: 'YENİ ÜYELERE ÖZEL İLK SİPARİŞTE',
      discount: 'NET %50 İNDİRİM',
      brand: 'ORDINARY-US FOOD',
      productImage: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg',
      background: 'bg-emerald-900',
    },
    {
      title: 'EXPERIENCE A BIGGER, BETTER LIFESTYLE',
      discount: 'GET UP TO 50% OFF',
      productImage: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
      background: 'bg-gray-300',
    },
    {
      title: '1500 TL VE ÜZERİ ALIŞVERİŞE',
      discount: '750 TL İNDİRİM',
      campaignInfo: '21 Nisan saat 20:00 - 22 Nisan saat 10:00 arasında geçerlidir.',
      background: 'bg-red-500',
    },
  ];

  useEffect(() => {
    const carouselElement = document.getElementById('carouselExampleIndicators');
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
       interval: 5000, 
       ride: 'carousel',
      });

      const handleSlide = (event: CarouselEvent) => {
        setActiveSlide(event.to);
      };

      carouselElement.addEventListener('slid.bs.carousel', handleSlide as EventListener);

      return () => {
        carouselElement.removeEventListener('slid.bs.carousel', handleSlide as EventListener);
        // Carousel'i temizle (opsiyonel, ancak iyi bir pratik)
        carousel.dispose();
      };
    } else {
      console.warn('Carousel element not found');
    }
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Kartlı Section */}
      <section className="flex flex-wrap gap-4 p-6 max-w-8xl mx-auto justify-center">
        <div className="w-48 h-28 relative bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold absolute bottom-2 text-center">
            <img className="ml-5 mb-2" src="/src/assets/electronic.png" width={120} alt="Electronic" />
            EN SEVİLEN MARKA GÜNLERİ
          </span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold text-center">BÜYÜK İNDİRİM HAFTASI</span>
        </div>
        <div className="w-48 h-28 relative bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold text-center">
            <img className="absolute bottom-[60px] left-[140px]" src="/src/assets/sun.png" width={50} alt="Sun" />
            <img className="absolute top-[60px] right-[120px]" src="/src/assets/sunbag.png" width={100} alt="Sunbag" />
            YAZA ÖZEL FIRSATLAR
          </span>
        </div>
        <div className="w-48 h-28 relative bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold mt-4 text-center">
            <img className="absolute bottom-[50px] left-[5px]" src="/src/assets/headphones.png" width={40} alt="Headphones" />
            <img className="absolute bottom-[50px] left-[155px]" src="/src/assets/smartphone.png" width={30} alt="Smartphone" />
            <img className="absolute top-0 left-[65px]" src="/src/assets/gamepad.png" width={60} alt="Gamepad" />
            TEKNOLOJİ FESTİVALİ
          </span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold text-center">MODA GÜNLERİ</span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold mb-2 text-center">
            <img className="mt-2 ml-5" src="/src/assets/furniture.png" width={120} alt="Furniture" />
            EV DEKORASYON İNDİRİMİ
          </span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold text-center">SPOR MALZEMELERİ KAMPANYASI</span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold mb-8 text-center">
            <img className="relative top-2 left-6" src="/src/assets/gold.png" width={100} alt="Gold" />
            HEPSIPAY <span className="text-lg text-bold">%0</span>'DAN BAŞLAYAN FAİZ
          </span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold mb-8 text-center">
            <img className="relative top-2 left-20" src="/src/assets/discount.png" width={60} alt="Discount" />
            SÜPERMARKET FIRSATLARI
          </span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold text-center relative">
            <img className="ml-8 absolute top-[45px] right-[130px]" src="/src/assets/book3.png" width={60} alt="Book" />
            KİTAP VE HOBİ GÜNLERİ
          </span>
        </div>
        <div className="w-48 h-28 relative bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold text-center mb-4">
            <img className="absolute left-[150px] top-[60px]" src="/src/assets/toy.png" width={50} alt="Toy" />
            <img className="absolute right-[150px] top-[45px]" src="/src/assets/toy2.png" width={50} alt="Toy2" />
            OYUNCAK FESTİVALİ
          </span>
        </div>
        <div className="w-48 h-28 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg font-bold text-center">
            <img className="ml-32 absolute top-[570px] -rotate-45" src="/src/assets/leaves.png" width={80} alt="Leaves" />
            SONBAHAR İNDİRİMLERİ
          </span>
        </div>
      </section>

      {/* Carousel */}
      <section className="p-6 max-w-7xl mx-auto mr-7">
        <div
          id="carouselExampleIndicators"
          className="carousel slide md:w-[700px] mx-auto mr-[100px]"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators right-[420px]">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={i}
                className={i === activeSlide ? 'active' : ''}
                aria-current={i === activeSlide ? 'true' : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner rounded-xl overflow-hidden ml-[-280px]">
            {slides.map((slide, i) => (
              <div key={i} className={`carousel-item ${i === activeSlide ? 'active' : ''}`}>
                <div className={`relative w-[750px] h-[270px] ${slide.background}`}>
                  {i === 2 && (
                    <div
                      className="absolute inset-0 bg-opacity-10 bg-red mr-10"
                      style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/brick-wall.png")' }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center px-4 md:px-6">
                    {i === 1 ? (
                      <>
                        <div className="flex items-center w-1/2 abosolute right-[200px]">
                          <img
                            src={slide.productImage}
                            className="w-[0px] md:w-64 h-40 md:h-64 object-cover"
                            alt={`Slide ${i + 1}`}
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 items-end">
                          <p className="text-black text-sm md:text-lg">{slide.title}</p>
                          <div className="bg-white border-t-2 border-b-2 border-red-600 px-2 py-1 md:px-4 md:py-2">
                            <p className="text-red-600 text-2xl md:text-4xl font-bold absolute right-16">{slide.discount}</p>
                          </div>
                          <p className="text-black text-xs md:text-sm">{slide.campaignInfo}</p>
                        </div>
                      </>
                    ) : i === 2 ? (
                      <>
                        <div className="flex flex-col gap-2 items-center justify-center w-full">
                          <p className="text-white text-sm md:text-lg">{slide.title}</p>
                          <p className="text-white text-3xl md:text-5xl font-bold">{slide.discount}</p>
                          <p className="text-white text-xs md:text-sm">{slide.campaignInfo}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col gap-2 ">
                          <h2 className="text-white text-lg md:text-2xl font-bold">{slide.brand}</h2>
                          <p className="text-white text-sm md:text-lg">{slide.title}</p>
                          <p className="text-white text-3xl md:text-5xl font-bold">{slide.discount}</p>
                        </div>
                        <div className="relative w-1/2">
                          <img
                            src={slide.productImage}
                            className="w-96 md:w-64 h-40 md:h-64 object-cover absolute right-0"
                            alt={`Slide ${i + 1}`}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute top-1/2 right-[930px] transform -translate-y-1/2 bg-white rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center justify-center shadow-md z-10"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="text-lg md:text-xl font-extralight text-gray-700">←</span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="absolute top-1/2 right-[300px] transform -translate-y-1/2 bg-white rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center justify-center shadow-md z-10"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="text-lg md:text-xl font-extralight text-gray-700">→</span>
            <span className="sr-only">Next</span>
          </button>
          <div className="absolute bottom-4 right-80 bg-orange-500 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full z-10">
            {activeSlide + 1}/{slides.length}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;