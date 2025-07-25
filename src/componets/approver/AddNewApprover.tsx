"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InputWithLabelSub from '../custom-ui/InputWithLabelSub';
import Icons from '../common/Icons';
// import ApproverPopUp from './ApproverPopUp';
// import ApproverMerchantsList from './ApproverMerchantsList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { addApproverRequest, resetAddApprover } from '@/redux/slice/approverSlice';

const AddNewApprover = () => {
    const router = useRouter();

        const { loading, success, error } = useSelector((state:RootState) => state.approver);
const dispatch = useDispatch();
    const [formData, setFormData] = useState<any>({
        approverName: '',
        email: '',
        setDailyLimit: '',
        password: '',
    });

    // const [showSuccess, setShowSuccess] = useState(false);
    // const [loader, setLoader] = useState(false);
    const [actionType, setActionType] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = Object.values(formData).every((value:any) => value.trim() !== "");

 const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid || loading) return;
        dispatch(addApproverRequest(formData));
    };

    useEffect(() => {
        if (success) {
            // Redirect after 3 sec
            const timer = setTimeout(() => {
                dispatch(resetAddApprover());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch, router]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!isFormValid || loading || !actionType) return;

    //     setLoading(true);

    //     // Simulate API call
    //     setTimeout(() => {
    //         console.log(`Form submitted via "${actionType}"`, formData);

    //         setShowSuccess(true);
    //         setFormData({
    //             approverName: '',
    //             email: '',
    //             setDailyLimit: '',
    //             password: '',
    //         });
    //         setLoading(false);

    //         setTimeout(() => {
    //             setShowSuccess(false);
    //             if (actionType === "save") {
    //                 router.push("/dashboard/approvers");
    //             } else {
    //                 router.push("/dashboard/merchants");
    //             }
    //         }, 3000);
    //     }, 2000);
    // };

    const handleClick = (type) => {
        setActionType(type); // 'skip' or 'save'
    };

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative py-3 rounded-xl">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    <InputWithLabelSub
                        name="approverName"
                        type="text"
                        placeholder="Enter approver name"
                        value={formData.approverName}
                        onChange={handleChange}
                    >
                        Approver Name
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
                        name="setDailyLimit"
                        type="number"
                        placeholder="Enter daily limit"
                        value={formData.setDailyLimit}
                        onChange={handleChange}
                    >
                        Set Daily Limit
                    </InputWithLabelSub>

                    <InputWithLabelSub
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                        Password
                    </InputWithLabelSub>
                </div>

                {/* {showSuccess && (
                    <div className="text-green-600 text-xl mt-4 text-center font-medium">
                        ✔️ Data saved successfully!
                    </div>
                )} */}

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end mt-6">
                    <button
                        type="submit"
                        onClick={() => handleClick("skip")}
                        disabled={!isFormValid || loading}
                        className={`text-base font-medium px-5 py-3 rounded-[10px] text-white flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid && !loading
                            ? "bg-purple hover:bg-purple/90 cursor-pointer"
                            : "bg-purple/65 cursor-not-allowed"
                            }`}
                    >
                        {loading && actionType === "skip" && <Icons icon="saving" />}
                        {loading && actionType === "skip" ? "Saving..." : "Skip For Now"}
                    </button>

                    <button
                        type="submit"
                        onClick={() => handleClick("save")}
                        disabled={!isFormValid || loading}
                        className={`text-base font-medium px-5 py-3 rounded-[10px] text-white flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid && !loading
                            ? "bg-purple hover:bg-purple/90 cursor-pointer"
                            : "bg-purple/65 cursor-not-allowed"
                            }`}
                    >
                        {loading && actionType === "save" && <Icons icon="saving" />}
                        {loading && actionType === "save" ? "Saving..." : "Save & Assign Merchant"}
                    </button>
                </div>
            </form>
            {/* <ApproverMerchantsList /> */}
            {/* <ApproverPopUp /> */}
        </div>
    );
};

export default AddNewApprover;
