import React from 'react'
import HeroLeft from './HeroLeft'

const Hero = () => {
  return (
    <section className='bg-white'>
        <div className='grid sm:grid-cols-2'> 
            <div className='col-span-1'>
                <HeroLeft />
            </div>
        </div>
    </section>
  )
}

export default Hero