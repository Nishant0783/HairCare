import React, { useState } from 'react';

const FormStep = ({ formTitle, formFields, buttonText, onSubmit, onImageUpload, showButton }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};
    formFields.forEach(field => {
      if (!formData[field.name]) {
        valid = false;
        newErrors[field.name] = `${field.placeholder} is required`;
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault()
    if(formData.file !== '') {
      onImageUpload(formData.file)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index} className="mb-4">
            {field.type === 'select' ? (
              <select
                name={field.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {field.type == "file" && <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={handleImageUpload}
                >
                  Upload Image
                </button>}

              </>
            )}
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        ))}
        {
          showButton && <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {buttonText}
        </button>
        }
       
      </form>
    </div>
  );
};

export default FormStep;
