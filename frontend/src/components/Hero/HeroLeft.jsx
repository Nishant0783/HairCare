import React from 'react'
import Button from '../Button/Button'

const HeroLeft = () => {
    return (
        <div className='flex flex-col sm:py-[50px] gap-y-[50px]'>
            <div className='flex flex-col'>
                <div className='font-title 2xl:text-[6rem] xl:text-[5rem] lg:text-[4rem] md:text-[3rem] font-semibold text-content'>
                    <p className='leading-tight'>Need Health Consultation?</p>
                </div>
                <div className='font-title 2xl:text-[5rem] xl:text-[4rem] lg:text-[3rem] md:text-[2rem] font-semibold text-content'>
                    <p>Now on Your Hands.</p>
                </div>
                <div className='font-title text-[0.8rem] md:text-[1rem] xl:text-[1.5rem] text-content mt-[-10px] md:w-[80%]'>
                    <p>Clinical excellence must be priority for any health care service provider.</p>
                </div>
            </div>
            <div>
                <Button 
                    bgColor={'bg-btn'}
                    content={'Take Online Test'}
                    contentColor={'text-btn-text'}
                    extraClass={'px-[20px] py-[10px] lg:px-[80px] md:px-[50px] md:text-[1.2rem]'}
                />
            </div>
        </div>
    )
}

export default HeroLeft