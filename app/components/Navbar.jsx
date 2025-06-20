"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex items-center justify-between px-4 py-3 w-full h-20 '>
      {/* Logo */}
      <Image src="/logo.svg" alt="Logo" width={200} height={100} />

      {/* Desktop Nav Items */}
        <ul className='hidden md:flex gap-12 font-medium text-gray-800'>
  <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md hover:underline transition-all duration-200'>
    About Us
  </li>
  <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md transition-all duration-200'>
    Features
  </li>
  <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md transition-all duration-200'>
    Pricing
  </li>
  <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md transition-all duration-200'>
    Support
  </li>
</ul>

      {/* Get Started Button */}
      <button className='bg-black text-white dark:text-black dark:bg-white hidden md:block lg:block h-10 w-36 rounded-md '>
        Get Started
      </button>

      {/* Hamburger Icon (Mobile only) */}
      <button
        className='md:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute top-20 left-0 w-full bg-white shadow-md z-10 px-4 py-6 flex flex-col gap-4 md:hidden'>
          <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md transition-all duration-200 text-nowrap'>About Us</li>
          <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md transition-all duration-200'>Features</li>
          <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md transition-all duration-200'>Pricing</li>
          <li className='cursor-pointer px-5 py-2 rounded-md hover:bg-gray-100 hover:shadow-md transition-all duration-200'>Support</li>
          
        </div>
      )}
    </div>
  )
}

export default Navbar
