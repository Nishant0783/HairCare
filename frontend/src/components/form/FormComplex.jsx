import React from 'react'
import ImageUpload from '../ImageUpload/ImageUpload'
import InputSimple from '../Inputs/InputSimple'

const FormComplex = () => {
    const today = new Date().toISOString().split('T')[0];
    const handleImageUpload = () => {

    }
    return (
        <div className='sm:my-[50px] my-[20px]'>
            <form>  
                <div className='flex flex-col md:flex-row md:gap-x-[80px] gap-y-[30px]'>
                    <div>
                        <ImageUpload onImageUpload={handleImageUpload} />
                    </div>
                    <div className='flex flex-col gap-y-[20px]'>
                        <div className='mt-[15px]'>
                            <InputSimple
                                type='date'
                                id='dob'
                                label='Date Of Birth'
                                max={today}
                                inputClass='md:w-[300px] w-full'
                            />
                        </div>
                        <div>
                            <InputSimple
                                type='radio'
                                id='gender'
                                label='Gender'
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                    { value: 'other', label: 'Other' }
                                ]}
                            />
                        </div>
                        <div>
                            <InputSimple
                                type='select'
                                id='familyHistory'
                                label='Family History of hairloss'
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                        </div>
                        <div>
                            <InputSimple
                                type='select'
                                id='stress'
                                label='Stress Level'
                                options={[
                                    { value: 'low', label: 'Low' },
                                    { value: 'medium', label: 'Medium' },
                                    { value: 'high', label: 'High' },
                                ]}
                            />
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormComplex