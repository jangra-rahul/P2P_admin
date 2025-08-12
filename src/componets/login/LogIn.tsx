'use client';

import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';
import Icons from '../common/Icons';
import InputWithLabel from '../custom-ui/InputWithLabel';
import CtaButton from '../custom-ui/CtaButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '@/redux/slice/userSlice';
import { RootState } from '@/redux/store/store';
import Spinner from 'react-bootstrap/Spinner';


interface FormData {
  email: string;
  password: string;
}

const LogIn = () => {
  // const router = useRouter();
const { loading, error, data } = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [fildError, setFildError] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const dispatch = useDispatch();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setFildError('Please enter both email and password.');
    return;
  }

  dispatch(loginRequest({ email: formData.email, password: formData.password }));
};

  return (
    <div className="max-w-[19920px] bg-white mx-auto px-4 lg:px-2.5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] py-2.5 min-h-screen ">
        <div className="flex flex-col justify-center max-w-[416px] md:p-4 md:pl-0 mx-auto w-full bg-white mb-14 md:mb-0">
          <Image
            src="/assets/images/webp/page_logo.webp"
            className="w-[130px] md:w-[150px] lg:w-[187px] h-auto"
            height={77}
            width={187}
            alt="page-logo"
            priority
          />

          {/* Mobile Welcome Text */}
          <div className="max-w-[640px] mx-auto md:hidden">
            <p className="text-lg pt-4 font-normal leading-100 text-black">
              Welcome back, Super Admin 👋
            </p>
            <h2 className="text-black font-bold py-3 md:py-6 text-2xl">
              Login to Your Admin Dashboard
            </h2>
            <p className="text-xs lg:text-lg leading-[120%] font-normal text-black">
              Monitor platform activity, manage roles, and oversee deposits and wallets from one central place.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4 md:pt-6 lg:pt-10">
            <div className="flex gap-2 hover:border-purple duration-300 py-2.5 md:py-3 px-4 lg:py-4 md:px-6 border border-white-off rounded-[10px]">
              <label htmlFor="email">
                <Icons icon="email" />
              </label>
              <InputWithLabel
                // id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 hover:border-purple duration-300 py-2.5 md:py-3 px-4 lg:py-4 md:px-6 border border-white-off rounded-[10px]">
              <label htmlFor="password">
                <Icons icon="lock" />
              </label>
              <InputWithLabel
                // id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* {error && <p className="text-red-500 text-sm -mt-2">{error}</p>} */}

           <CtaButton disabled={loading }>
 {loading && (
                           <> <Icons icon={'saving'} />&nbsp;</>
                        )}
                        {loading ? " Lodding...": " Login"}
</CtaButton>

          </form>
        </div>

        {/* Right Panel */}
        <div className="hidden md:flex justify-center items-center rounded-xl lg:rounded-[20px] w-full h-full bg-[url('/assets/images/svg/hero_bg.svg')] bg-center bg-no-repeat bg-cover">
          <div className="max-w-[640px] mx-auto p-4">
            <h2 className="text-2xl md:text-[26px] font-normal leading-100 lg:text-custom-36 text-white">
              Welcome back, Super Admin 👋
            </h2>
            <h1 className="text-white font-bold py-4 md:py-6 text-3xl md:text-4xl lg:text-custom-59">
              Login to Your Admin Dashboard
            </h1>
            <p className="text-base lg:text-lg leading-[120%] font-normal text-white">
              Monitor platform activity, manage roles, and oversee deposits and wallets from one central place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;