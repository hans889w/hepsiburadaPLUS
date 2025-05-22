import React from 'react';
import { useSelector } from 'react-redux'; 
import { RootState } from './store'; 
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Odeme = () => {
  
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const total = useMemo(
    () =>
      cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2),
    [cartItems]
  );

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [addressInfo, setAddressInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
  });
  const [bank, setBank] = useState('');

  // Luhn Algoritması
  const luhnCheck = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      setCardInfo((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === 'cardHolder') {
      const cleaned = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
      setCardInfo((prev) => ({ ...prev, [name]: cleaned }));
    } else if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      const formatted = cleaned
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .slice(0, 5);
      setCardInfo((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 3);
      setCardInfo((prev) => ({ ...prev, [name]: cleaned }));
    }
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 11);
      setAddressInfo((prev) => ({ ...prev, [name]: cleaned }));
    } else if (name === 'fullName') {
      const cleaned = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 100);
      setAddressInfo((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setAddressInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateCard = () => {
    const { cardNumber, cardHolder, expiryDate, cvv } = cardInfo;
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');

    if (cleanedCardNumber.length !== 16 || !luhnCheck(cleanedCardNumber)) {
      toast.error('Geçerli bir kart numarası girin (16 hane)', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (!/^[a-zA-Z\s]{2,50}$/.test(cardHolder.trim())) {
      toast.error('Kart sahibi ismi geçerli olmalı (sadece harf, 2-50 karakter)', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (!/^(0[1-9]|1[0-2])\/([2-9][0-9])$/.test(expiryDate)) {
      toast.error('Son kullanma tarihi MM/YY formatında olmalı', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }
    const [month, year] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    if (
      year < currentYear ||
      (year === currentYear && month < currentMonth) ||
      month > 12 ||
      month < 1
    ) {
      toast.error('Son kullanma tarihi geçerli değil', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      toast.error('CVV 3 hane olmalı', { position: 'top-right', autoClose: 3000 });
      return false;
    }

    return true;
  };

  const validateAddress = () => {
    const { fullName, phone, address, city } = addressInfo;

    if (
      fullName.trim() === '' ||
      phone.trim() === '' ||
      address.trim() === '' ||
      city.trim() === ''
    ) {
      toast.error('Lütfen tüm adres bilgilerini doldurun', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (!/^[a-zA-Z\s]{2,100}$/.test(fullName.trim())) {
      toast.error('Ad Soyad sadece harf içermeli, 2-100 karakter', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (!/^0\d{9}$/.test(phone)) {
      toast.error('Telefon numarası 0 ile başlamalı ve 10 hane olmalı', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (address.trim().length < 10) {
      toast.error('Adres en az 10 karakter olmalı', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    if (city.trim().length < 2) {
      toast.error('Şehir en az 2 karakter olmalı', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const validateBank = () => {
    if (bank === '') {
      toast.error('Lütfen bir banka seçin', { position: 'top-right', autoClose: 3000 });
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (!validateAddress()) return;

    if (paymentMethod === 'creditCard' && !validateCard()) return;
    if (paymentMethod === 'bankTransfer' && !validateBank()) return;

    let finalTotal = Number(total);
    if (paymentMethod === 'cashOnDelivery') {
      finalTotal += 10;
      toast.info('Kapıda ödeme için 10 TL ekstra ücret eklendi', {
        position: 'top-right',
        autoClose: 3000,
      });
    }

    toast.success(`Ödeme başarılı! Toplam: ${finalTotal.toFixed(2)} TL. Siparişiniz alındı.`, {
      position: 'top-right',
      autoClose: 3000,
      theme: 'light',
    });

    // dispatch(clearCart()); // Eğer sepeti temizlemek istersen bunu ekle

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-white px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Sepetiniz boş</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Ödeme yapabilmek için önce sepetinize ürün ekleyin.
        </p>
        <Link
          to="/"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <svg
            className="w-10 h-10 text-orange-500 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800">Ödeme Sayfası</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Teslimat Adresi</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Ad Soyad</label>
                  <input
                    type="text"
                    name="fullName"
                    value={addressInfo.fullName}
                    onChange={handleAddressInputChange}
                    placeholder="Ad Soyad"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Telefon</label>
                  <input
                    type="text"
                    name="phone"
                    value={addressInfo.phone}
                    onChange={handleAddressInputChange}
                    placeholder="0XXXXXXXXXX"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 mb-1">Adres</label>
                  <input
                    type="text"
                    name="address"
                    value={addressInfo.address}
                    onChange={handleAddressInputChange}
                    placeholder="Tam adres"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Şehir</label>
                  <input
                    type="text"
                    name="city"
                    value={addressInfo.city}
                    onChange={handleAddressInputChange}
                    placeholder="Şehir"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Ödeme Yöntemi</h3>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={paymentMethod === 'creditCard'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Kredi Kartı
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={paymentMethod === 'bankTransfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Havale/EFT
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      checked={paymentMethod === 'cashOnDelivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    Kapıda Ödeme
                  </label>
                </div>

                {paymentMethod === 'creditCard' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">Kart Numarası</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Kart Üzerindeki İsim</label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={cardInfo.cardHolder}
                        onChange={handleCardInputChange}
                        placeholder="Ad Soyad"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Son Kullanma Tarihi (MM/YY)</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardInfo.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'bankTransfer' && (
                  <div>
                    <label className="block text-gray-600 mb-1">Banka Seçin</label>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Banka Seçin</option>
                      <option value="garanti">Garanti Bankası</option>
                      <option value="akbank">Akbank</option>
                      <option value="isbank">İş Bankası</option>
                      <option value="yapikredi">Yapı Kredi</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cashOnDelivery' && (
                  <div className="text-gray-600">
                    Kapıda ödeme seçeneği için 10 TL ekstra ücret alınacaktır.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Sipariş Özeti</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 pb-2">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg mr-3"
                  />
                  <div className="flex-grow">
                    <p className="text-gray-800 font-semibold">{item.title}</p>
                    <p className="text-gray-600">
                      {item.quantity} x {item.price.toFixed(2)} TL
                    </p>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    {(item.price * item.quantity).toFixed(2)} TL
                  </p>
                </div>
              ))}
              {paymentMethod === 'cashOnDelivery' && (
                <div className="flex justify-between text-gray-600">
                  <span>Kapıda Ödeme Ücreti</span>
                  <span>10.00 TL</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200">
                <span>Toplam</span>
                <span>
                  {paymentMethod === 'cashOnDelivery'
                    ? (Number(total) + 10).toFixed(2)
                    : total}{' '}
                  TL
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 mt-4"
              >
                Ödemeyi Tamamla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Odeme;