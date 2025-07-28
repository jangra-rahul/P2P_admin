import React, { useState, useEffect } from "react";
import InputWithLabelSub from "../custom-ui/InputWithLabelSub";
import Icons from "../common/Icons";
import { getApproverRequest } from "@/redux/slice/approverSlice";
import { useDispatch } from "react-redux";

const EditApproverModal = ({ approver, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    approverName: approver?.approverName || "",
    email: approver?.email || "",
    setDailyLimit: approver?.setDailyLimit || "",
    password: approver?.password || "",
  });

  const [errors, setErrors] = useState<any>({});
    const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error
  };

  // Validate all fields
//   const validate = () => {
//     const newErrors:any = {};
//     if (!formData.approverName.trim()) newErrors.approverName = "Required";
//     if (!formData.email.trim()) newErrors.email = "Required";
//     if (!formData.setDailyLimit.toString().trim()) newErrors.setDailyLimit = "Required";
//     if (!formData.password.trim()) newErrors.password = "Required";
//     return newErrors;
//   };

 const handleSave = () => {
  const dataToSend = { ...formData };

  // Remove password if it's empty
  if (!dataToSend.password?.trim()) {
    delete dataToSend.password;
  }

  onSave(dataToSend);

  // Refresh list
  setTimeout(() => {
    dispatch(getApproverRequest());
  }, 500);
};
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full relative max-w-xl">
        <div onClick={onClose} className="absolute cursor-pointer -top-4 -right-4">
          <Icons icon={"whitecross"} />
        </div>
        <h2 className="text-xl font-bold mb-4">Edit Approver</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          <div>
            <InputWithLabelSub
              name="approverName"
              type="text"
              placeholder="Enter approver name"
              value={formData.approverName}
              onChange={handleChange}
            >
              Approver Name
            </InputWithLabelSub>
           
          </div>

          <div>
            <InputWithLabelSub
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            >
              Email
            </InputWithLabelSub>
            
          </div>

          <div>
            <InputWithLabelSub
              name="setDailyLimit"
              type="number"
              placeholder="Enter daily limit"
              value={formData.setDailyLimit}
              onChange={handleChange}
            >
              Set Daily Limit
            </InputWithLabelSub>
           
          </div>

          <div>
            <InputWithLabelSub
              name="password"
              type="password"
              placeholder="Enter password"
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
            className={`rounded-[10px] hover:opacity-85 duration-300 text-center mt-[30px] bg-purple text-white
            cursor-pointer text-sm md:text-base leading-100 py-3 px-10`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditApproverModal;
