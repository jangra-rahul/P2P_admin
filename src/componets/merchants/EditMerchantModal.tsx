"use client"
import React, { useState } from "react";
import InputWithLabelSub from "../custom-ui/InputWithLabelSub";
import Icons from "../common/Icons";
import { useDispatch } from "react-redux";
import { getMerchantsRequest } from "@/redux/slice/merchantSlice"; 

const EditMerchantModal = ({ merchant, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    merchantName: merchant?.merchantName || "",
    email: merchant?.email || "",
    platformName: merchant?.platformName || "",
    setDailyLimit: merchant?.setDailyLimit || "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const dataToSend = { ...formData };
    if (!dataToSend.password?.trim()) {
      delete dataToSend.password;
    }

    onSave(dataToSend);

    setTimeout(() => {
      dispatch(getMerchantsRequest());
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full relative max-w-xl">
        <div onClick={onClose} className="absolute cursor-pointer -top-4 -right-4">
          <Icons icon={"whitecross"} />
        </div>
        <h2 className="text-xl font-bold mb-4">Edit Merchant</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
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
            placeholder="Enter email"
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
            placeholder="Enter password (optional)"
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

        <div className="mt-6 flex justify-end gap-3">
          <button disabled={formData.password && formData.password.length < 6}

            onClick={handleSave}
            className="rounded-[10px] hover:opacity-85 duration-300 text-center mt-[30px] bg-purple text-white cursor-pointer text-sm md:text-base leading-100 py-3 px-10"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMerchantModal;
