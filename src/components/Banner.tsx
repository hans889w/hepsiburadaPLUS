import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { type RootState } from './store'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/girişyap')
  }

  return (
    <div className="w-full h-24 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-700 p-4 flex items-center justify-between overflow-x-hidden">
      <div className="flex-1 flex items-center justify-center relative">
        <p className="text-white font-semibold text-xl sm:text-2xl drop-shadow-sm ml-52">
          Yeni Fırsatlar <span className="bg-white text-orange-600 font-bold px-2 rounded">HepsiBurada PLUS</span>'ta!
        </p>
      </div>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <span className="text-white font-medium">Hoşgeldin, {user?.email || ''}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/girişyap')}
              className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium px-4 py-2 rounded-xl shadow-lg hover:from-orange-500 hover:to-orange-700 transition duration-300"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => navigate('/üyeol')}
              className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium px-4 py-2 rounded-xl shadow-lg hover:from-orange-500 hover:to-orange-700 transition duration-300"
            >
              Kayıt Ol
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Banner