import React, { useState } from 'react'
import ImageUpload from '../ImageUpload/ImageUpload'
import Input from '../Inputs/Input'
import Button from '../Button/Button';
import { validateForm } from '../../utils/formValidations';
import { useNavigate } from 'react-router-dom';

const FormComplex = () => {
    const [formData, setFormData] = useState({
        image: '',
        dob: '',
        gender: '',
        familyHistory: '',
        stress: ''
    })
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const today = new Date().toISOString().split('T')[0];

    const handleImageUpload = (image) => {
        setFormData({
            ...formData,
            image
        })
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData)
        if(errors.length > 0) {
            setErrors(errors)   
            return
        }

        navigate('/result')
    }

    return (
        <div className='sm:my-[50px] my-[20px]'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row md:gap-x-[50px] gap-y-[30px]'>
                    <div>
                        <ImageUpload onImageUpload={handleImageUpload} error={errors.includes('image')} />
                    </div>
                    <div className='flex flex-col gap-y-[20px]'>
                        <div className='mt-[15px]'>
                            <Input
                                type='date'
                                name='dob'
                                id='dob'
                                label='Date Of Birth'
                                max={today}
                                onChange={handleFormChange}
                                error={errors.includes('dob')}
                            />
                        </div>
                        <div>
                            <Input
                                type='radio'
                                id='gender'
                                label='Gender'
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                    { value: 'other', label: 'Other' }
                                ]}
                                onChange={handleFormChange}
                                error={errors.includes('gender')}
                            />
                        </div>
                        <div>
                            <Input
                                type='select'
                                name='familyHistory'
                                id='familyHistory'
                                label='Family History of hairloss'
                                options={[
                                    { value: '', label: 'Choose option' },
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                                onChange={handleFormChange}
                                error={errors.includes('familyHistory')}
                            />
                        </div>
                        <div>
                            <Input
                                type='select'
                                name='stress'
                                id='stress'
                                label='Stress Level'
                                options={[
                                    { value: '', label: 'Choose option' },
                                    { value: 'low', label: 'Low' },
                                    { value: 'medium', label: 'Medium' },
                                    { value: 'high', label: 'High' },
                                ]}
                                onChange={handleFormChange}
                                error={errors.includes('stress')}
                            />
                        </div>

                    </div>
                </div>

                <div className='flex justify-center mt-[50px]'>
                    <Button
                        type={'submit'}
                        bgColor={'bg-btn'}
                        content={'Analyse'}
                        contentColor={'text-btn-text'}
                        extraClass={'px-[20px] py-[10px] lg:px-[80px] md:px-[50px] md:text-[1.2rem] hover:bg-blue-700'}
                    />
                </div>
            </form>
        </div>
    )
}

export default FormComplex