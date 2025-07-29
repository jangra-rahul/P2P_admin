"use client";

import { useEffect, useState } from "react";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaTable from "../custom-ui/CtaTable";
import ApproverPopUp from "./ApproverPopUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  changeApproverStatusRequest,
  editApproverRequest,
  getApproverRequest,
} from "@/redux/slice/approverSlice";
// import EditApproverPopUp from "./EditApproverModal";
import { useRouter } from "next/navigation";

const approverColumns = [
  "APPROVER NAME",
  "ASSIGNED",
  "CREATED ON",
  "STATUS",
  { label: "ACTION", className: "text-end pe-10" },
];

const ApproverHero = () => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupApprover, setPopupApprover] = useState(null);
const router = useRouter();

//   console.log("popupApprover",popupApprover)

  const dispatch = useDispatch();
  const { approvers }: any = useSelector((state: RootState) => state.approver);

//   const approversData = approvers?.data || [];
//   const pagenationData = approvers?.pagination || {};

//   console.log(approversData);

  useEffect(() => {
    dispatch(
      getApproverRequest({
        search: tempSearchTerm,
        page: currentPage,
        limit: 10,
      })
    );
  }, [dispatch, tempSearchTerm, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const currentMerchants = approvers?.data||[];

  const handleCheckboxChange = (name) => {
    setSelectedMerchants((prev) =>
      prev.includes(name) ? prev?.filter((id) => id !== name) : [...prev, name]
    );
  };

  const handleStatusToggle = (approver) => {
    const normalizedStatus = approver?.status?.toLowerCase();

    const newStatus = normalizedStatus === "active" ? "inactive" : "active";

    dispatch(
      changeApproverStatusRequest({
        id: approver._id,
        status: newStatus,
      })
    );

    setTimeout(() => {
      dispatch(
        getApproverRequest({
          search: tempSearchTerm,
          page: currentPage,
          limit: 10,
        })
      );
    }, 500);
  };


  

  return (
    <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative py-3 rounded-xl">
      <CtaSearch
        addLink="/dashboard/approvers/add-new-approvers"
        searchValue={tempSearchTerm}
        placeholder={"Search by approver name, assigned merchant"}
        onChange={handleSearchChange}
      >
        Add New Approver
      </CtaSearch>
      <CtaTable
        columns={approverColumns}
        data={currentMerchants}
        showCheckbox
        allChecked={
          currentMerchants.length > 0 &&
          selectedMerchants?.length === currentMerchants?.length
        }
        onCheckAll={() => {
          if (selectedMerchants?.length === currentMerchants?.length) {
            setSelectedMerchants([]);
          } else {
            setSelectedMerchants(currentMerchants?.map((m) => m.approverName));
          }
        }}
        renderRow={(m, i) => (
          <tr key={i} className="border-t border-[#E4E6E8]">
            <td className="md:px-[15px] py-3 lg:py-[14px] px-2">
              <input
                type="checkbox"
                checked={selectedMerchants?.includes(m.approverName)}
                onChange={() => handleCheckboxChange(m.approverName)}
                className="border-[#959BA4] rounded-[5px] cursor-pointer"
              />
            </td>
            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
              {m.approverName || "--"}
            </td>
            <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
              {/* {m.assigned} 👁️ View */}
              <button
                onClick={() => setPopupApprover(m)}
                className={`text-sm cursor-pointer ${
                  popupApprover === m?.approverName
                    ? "text-[#4B5563]/65"
                    : "text-[#4B5563]"
                }`}
              >
                {popupApprover === m?.assigned
                  ? "👁️ View"
                  : `${m?.assignedMerchantCount} 👁️ View`}
              </button>
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
            <td className="text-end text-sm font-normal text-nowrap px-2.5 space-x-2">
              <button
                // onClick={() => setEditApprover(m)} 
                onClick={() => router.push(`/dashboard/approvers/edit-approver/${m._id}`)}

                className="text-sm text-[#4B5563] cursor-pointer underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleStatusToggle(m)}
                // onClick={() => setPopupApprover(m.approverName)}
                className={`text-sm cursor-pointer underline ${
                  popupApprover === m.approverName
                    ? "text-[#4B5563]/65"
                    : "text-[#4B5563]"
                }`}
              >
                {m.status?.toLowerCase() === "active" ? "Disable" : "Enable"}
              </button>
            </td>
          </tr>
        )}
      />
      <CtaPagination
        currentPage={approvers?.pagination?.currentPage || 1 }
        totalItems={approvers?.pagination?.totalCount || 0 }
        itemsPerPage={approvers?.pagination?.limit || 10 }
        onPageChange={(page) => setCurrentPage(page)}
      />
      {popupApprover ? (
        <ApproverPopUp
          popupApprover={popupApprover}
          setPopupApprover={setPopupApprover}
        />
      ) : (
        ""
      )}
      {/* {editApprover && (
        <EditApproverPopUp
          approver={editApprover}
          onSave={(data) => {
            dispatch(editApproverRequest({ id: editApprover._id, data }));
            setEditApprover(null); // close modal
          }}
          onClose={() => setEditApprover(null)}
        />
      )} */}
    </div>
  );
};

export default ApproverHero;
