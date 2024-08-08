import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

const Form = () => {
    return (
        <div className='flex flex-col gap-y-[100px]'>
            <div className='flex flex-col gap-y-[40px]'>
                <div className='text-[3.1rem] text-content font-title font-bold'>
                    <span>Fill in some details to get started</span>
                </div>
                <div className='flex flex-row gap-x-[55px]'>
                    <div className="w-[35%] h-[10px] bg-btn rounded-lg"></div>
                    <div className="w-[35%] h-[10px] bg-gray-400 rounded-lg"></div>
                </div>

            </div>

            <div className='flex flex-col gap-y-[80px] text-content'>
                <input
                    type='text'
                    required
                    placeholder='Enter Your Name Here'
                    className='border-b-4 border-gray-600 outline-none w-[75%] font-content text-[1.5rem] focus:border-black pl-[5px]'
                />

                <input
                    type='text'
                    required
                    placeholder='Enter Your Phone Number Here'
                    className='border-b-4 border-gray-600 outline-none w-[75%] font-content text-[1.5rem] focus:border-black pl-[5px]'
                />
                <div className='flex justify-end w-[75%]'>
                    <button className='bg-btn px-[20px] py-[20px] rounded-full text-white'><FaArrowRight className='w-[30px] h-[30px]' /></button>
                </div>
            </div>

        </div>
    )
}

export default Form