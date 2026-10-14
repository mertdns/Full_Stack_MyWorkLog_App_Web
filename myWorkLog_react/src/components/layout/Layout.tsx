import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function Layout() {
    return (
        <div>
            <Header />

            <main className='min-h-110'>
                <Outlet/>
            </main>

            <Footer />
        </div>
    )
}

export default Layout