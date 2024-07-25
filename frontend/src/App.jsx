import React, { useState } from 'react';
import FormStep from './FormStep';
import './index.css';
import Report from './Report.jsx';
import axios from 'axios'

const App = () => {
  const [step, setStep] = useState(1);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [isHairfall, setIsHairFall] = useState(null);

  const personalProfileFields = [
    { type: 'text', name: 'fullName', placeholder: 'Full Name' },
    { type: 'text', name: 'phoneNumber', placeholder: 'Phone Number' },
    { type: 'email', name: 'email', placeholder: 'Email' },
  ];

  const hairEvaluationFields = [
    { type: 'file', name: 'file', placeholder: 'Choose File' },
    { type: 'date', name: 'date', placeholder: 'DOB' },
    { type: 'select', name: 'stressLevel', placeholder: 'Select Stress Level', options: ['Low', 'Medium', 'High'] },
    { type: 'select', name: 'familyHistory', placeholder: 'Family History of Hair Loss?', options: ['Yes', 'No'] },
  ];

  const handlePersonalProfileSubmit = (data) => {
    localStorage.setItem('name', data.fullName)
    localStorage.setItem('number', data.phoneNumber)
    localStorage.setItem('email', data.email)
    setStep(2);
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/analyzeImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("repsonse of image analysis: ", response)
      setError('')
      setImageAnalysis(response.data);
      setIsHairFall(response.data.isHairfall)
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError(error.message)
    }
  };

  const handleHairEvaluationSubmit = async (data) => {
    if (!imageAnalysis) {
      alert('Please upload and analyze an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('fullName', localStorage.getItem('name'));
    formData.append('phoneNumber', localStorage.getItem('number'));
    formData.append('email', localStorage.getItem('email'));
    formData.append('date', data.date);
    formData.append('stressLevel', data.stressLevel);
    formData.append('familyHistory', data.familyHistory);

    try {
      const response = await axios.post('http://localhost:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setError('')
      console.log("Response of whole analysis is: ", response)
      setReport(response.data.report);
      setStep(3);
    } catch (error) {
      console.error('Error generating report:', error);
      setError("Error in generating report")
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
        <FormStep
          formTitle="Hair Evaluation"
          formFields={hairEvaluationFields}
          buttonText="Generate Hair Report"
          onSubmit={handleHairEvaluationSubmit}
          isLastStep={true}
          onImageUpload={handleImageUpload}
          showButton={isHairfall}
        />
      )}
      {step === 3 && (
        <Report report={report} />
      )}
      {isHairfall == false && <p>The image uploaded is not a hairfall image. Please re-upload image</p>}
      {error && error !== '' && <p>{error}</p>}
    </div>
  );
};

export default App;