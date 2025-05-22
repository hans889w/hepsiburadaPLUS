import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerSuccess } from '../features/auth/authSlice'
import axiosInstance from '../features/axios/axiosInstance'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !username || !password) {
      toast.error('Lütfen tüm alanları doldurun.', {
        position: 'top-right'
      })
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

    if (!passwordRegex.test(password)) {
      toast.error('Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermelidir.')
      return
    }

    try {
      const res = await axiosInstance.post('/register', { email, username, password })
      console.log('backend response:', res.data)
      const { accessToken, refreshToken, user } = res.data

      dispatch(registerSuccess({ user, accessToken, refreshToken }))
      toast.success('Kayıt başarılı!')
      navigate('/')
    } catch (err) {
      toast.error('Kayıt başarısız. Email zaten kullanılıyor', {
        position: 'top-right'
      })
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-2 -translate-y-1/2 hover:text-gray-700"
            aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  )
}

export default Register