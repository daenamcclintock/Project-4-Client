import React from 'react'
import banner from '../../images/banner.png'
import '../../Styling/Banner.css'

const Banner = () => {
  return (
    <div className='Banner_container'>
        <img className='banner_img' src={banner} alt='Homepage Banner' />
    </div>
  )
}

export default Banner