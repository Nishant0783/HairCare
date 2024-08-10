import React from 'react'
import InputSimple from '../Inputs/InputSimple';

const Form = () => {
    return (
        <div className='sm:my-[50px] my-[20px]'>
            <form className='flex flex-col md:gap-y-[60px] sm:gap-y-[40px] gap-y-[20px]'>
               <InputSimple 
                    type='text'
                    id='name'
                    label='Your Name'
               />
               <InputSimple 
                    type='email'
                    id='email'
                    label='Your Email'
               />
               <InputSimple 
                    type='text'
                    id='number'
                    label='Your Number'
               />
            </form>
        </div>
    )
}

export default Form