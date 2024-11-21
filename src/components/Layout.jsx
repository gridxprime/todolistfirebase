import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <>
    <header>
    <Link style={{color: 'inherit', textDecoration: 'none'}} to='/'>Домой</Link>
    <Link style={{color: 'inherit', textDecoration: 'none'}} to='/contacts'>Контакты</Link>
    </header>
    <Outlet></Outlet>
    <footer>
    <span>Made on ReactJS</span>
    <span> 2024</span>
    </footer>
    </>
  )
}

export default Layout