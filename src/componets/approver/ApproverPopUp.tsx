import React, { useEffect, useState } from "react";
import Icons from "../common/Icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getAssignedMerchantsListRequest } from "@/redux/slice/merchantSlice";
import { Spinner } from "react-bootstrap";
import { toggleModelRequest, unAssignMerchantRequest } from "@/redux/slice/assignMerchantSlice";
import { getApproverRequest } from "@/redux/slice/approverSlice";
import { toastUtil } from "@/utils/toastUtil";

type Props = {
  setPopupApprover: (val: any) => void;
  popupApprover: any;
};

const ApproverPopUp: React.FC<Props> = ({
  setPopupApprover,
  popupApprover,
}) => {
  const dispatch = useDispatch();
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [visibleMerchants, setVisibleMerchants] = useState<any[]>([]);


  const { assignedMerchants, loading }: any = useSelector(
    (state: RootState) => state.merchant
  );
  const {model }: any = useSelector(
    (state: RootState) => state.assignMerchant
  );
//   const merchantsData: any = assignedMerchants?.data || [];

//   console.log(merchantsData);

  useEffect(() => {
    if (popupApprover?._id) {
      dispatch(
        getAssignedMerchantsListRequest({ approverId: popupApprover._id })
      );
    }
  }, [dispatch, popupApprover]);

useEffect(() => {
  setVisibleMerchants(Array.isArray(assignedMerchants?.data) ? assignedMerchants?.data : []);
}, [assignedMerchants?.data]);


  const handleUnassignClick = (merchantId: string) => {
    setSelectedMerchants(
      (prev) =>
        prev.includes(merchantId)
          ? prev?.filter((id) => id !== merchantId) // toggle off
          : [...prev, merchantId] // toggle on
    );
    setVisibleMerchants((prev) => prev?.filter((m) => m.merchantId !== merchantId));

  };

  const handleSaveMerchants = () => {
      if (selectedMerchants.length === 0) {
    toastUtil.error("Please select at least one merchant to unassign.");
    return;
  }
    dispatch(
      unAssignMerchantRequest({
        approverId: popupApprover?._id,
        merchantIds: selectedMerchants,
      })
    );
  };


    useEffect(() => {
    if (model) {
       setPopupApprover(null)
       dispatch(toggleModelRequest(false));
       dispatch(getApproverRequest());
    }
  }, [model, dispatch]);


  return (
    <div
      className={`${
        popupApprover
          ? "scale-100 pointer-events-auto"
          : "scale-0 pointer-events-none"
      } duration-300 fixed top-0 left-0 bg-black/40 w-full h-full flex justify-center items-center`}
    >
      <div className="bg-white rounded-[10px] p-4 md:p-[30px] pe-3 max-w-[610px] w-[90%] relative ">
        <div
          onClick={() => setPopupApprover(null)}
          className="absolute cursor-pointer -top-4 -right-4"
        >
          <Icons icon={"whitecross"} />
        </div>
        <div className="max-h-[80vh] pe-[18px] overflow-auto">
          <div className="flex justify-between">
            <div className="">
              <p className="text-sm font-semibold leading-140 text-[#374151] pb-1 uppercase">
                Approver Name
              </p>
              <p className="text-sm font-normal text-[#4B5563]">
                {popupApprover?.approverName || "--"}
              </p>
            </div>
            <div className="">
              <p className="text-sm font-semibold leading-140 text-[#374151] pb-1 uppercase">
                email
              </p>
              <p className="text-sm font-normal text-[#4B5563]">
                {popupApprover?.email || "--"}
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 mb-3 justify-end py-4 lg:py-5 border-dotted border-b-[0.5px] border-black/40">
         
          </div>
         <p className="py-5 text-sm font-semibold text-[#374151] uppercase">
            Assigned Merchant(s) - {visibleMerchants?.length || 0}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4 sm:gap-5">
           {Array.isArray(visibleMerchants) && visibleMerchants.length > 0 ? (
  visibleMerchants.map((merchant: any, index: number) => (
    <div
      key={merchant?.merchantId ?? index}
      className="p-2.5 flex gap-1 items-center justify-between rounded-[10px] bg-[#EDEEEF]"
    >
      <p className="text-[#4B5563] text-sm md:text-base">
        {index + 1}. {merchant?.merchantName}
      </p>
      <span
        onClick={() => handleUnassignClick(merchant?.merchantId)}
        className="cursor-pointer"
      >
        <Icons icon="redcross" />
      </span>
    </div>
  ))
) : loading ? (
  <div className="col-span-full">
    <Spinner />
  </div>
) : (
  <p className="text-sm text-gray-500 col-span-full">No data found</p>
)}
          </div>
        <div className="flex justify-end">
              <button
            onClick={handleSaveMerchants}
            disabled={selectedMerchants.length === 0}
            className={`rounded-[10px] mt-[30px] py-2 px-8 text-sm md:text-base duration-300 text-white text-center ${
              selectedMerchants.length === 0
                ? "bg-purple/50 cursor-not-allowed"
                : "bg-purple hover:opacity-85 cursor-pointer"
            }`}
          >
            Save
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ApproverPopUp;
