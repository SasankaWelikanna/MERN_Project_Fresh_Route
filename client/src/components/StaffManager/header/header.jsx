import React from 'react'
import '../../../App.css'
import Nav from './nav/Nav'

const header = () => {
  return (
    <div>
      <header id='header' className='header fixed-top d-flex align-items-center justify-content-end mt-3'>
         <Nav />
        </header>
    </div>
  )
}

export default header