import React from 'react'

const Footer = () => {
    return (
        <footer className='text-center px-4 pb-4 font-medium text-sm text-charcoal'>
            <p>&copy; {new Date().getFullYear()} Anac Lubricants. All rights reserved.</p>
        </footer>
    )
}

export default Footer;