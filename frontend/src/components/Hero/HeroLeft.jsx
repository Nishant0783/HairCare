import React from 'react'
import Button from '../Button/Button'

const HeroLeft = () => {
    return (
        <div className='flex flex-col sm:py-[50px] gap-y-[50px]'>
            <div className='flex flex-col'>
                <div className='font-title 2xl:text-[6rem] xl:text-[5rem] font-semibold text-content'>
                    <p className='leading-tight'>Need Health Consultation?</p>
                </div>
                <div className='font-title 2xl:text-[5rem] xl:text-[4rem] font-semibold text-content'>
                    <p>Now on Your Hands.</p>
                </div>
                <div className='font-title sm:text-[1.5rem]  text-content mt-[-10px] w-[80%]'>
                    <p>Clinical excellence must be priority for any health care service provider.</p>
                </div>
            </div>
            <div>
                <Button 
                    bgColor={'btn'}
                    content={'Take Online Test'}
                    contentColor={'btn-text'}
                    extraClass={'px-[80px] py-[10px]'}
                />
            </div>
        </div>
    )
}

export default HeroLeft