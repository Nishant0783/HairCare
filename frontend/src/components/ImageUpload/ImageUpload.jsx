import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
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
        <div className="w-64 h-64 mb-[20px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative">
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
    );
};

export default ImageUpload;