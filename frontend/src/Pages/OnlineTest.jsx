import React from 'react'
import formLeft from '../../public/formLeft.jpg'
import Review from '../components/Review/Review'
import { reviews } from '../components/Review/review'
import Form from '../components/form/Form'
import Form2 from '../components/form/Form2'
import FormLayout from '../components/Form-Layout/FormLayout'
import FormComplex from '../components/form/FormComplex'


const OnlineTest = () => {
    return (
        <>  
            <div className='flex flex-col items-center justify-center min-h-screen'>
                {/* <FormLayout 
                    heading={'Fill in some details to get started'}
                    subheading={''}
                    step={1}
                    btnType={'button'}
                    btnContent={'Next'}
                    btnClass={'px-[20px] py-[10px] lg:px-[80px] md:px-[50px] md:text-[1.2rem] hover:bg-blue-700'}
                    children={<Form />}
                /> */}
                <FormLayout 
                    heading='Just, One more Step'
                    subheading='Fill in the details accurately, to get perfect results'
                    step={2}
                    btnType={'submit'}
                    btnContent={'Analyse'}
                    btnClass={'px-[20px] py-[10px] lg:px-[80px] md:px-[50px] md:text-[1.2rem] hover:bg-blue-700'}
                    children={<FormComplex />}
                />
            </div>
        </>
    )
}

export default OnlineTest