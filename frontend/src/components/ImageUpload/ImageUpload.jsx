import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload, error=false }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            onImageUpload(file);
        }
    };

    return (
        <div className='flex flex-col space-y-[10px]'>
            <div className={`${error ? 'text-red-500' : 'text-label'} font-semibold font-content text-[1rem]`}>
                <label htmlFor='imageUpload'>Upload Image</label>
            </div>
            <div className={`md:w-[400px] md:h-[300px] w-full h-[200px] mb-[20px] border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden relative`}>
                <input
                    type="file"
                    accept="image/*"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    onChange={handleImageChange}
                />
                {image ? (
                    <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Upload Image
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;