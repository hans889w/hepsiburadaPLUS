import React from 'react'
import { useEffect, useState } from 'react'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}

const Fregrances = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/fragrances')
      .then((res) => res.json())
      .then((data) => setProducts(data.products.slice(0, 3)))
      .catch((err) => console.error('Veri alınamadı:', err))
  }, [])

  return (
    <div className="flex px-6 py-6 gap-6 ml-[760px] mt-[-325px]">
   <div className='relative bottom-[22px] font-bold text-3xl'> Parfümler için fırsat
   <span className='text-orange-500'> Hepsiburada PLUS</span>'ta!
      {/* Ürün Kartları Alanı */}
      <div className="flex gap-4 bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 p-6 rounded-2xl shadow-inner">
        {products.map((product) => {
          const discountRate = Math.floor(Math.random() * 21) + 10
          const discountedPrice = product.price * (1 - discountRate / 100)
          console.log(discountedPrice)
          

          return (
            
            <div
              key={product.id}
              className="w-40 h-56 bg-white 
              rounded-xl shadow-md hover:shadow-xl 
              transition duration-300 flex flex-col overflow-hidden"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.title}
                </h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}

export default Fregrances
