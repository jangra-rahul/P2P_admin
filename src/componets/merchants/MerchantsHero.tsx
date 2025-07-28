"use client";

import React, { useState, useEffect } from "react";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaTable from "../custom-ui/CtaTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { changeMerchantStatusRequest, editMerchantRequest, getMerchantsRequest } from "@/redux/slice/merchantSlice";
import EditMerchantModal from "./EditMerchantModal";


const MerchantsHero = () => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
const [editMerchant, setEditMerchant] = useState<any>(null);


  const dispatch = useDispatch();
  const { merchants } :any = useSelector(
    (state: RootState) => state.merchant
  );
  const merchantsData:any = merchants?.data || [];
  const pagenationData:any = merchants?.pagination || [];

 
  
   useEffect(() => {
    dispatch(getMerchantsRequest({ search: tempSearchTerm, page: currentPage, limit: 10 }));
  }, [dispatch, tempSearchTerm, currentPage]);
  
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };
  

  const filteredMerchants = merchantsData
    ?.filter((merchant) => {
      const matchesName = nameFilter === "" || merchant?.merchantName === nameFilter;
      const matchesStatus =
        statusFilter === "" || merchant?.status === statusFilter;
      return matchesName && matchesStatus;
    })
    .filter((merchant) =>
      merchant?.merchantName?.toLowerCase().includes(tempSearchTerm.toLowerCase())
    );

  // Get current merchants
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentMerchants = merchantsData;
const totalPages = Math.ceil((pagenationData.totalCount || 0) / itemsPerPage);


  const handleCheckboxChange = (email) => {
    setSelectedMerchants((prev) =>
      prev.includes(email)
        ? prev.filter((id) => id !== email)
        : [...prev, email]
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

    const handleStatusToggle = (merchant) => {
    const normalizedStatus = merchant.status?.toLowerCase();
  
    const newStatus = normalizedStatus === "active" ? "inactive" : "active";
  
  
    dispatch(
      changeMerchantStatusRequest({
        id: merchant._id, // or merchant.id depending on your data
        status: newStatus,
      })
    );
  
    // Optional: reload list after a delay or use success saga to auto-refresh
    setTimeout(() => {
      dispatch(getMerchantsRequest({ search: tempSearchTerm, page: currentPage, limit: 10 }));
    }, 500);
  };

  return (
    <div className="max-w-[1100px] 2xl:mx-auto pt-2 min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative py-3 rounded-xl">
    
      <CtaSearch
        addLink="/dashboard/merchants/add-new-merchant"
        searchValue={tempSearchTerm}
        placeholder={"Search by merchant name"}
        onChange={(e) => setTempSearchTerm(e.target.value)}
      >
        Add New Merchant
      </CtaSearch>
      <div className="overflow-hidden max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px]">

        <CtaTable
          columns={[
            "MERCHANT NAME",
            // "TOTAL DEPOSIT",
            "DAILY LIMIT",
            "EMAIL",
            "STATUS",
            "CREATED ON",
            "ACTION",
          ]}
          data={currentMerchants}
          showCheckbox
          allChecked={
            currentMerchants.length > 0 &&
            selectedMerchants.length === currentMerchants.length
          }
          onCheckAll={() => {
            if (selectedMerchants.length === currentMerchants.length) {
              setSelectedMerchants([]);
            } else {
              setSelectedMerchants(currentMerchants.map((m) => m.email));
            }
          }}
          
          renderRow={(m, i) => (

            <tr key={i} className="border-t border-[#E4E6E8]">
              <td className="md:px-[15px] py-3 lg:py-[14px] px-2">
                <input
                  type="checkbox"
                  checked={selectedMerchants.includes(m.email)}
                  onChange={() => handleCheckboxChange(m.email)}
                  className="border-[#959BA4] rounded-[5px] cursor-pointer"
                />
              </td>
              <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                {m.merchantName}
              </td>
              {/* <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                {m.deposit}
              </td> */}
              <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                {m.setDailyLimit}
              </td>
              <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                {m.email}
              </td>
              <td className="w-[100px] px-2.5 text-sm font-bold text-center">
                <span
                  className={`inline-block w-full px-2 py-1 rounded text-xs font-bold ${
                    m.status === "active"
                      ? "bg-[#EDFFEA] text-[#165E3D]"
                      : "bg-[#FFEAEA] text-[#B83131]"
                  }`}
                >
                  {m.status}
                </span>
              </td>
              <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
  {new Date(m.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</td>
              <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5 space-x-2">
                <button className="text-sm cursor-pointer underline">
                  View
                </button>
                <button onClick={() => setEditMerchant(m)} className="text-sm cursor-pointer underline">
                  Edit
                </button>
                 <button onClick={() => handleStatusToggle(m)}
                // onClick={() => setPopupApprover(m.approverName)}
                className="text-sm cursor-pointer underline "
              >
{m.status?.toLowerCase() === "active" ? "Disable" : "Enable"}
              </button>
              </td>
            </tr>
          )}
        />
      </div>

      <CtaPagination
  currentPage={pagenationData.currentPage || 1}
  totalItems={pagenationData.totalCount || 0}
  itemsPerPage={pagenationData.limit || 10}
  onPageChange={(page) => setCurrentPage(page)}
/>


{editMerchant && (
  <EditMerchantModal
    merchant={editMerchant}
    onClose={() => setEditMerchant(null)}
    onSave={(updatedData) => {
      dispatch(editMerchantRequest({ id: editMerchant._id, data: updatedData }));
      setEditMerchant(null);
    }}
  />
)}

    </div>
  );
};

export default MerchantsHero;
