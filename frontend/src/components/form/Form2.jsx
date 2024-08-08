import React from 'react'
import ImageUpload from '../ImageUpload/ImageUpload'

const Form2 = () => {
    const today = new Date().toISOString().split('T')[0];
    const handleImageUpload = () => {
        console.log("Image upload")
    }

    return (
        <div className='flex flex-col gap-y-[40px]'>
            <div className='text-[3.1rem] text-content font-title font-bold'>
                <p>Just, One more Step</p>
                <p className='text-[1.5rem] font-normal'>Fill in the details accurately, to get perfect results</p>
            </div>
            <div className='flex flex-row gap-x-[55px]'>
                <div className="w-[35%] h-[10px] bg-gray-400 rounded-lg"></div>
                <div className="w-[35%] h-[10px] bg-btn rounded-lg"></div>
            </div>
            <div className='flex  text-content font-content gap-x-[30px]'>
                <div className='flex flex-col gap-y-[5px] font-semibold'>
                    <span>Upload Image</span>
                    <ImageUpload onImageUpload={handleImageUpload} />
                </div>
                <div className="flex flex-col w-[250px] gap-y-[50px] justify-center">
                    <div className="flex flex-col w-[250px] gap-y-[5px]">
                        <label htmlFor='dob' className='font-semibold'>Date of Birth</label>
                        <input
                            required
                            id='dob'
                            type="date"
                            max={today}  // This restricts the calendar to not accept dates greater than today
                            className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>


                    <div className="flex flex-col space-y-4">
                        <label className="text-lg font-semibold">Family history of hair loss:</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2">
                                <input
                                    required
                                    type="radio"
                                    name="familyHistory"
                                    value="yes"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    required
                                    type="radio"
                                    name="familyHistory"
                                    value="no"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>No</span>
                            </label>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col w-[250px] gap-y-[50px] justify-center">
                    <div className="flex flex-col space-y-4">
                        <label className="text-lg font-semibold">Stress Level:</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2">
                                <input
                                    required
                                    type="radio"
                                    name="stress"
                                    value="low"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>Low</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    required
                                    type="radio"
                                    name="stress"
                                    value="medium"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>Medium</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    required
                                    type="radio"
                                    name="stress"
                                    value="high"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>High</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label className="text-lg font-semibold">Gender</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2">
                                <input
                                    required
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>Female</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    required
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span>Other</span>
                            </label>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Form2