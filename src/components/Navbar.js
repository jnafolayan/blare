import React from 'react'
import { Link } from '@reach/router';
import Logo from './Logo'

export default function Navbar({ username }) {

  return (
    <div className="bg-white py-2 px-4 border-b-2 border-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo color="blue-600" />
          <div className="text-gray-700 text-sm">
            <Link className="mr-4 hover:text-blue-600" to="/reports">View</Link>
            <Link className="mr-6 hover:text-blue-600" to="/reports/create">Issue</Link>
            <span>{`@${username}`}</span>
          </div>
        </div>
      </div>
    </div>
  )

}