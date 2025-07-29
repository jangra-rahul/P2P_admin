"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getApproverRequest,
  editApproverRequest,
} from "@/redux/slice/approverSlice";
import InputWithLabelSub from "../../componets/custom-ui/InputWithLabelSub";
// import Icons from "../../componets/common/Icons";
import ApproverMerchantsList from "./ApproverMerchantsList";
import { RootState } from "@/redux/store/store";
import { getSingleApproverRequest } from "@/redux/slice/singleApproverSlice";
import { Spinner } from "react-bootstrap";
import Icons from "../common/Icons";

const EditApproverPage = () => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const router = useRouter()
const { data }: any = useSelector(
    (state: RootState) => state.singleApprover
  );
//   const [approver, setApprover] = useState(null);
  const [formData, setFormData] = useState({
    approverName: "",
    email: "",
    setDailyLimit: "",
    password: "",
  });


  useEffect(() => {
  if (id) {
    dispatch(getSingleApproverRequest({ id }));
  }
}, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const dataToSend = { ...formData };

    if (!dataToSend.password?.trim()) {
      delete dataToSend.password;
    }

    dispatch(editApproverRequest({ id, data: dataToSend }));
    // router.push("/dashboard/approvers");

    setTimeout(() => {
      dispatch(getApproverRequest());
    }, 500);
  };

  useEffect(() => {
  if (data) {
    setFormData({
      approverName: data.approverName || "",
      email: data.email || "",
      setDailyLimit: data.setDailyLimit || "",
      password: "",
    });
  }
}, [data]);


if (!data) {
  return <div className="p-5 "><Spinner /></div>;
}

  return (
    <div className="min-h-screen bg-white p-8">
      {/* <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 relative"> */}
<div className="flex items-center gap-3 mb-3">
          <button
          onClick={() => router.push("/dashboard/approvers")}
          className="bg-purple py-2 rounded-[10px] cursor-pointer text-white px-5 "
        >
       Back
        </button>

      <h2 className="text-2xl font-bold">Edit Approver</h2>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          >
            Password
          </InputWithLabelSub>
          {formData.password && formData.password.length < 6 && (
            <p className="text-xs text-red-500 mt-2 ps-2">
              Password must be at least 6 digits
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={formData.password && formData.password.length < 6}
          className="rounded-[10px] hover:opacity-85 duration-300 text-center bg-purple text-white cursor-pointer text-sm md:text-base leading-100 py-3 px-10"
        >
          Save
        </button>
      </div>

      <ApproverMerchantsList approverId={id} />
    </div>
    // </div>
  );
};

export default EditApproverPage;
