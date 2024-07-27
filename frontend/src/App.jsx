import React, { useState } from 'react';
import FormStep from './FormStep';
import './index.css';
import Report from './Report.jsx';
import axios from 'axios';
import ImageUpload from './components/ImageUpload.jsx';

const App = () => {
  const [step, setStep] = useState(1);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [isHairfall, setIsHairFall] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const personalProfileFields = [
    { type: 'text', name: 'fullName', placeholder: 'Full Name' },
    { type: 'text', name: 'phoneNumber', placeholder: 'Phone Number' },
    { type: 'email', name: 'email', placeholder: 'Email' },
  ];

  const hairEvaluationFields = [
    { type: 'date', name: 'date', placeholder: 'D.O.B', max: getTodayDate() },
    { type: 'select', name: 'stressLevel', placeholder: 'Select Stress Level', options: ['Low', 'Medium', 'High'] },
    { type: 'select', name: 'familyHistory', placeholder: 'Family History of Hair Loss?', options: ['Yes', 'No'] },
  ];

  const handlePersonalProfileSubmit = (data) => {
    localStorage.setItem('name', data.fullName);
    localStorage.setItem('number', data.phoneNumber);
    localStorage.setItem('email', data.email);
    setStep(2);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploadedImage(file);

    try {
      const response = await axios.post('http://localhost:5000/analyzeImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Response of image analysis: ", response);
      setError('');
      setImageAnalysis(response.data);
      if(!response.data.isHairfall) {
        setError('Uploaded image is not a hairfall image');
        return
      }
      setIsHairFall(response.data.isHairfall);
      setIsDisabled(!(response.data.isHairfall))
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Uploaded image is not a hairfall image');
      setIsHairFall(false);
      setIsDisabled(true)
    }
  };

  const handleHairEvaluationSubmit = async (data) => {
    if (!imageAnalysis || !uploadedImage) {
      alert('Please upload and analyze an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedImage);
    formData.append('fullName', localStorage.getItem('name'));
    formData.append('phoneNumber', localStorage.getItem('number'));
    formData.append('email', localStorage.getItem('email'));
    formData.append('date', data.date);
    formData.append('stressLevel', data.stressLevel);
    formData.append('familyHistory', data.familyHistory);
    // Inspect FormData content
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    localStorage.setItem('dob', data.date);
    localStorage.setItem('stress', data.stressLevel);
    localStorage.setItem('history', data.familyHistory);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setError('');
      console.log("Response of whole analysis is: ", response);
      setReport(response.data.report);
      setStep(3);
    } catch (error) {
      console.error('Error generating report:', error);
      setError("Error in generating report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {step === 1 && (
        <FormStep
          formTitle="Personal Profile"
          formFields={personalProfileFields}
          buttonText="Continue to Hair Assessment"
          onSubmit={handlePersonalProfileSubmit}
          showButton={true}
        />
      )}
      {step === 2 && (
        <>
          <FormStep
            formTitle="Hair Evaluation"
            formFields={hairEvaluationFields}
            buttonText="Generate Hair Report"
            onSubmit={handleHairEvaluationSubmit}
            isLastStep={true}
            showButton={isHairfall}
            isImage={true}
            isLoading={loading}
            imageComponent={<ImageUpload onImageUpload={handleImageUpload} />}
            isDisabled = {isDisabled}
          />
        </>
      )}
      {step === 3 && (
        <Report report={report} />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default App;
