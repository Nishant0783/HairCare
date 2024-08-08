import React from 'react'
import formLeft from '../../public/formLeft.jpg'
import Review from '../components/Review/Review'
import { reviews } from '../components/Review/review'
import Form from '../components/form/Form'
import Form2 from '../components/form/Form2'


const OnlineTest = () => {
    return (
        <>
            <div className='grid md:grid-cols-3 gap-x-[30px] '>
            <div className='col-span-2 my-[30px]'>
                    {/* <Form /> */}
                    <Form2 />
                </div>
                <div className='col-span-1 h-[100vh] absolute right-0 overflow-hidden'>
                    <img src={formLeft} alt='formLeft' className='h-[100vh] absolute right-0 w-[37vw] z-0' />
                    {
                        reviews.map((review) => (
                            <Review
                                name={review.name}
                                stars={review.stars}
                                content={review.content}
                            />
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default OnlineTest