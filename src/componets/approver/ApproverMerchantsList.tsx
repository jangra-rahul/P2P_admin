"use client";

import React, { useEffect, useState } from "react";
import CtaTable from "../custom-ui/CtaTable";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaButton from "../custom-ui/CtaButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getUnassignedMerchantsRequest } from "@/redux/slice/merchantSlice";
import { assignMerchantRequest } from "@/redux/slice/assignMerchantSlice";



const  ApproverMerchantsList = ({
  approverId,
  disabled = false,
}: {
  approverId: string;
  disabled?: boolean;
})  => {
    const [selectedMerchants, setSelectedMerchants] = useState([]);
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    
  const dispatch = useDispatch();
  const { merchants } :any = useSelector(
    (state: RootState) => state.merchant
  );
  const merchantsData:any = merchants || [];

  
   useEffect(() => {
    dispatch(getUnassignedMerchantsRequest({ search: tempSearchTerm }));
  }, [dispatch, tempSearchTerm]);

   const handleCheckboxChange = (id: string) => {
  setSelectedMerchants((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );
};
    const filteredMerchants = merchantsData?.filter((merchant) =>
        merchant?.merchantName?.toLowerCase().includes(tempSearchTerm?.toLowerCase())
    );

    const handleSaveMerchants = () => {
  if (!approverId || selectedMerchants.length === 0) return;

  dispatch(assignMerchantRequest({
    approverId,
    merchantIds: selectedMerchants,
  }));
};

    return (
        <>
            <CtaSearch
                addLink="/dashboard/merchants/add-new-merchant"
                searchValue={tempSearchTerm}
                placeholder={"Search by merchant name"}
                onChange={(e) => setTempSearchTerm(e.target.value)}
                list=" Merchants List"
            >
                Add New Merchant
            </CtaSearch>

            <CtaTable
                columns={[
                    "MERCHANT NAME",
                    "PLATFORM NAME",
                    "EMAIL",
                    "STATUS",
                    "ACTION",
                ]}
                data={filteredMerchants}
                showCheckbox
                allChecked={
                    filteredMerchants.length > 0 &&
                    selectedMerchants.length === filteredMerchants.length
                }
               onCheckAll={() => {
  if (selectedMerchants.length === filteredMerchants.length) {
    setSelectedMerchants([]);
  } else {
    setSelectedMerchants(filteredMerchants.map((m) => m._id));
  }
}}
                renderRow={(m, i) => (
                    <tr key={i} className="border-t border-[#E4E6E8]">
                        <td className="md:px-[15px] py-3 px-2">
                           <input
  type="checkbox"
  checked={selectedMerchants.includes(m._id)}
  onChange={() => handleCheckboxChange(m._id)}
  className="border-[#959BA4] rounded-[5px] cursor-pointer"
/>
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            {m.merchantName}
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            {m.platformName}
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            {m.email}
                        </td>
                        <td className="w-[100px] px-3 md:pe-10 lg:pe-20 text-sm font-bold text-center">
                            <span className="inline-block w-full px-2 py-1 rounded text-xs font-bold bg-[#EDFFEA] text-[#165E3D]">
                                {m.status}
                            </span>
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            <button className="text-sm cursor-pointer underline">View</button>
                        </td>
                    </tr>
                )}
            />
            <div className="flex justify-end my-7 md:my-8">
                <CtaButton disabled={disabled}
 onClick={handleSaveMerchants} left main  className={`py-3 px-5 ${
    disabled
      ? 'bg-purple/60 text-white cursor-not-allowed'
      : 'bg-purple text-white'
  }`}>Save</CtaButton>
            </div>
        </>
    );
};

export default ApproverMerchantsList;
