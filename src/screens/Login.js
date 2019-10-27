import React, { useState } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'
import BGWrap from './login/BGWrap'
import storage from '../shared/core/storage';
import { buildUrl } from '../shared/utils'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
  
    const updateState = () => {
      storage.set('user', {
        username: 'jnafolayan',
        email: 'jnafolayan@gmail.com'
      })
      navigate('/reports/create')
    }

    axios
      .post(buildUrl('/users'), { email, password })
      .then((resp) => {
        updateState()
      })
      .catch(updateState)
  }

  return (
    <BGWrap>
      <div className="auth-bg py-6 bg-gray-200 min-h-screen">
        <div className="dark-overlay">
          <div className="w-full -mt-12 md:-mt-24">
            <h5 className="font-sans font-medium text-center text-white text-2xl lg-8">
              ACCOUNT LOGIN
            </h5>

            <div className="mt-6 auth-card mx-auto rounded-lg shadow bg-white">
              <form onSubmit={handleFormSubmit} method="POST" action="">
                <div className="py-3 px-4">
                  <input
                  onChange={event => setEmail(event.target.value)}
                  type="email" 
                  placeholder="Email address"               
                  className="border-0 outline-none w-full px-2 py-2 text-lg" />
                </div>
                <div className="border-t border-gray-200 py-3 px-4">
                  <input
                  onChange={event => setPassword(event.target.value)}
                  type="password"
                  placeholder="Password"               
                  className="border-0 outline-none w-full px-2 py-2 text-lg" />
                </div>
                <div className="border-t border-gray-200 py-3 px-4">
                  <button className="bg-blue-600 rounded-lg hover:shadow-lg block w-1/3 py-3 px-2 text-white font-medium font-sans text-center mx-auto">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>

            <p className="mt-6 text-center text-gray-300 font-sans text-md">
              <span>Don't have an account?</span>
              &nbsp;<Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </BGWrap>
  );

}