import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function MainNavigation() {
  return (
   <>
    <Navbar />
    <div style={{ backgroundColor: "#E1F7F7", minHeight: "100vh", width: "100vw", padding: "20px" }}>
      <Outlet />
    </div>
    <Footer />
   </>
  )
}
