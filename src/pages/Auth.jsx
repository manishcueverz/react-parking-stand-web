/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const Auth = () => {
  const [signin, setsignin] = useState(true);
  
  return (
    <div className=" min-h-screen bg-slate-200 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <p className=' text-2xl font-bold text-blue-800'>PARKING STAND</p>
        {signin ?
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">
              Login to your workspace
            </p>
            <div className='mt-5'>
              <lable className="text-sm font-medium leading-none text-gray-800">Mobile</lable>
              <input aria-label="enter mobile number" type="mobile" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            </div>
            <div className="mt-6  w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">Password</lable>
              <div className="relative flex items-center justify-center">
                <input aria-label="enter Password" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
              </div>
            </div>
            <div className="mt-8">
              <button aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                Login
              </button>
            </div>
            <p className="text-sm mt-4 font-medium leading-none text-gray-500">
              Dont have workspace?{" "}
              <span
                onClick={() => setsignin(false)}
                tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                {" "}
                Sign up here
              </span>
            </p>
          </div> :
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <p tabIndex={0} aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">
              Create new workspace
            </p>
            <div className='mt-5'>
              <lable className="text-sm font-medium leading-none text-gray-800">Name</lable>
              <input aria-label="enter name" type="name" value='name' className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            </div>
            <div className=' mt-6'>
              <lable className=" text-sm font-medium leading-none text-gray-800">Mobile</lable>
              <input aria-label="enter mobile number" type="mobile" value='phone_number' className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            </div>
            <div className="mt-6  w-full">
              <lable className="text-sm font-medium leading-none text-gray-800">Password</lable>
              <div className="relative flex items-center justify-center">
                <input aria-label="enter Password" type="password" value='password' className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
              </div>
            </div>
            <div className="mt-8">
              <button aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                Create
              </button>
            </div>
            <p className="text-sm mt-4 font-medium leading-none text-gray-500">
              You have workspace?{" "}
              <span
                onClick={() => setsignin(true)}
                tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                {" "}
                Sign in here
              </span>
            </p>
          </div>
        }
      </div>
    </div>
  );
}

export default Auth
