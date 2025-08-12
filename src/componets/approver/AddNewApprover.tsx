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
import ApproverMerchantsList from './ApproverMerchantsList';

const AddNewApprover = () => {
    const router = useRouter();
        const { loading, success,newApproverId } = useSelector((state:RootState) => state.approver);
   const [showMerchantAssign, setShowMerchantAssign] = useState<any>(false);
const [approverId, setApproverId] = useState<any>("");
const dispatch = useDispatch();
    const [formData, setFormData] = useState<any>({
        approverName: '',
        email: '',
        setDailyLimit: '',
        password: '',
    });

     
    const [actionType, setActionType] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

   const isFormValid =
  Object.values(formData).every((value: any) => value.trim() !== "");

 const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid || loading) return;
        dispatch(addApproverRequest(formData));
    };

    // useEffect(() => {
    //     if (success) {
    //         // Redirect after 3 sec
    //         const timer = setTimeout(() => {
    //             dispatch(resetAddApprover());
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [success, dispatch, router]);

    useEffect(() => {
  if (success) {
    if (actionType === "skip") {
      router.push("/dashboard/approvers");
    } else if (actionType === "save"&&newApproverId ) {
      setApproverId(newApproverId);
      setShowMerchantAssign(true);
    }

    dispatch(resetAddApprover());
  }
}, [success, actionType, dispatch, router,newApproverId]);

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

                   <div>
                     <InputWithLabelSub
                        name="password"
                        type="password"
                        placeholder="Enter 6 digit password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                        Password
                    </InputWithLabelSub>
                   {formData.password && formData.password.length < 6 && (
  <p className="text-xs text-red-500 mt-2 ps-2">Password must be at least 6 digits</p>
)}
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end mt-6">
                    <button
                        type="submit"
                        onClick={() => handleClick("skip")}
                        disabled={!isFormValid||formData.password.length < 6 || loading}
                        className={`text-base font-medium px-5 py-3 rounded-[10px] text-white flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid && formData.password.length >= 6 && !loading
            ? 'bg-purple hover:bg-purple/90 cursor-pointer'
            : 'bg-purple/65 cursor-not-allowed'
                            }`}
                    >
                        {loading && actionType === "skip" && <Icons icon="saving" />}
                        {loading && actionType === "skip" ? "Saving..." : "Skip For Now"}
                    </button>

                    <button
                        type="submit"
                        onClick={() => handleClick("save")}
                        disabled={!isFormValid||formData.password.length < 6 || loading}
                        className={`text-base font-medium px-5 py-3 rounded-[10px] text-white flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid && formData.password.length >= 6 && !loading
            ? 'bg-purple hover:bg-purple/90 cursor-pointer'
            : 'bg-purple/65 cursor-not-allowed'
                            }`}
                    >
                        {loading && actionType === "save" && <Icons icon="saving" />}
                        {loading && actionType === "save" ? "Saving..." : "Save & Assign Merchant"}
                    </button>
                </div>
            </form>

           {/* {showMerchantAssign && approverId && ( */}
  <ApproverMerchantsList approverId={approverId} disabled={!success} />
{/* )} */}
        </div>
    );
};

export default AddNewApprover;
