"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router
import InputWithLabelSub from '../custom-ui/InputWithLabelSub';
import Icons from '../common/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { addMerchantRequest, resetAddMerchant } from '@/redux/slice/merchantSlice';
import { RootState } from '@/redux/store/store';

const AddNewMerchant = () => {
    const router = useRouter(); // ✅ Initialize router
        const { loading, success, error } = useSelector((state:RootState) => state.merchant);
const dispatch = useDispatch();

    const [formData, setFormData] = useState<any>({
        merchantName: '',
        email: '',
        platformName: '',
        setDailyLimit: '',
        password: '',
    });

    // const [showSuccess, setShowSuccess] = useState(false);
    // const [loader, setLoader] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

 const isFormValid =
  Object.values(formData).every((value: any) => value.trim() !== "");



 const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid || loading) return;
        dispatch(addMerchantRequest(formData));
    };

    useEffect(() => {
        if (success) {
            // Redirect after 3 sec
            const timer = setTimeout(() => {
                dispatch(resetAddMerchant());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch, router]);

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative py-3 rounded-xl">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    <InputWithLabelSub
                        name="merchantName"
                        type="text"
                        placeholder="Enter merchant name"
                        value={formData.merchantName}
                        onChange={handleChange}
                    >
                        Merchant Name
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                    >
                        Email
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="platformName"
                        type="text"
                        placeholder="Enter platform name"
                        value={formData.platformName}
                        onChange={handleChange}
                    >
                        Platform Name
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="setDailyLimit"
                        type="number"
                        placeholder="Enter daily limit"
                        value={formData.setDailyLimit}
                        onChange={handleChange}
                    >
                        Set Daily Limit
                    </InputWithLabelSub>

                  <div>
                      <InputWithLabelSub
                        name="password"
                        type="password"
                        placeholder="Enter 6 digit password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                        password
                    </InputWithLabelSub>
                      {formData.password && formData.password.length < 6 && (
  <p className="text-xs text-red-500 mt-2 ps-2">Password must be at least 6 digits</p>
)}
                  </div>
                </div>

                {/* {showSuccess && (
                    <div className="text-green-600 text-xl mt-4 text-center font-medium">
                        ✔️ Data saved successfully!
                    </div>
                )} */}

                <div className="flex justify-center md:justify-end mt-6">
                    <button
                        type="submit"
                        disabled={!isFormValid || formData.password.length < 6 || loading}
                        className={`text-base font-medium px-5 py-3 rounded-[10px] text-white flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid && formData.password.length >= 6 && !loading
            ? 'bg-purple hover:bg-purple/90 cursor-pointer'
            : 'bg-purple/65 cursor-not-allowed'
                            }`}
                    >
                        {loading && (
                            <Icons icon={'saving'} />
                        )}
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewMerchant;
