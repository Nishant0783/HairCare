import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='max-w-[1550px] mx-auto'>
        <Outlet />
    </div>
  )
}

export default RootLayout