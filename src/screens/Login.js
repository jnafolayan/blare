import React from 'react';
import { Link } from '@reach/router';
import BGWrap from './login/BGWrap';
import Logo from '../components/Logo';

export default function Login() {

  return (
    <BGWrap>
      <div className="login-bg py-6 bg-gray-200 min-h-screen">
        <div className="dark-overlay">
          <div className="w-full -mt-12 md:-mt-24">
            <h5 className="font-sans font-medium text-center text-white text-2xl lg-8">
              ACCOUNT LOGIN
            </h5>

            <div className="mt-6 auth-card mx-auto rounded-lg shadow bg-white">
              <form onSubmit={false} method="POST" action="">
                <div className="py-3 px-4">
                  <input
                  type="email" 
                  placeholder="Email address"               
                  className="border-0 w-full px-2 py-2 text-lg" />
                </div>
                <div className="border-t border-gray-200 py-3 px-4">
                  <input
                  type="password"
                  placeholder="Password"               
                  className="border-0 w-full px-2 py-2 text-lg" />
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