import React, { useEffect, useState } from 'react';

const Report = ({ report }) => {
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    age: '',
    stressLevel: '',
    history: ''
  });

  const [currDate, setCurrDate] = useState('');

  useEffect(() => {
    setPersonalDetails({
      name: localStorage.getItem('name') || '',
      age: calculateAge(localStorage.getItem('dob')),
      stressLevel: localStorage.getItem('stress') || '',
      history: localStorage.getItem('history') || '',
    });

    setCurrDate(getCurrentDate());
  }, []);

  function getCurrentDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function calculateAge(dob) {
    if (!dob) return '';

    // Split the input string to get day, month, and year
    const [year, month, day] = dob.split('-').map(Number);

    // Create a date object from the dob
    const dobDate = new Date(year, month - 1, day);

    // Get today's date
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - dobDate.getFullYear();

    // Adjust age if the birth date hasn't occurred yet this year
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <div className='max-w-[600px] bg-blue-200 flex flex-col'>
      <div className='flex flex-col px-[30px] py-[30px] gap-y-[20px]'>
        <div className='flex flex-col gap-y-[5px]'>
          <h1 className='text-[2rem]'>Your Personalized Hair report</h1>
          <h4 className='text-[1rem]'>Based on your Assessment on {currDate}</h4>
        </div>
        {/* Card 1 */}
        <div className='bg-white flex flex-col px-[20px] py-[10px] rounded-[10px]'>
          <h1 className='text-[1.5rem] mb-[25px]'>Patient Information</h1>
          <p className='text-[1.2rem]'><strong>Name: </strong> {personalDetails?.name} </p>
          <p className='text-[1.2rem]'><strong>Age: </strong> {personalDetails?.age} </p>
          <p className='text-[1.2rem]'><strong>Stress Level: </strong> {personalDetails?.stressLevel} </p>
          <p className='text-[1.2rem]'><strong>Family History of hairloss: </strong> {personalDetails?.history} </p>
        </div>

        {/* Card 2 */}
        <div className='bg-white flex flex-col px-[20px] py-[10px] rounded-[10px]'>
          <h1 className='text-[1.5rem] mb-[25px]'>Hair Analysis</h1>
          <p className='text-[1.2rem]'><strong>Baldness Stage: </strong> {report.baldnessStage} </p>
          <p className='text-[1.2rem]'><strong>Hair Density: </strong> {report.hairDensity} </p>
          <p className='text-[1.2rem]'><strong>Scalp Condition: </strong> {report.scalpCondition} </p>
          <p className='text-[1.2rem]'><strong>Risk Factor: </strong> {report.riskFactor} </p>
        </div>

        {/* Card 3 */}
        <div className='bg-white flex flex-col px-[20px] py-[10px] rounded-[10px]'>
          <h1 className='text-[1.5rem] mb-[25px]'>Recommended Treatments</h1>
          <p className='text-[1.2rem]'><strong>Treatment Plan: </strong> {report.treatmentPlan} </p>
          <p className='text-[1.2rem]'><strong>Maintenance Tips: </strong> {report.maintenanceTips} </p>
        </div>
      </div>
    </div>
  );
};

export default Report;
