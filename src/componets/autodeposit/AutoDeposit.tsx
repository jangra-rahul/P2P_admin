"use client";

import { useState } from "react";
import CtaButton from "../custom-ui/CtaButton";
import CtaDropDown from "../custom-ui/CtaDropDown";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaTable from "../custom-ui/CtaTable";

const approvers = [
  {
    name: "Niropay",
    merchant: "Rapidpay Solutions",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Inkatirl",
    currency: "PKR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Active",
  },
  {
    name: "Goopay",
    merchant: "QuickPay",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Senura",
    currency: "INR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Active",
  },
  {
    name: "Apppay",
    merchant: "FastPay Gateway",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Senura",
    currency: "INR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Inactive",
  },
  {
    name: "Viewpay",
    merchant: "EasyPay",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Senura",
    currency: "INR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Active",
  },
  {
    name: "Portpay",
    merchant: "SecurePay",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Inkatirl",
    currency: "PKR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Active",
  },
  {
    name: "Surepay",
    merchant: "FastPay Gateway",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Inkatirl",
    currency: "INR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Active",
  },
  {
    name: "Mejopay",
    merchant: "Rapidpay Solutions",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Inkatirl",
    currency: "PKR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Active",
  },
  {
    name: "Apppay",
    merchant: "EasyPay",
    amount: "5,000",
    credited: "5,000",
    entryBy: "Senura",
    currency: "INR",
    entryDate: "Mar 22, 2022, 13:00 PM",
    paymentDate: "Mar 23, 2022, 13:00 PM",
    status: "Active",
  },
];

const approverColumns = [
  "APPROVER NAME",
  "MERCHANT NAME",
  "AMOUNT",
  "CREDITED",
  "ENTRY BY",
  "CURRENCY",
  "ENTRY DATE",
  "PAYMENT DATE",
  "STATUS",
];

const AutoDeposit = () => {
  const [tempApproverFilter, setTempApproverFilter] = useState("");
  const [tempMerchantFilter, setTempMerchantFilter] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState("");
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempFromDate, setTempFromDate] = useState("");
  const [tempToDate, setTempToDate] = useState("");

  const [approverFilter, setApproverFilter] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loadClicked, setLoadClicked] = useState(false);

  const uniqueNames = [...new Set(approvers.map((m) => m.name))];
  const uniqueMerchants = [...new Set(approvers.map((m) => m.merchant))];
  const uniqueStatuses = [...new Set(approvers.map((m) => m.status))];
  const uniqueEntryDates = [...new Set(approvers.map((m) => m.entryDate))];

  const handleLoad = () => {
    setApproverFilter(tempApproverFilter);
    setMerchantFilter(tempMerchantFilter);
    setStatusFilter(tempStatusFilter);
    setFromDate(tempFromDate);
    setToDate(tempToDate);
    setLoadClicked(true);
    setSelectedMerchants([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setTempApproverFilter("");
    setTempMerchantFilter("");
    setTempStatusFilter("");
    setTempSearchTerm("");
    setTempFromDate("");
    setTempToDate("");
    setApproverFilter("");
    setMerchantFilter("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setSelectedMerchants([]);
    setLoadClicked(false);
    setCurrentPage(1);
  };

  const filteredMerchants = approvers
    .filter((m) => {
      const matchesApprover = !approverFilter || m.name === approverFilter;
      const matchesMerchant = !merchantFilter || m.merchant === merchantFilter;
      const matchesStatus = !statusFilter || m.status === statusFilter;
      const entry = new Date(m.entryDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      const inDateRange = (!from || entry >= from) && (!to || entry <= to);
      return matchesApprover && matchesMerchant && matchesStatus && inDateRange;
    })
    .filter((m) =>
      m.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMerchants = filteredMerchants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handleCheckboxChange = (name) => {
    setSelectedMerchants((prev) =>
      prev.includes(name)
        ? prev.filter((id) => id !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] overflow-clip lg:px-[22px] py-3 rounded-xl bg-white w-full relative">
      <div className="flex flex-wrap gap-y-2.5 md:gap-y-5 gap-5 items-center">
        <CtaDropDown
          data={uniqueEntryDates}
          value={tempFromDate}
          onChange={setTempFromDate}
          placeholder="From Date"
        />
        <CtaDropDown
          data={uniqueEntryDates}
          value={tempToDate}
          onChange={setTempToDate}
          placeholder="To Date"
        />
        <CtaDropDown
          data={uniqueNames}
          value={tempApproverFilter}
          onChange={setTempApproverFilter}
          placeholder="Approver Name"
        />
        {/* <CtaDropDown
          data={uniqueMerchants}
          value={tempMerchantFilter}
          onChange={setTempMerchantFilter}
          placeholder="Merchant Name"
        /> */}
        <CtaDropDown
          data={uniqueStatuses}
          value={tempStatusFilter}
          onChange={setTempStatusFilter}
          placeholder="Status"
          icon={"flag"}
        />
        <CtaButton
          left
          className={`${loadClicked ? "bg-purple text-white" : "bg-purple text-white"
            }`}
          onClick={handleLoad}
          main
        >
          Load
        </CtaButton>
        <CtaButton left main onClick={handleReset}>
          Reset
        </CtaButton>
      </div>

      <CtaSearch
        addLink="/"
        searchValue={tempSearchTerm}
        placeholder="Search by approver name, assigned merchant"
        onChange={(e) => setTempSearchTerm(e.target.value)}
        exportbutton
        icons={"exportcsv"}
      >
        Export CSV
      </CtaSearch>

      <CtaTable
        columns={approverColumns}
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
            setSelectedMerchants(currentMerchants.map((m) => m.name));
          }
        }}
        renderRow={(m, i) => (
          <tr key={i} className="border-t border-[#E4E6E8]">
            <td className="md:px-[15px] py-3 px-2">
              <input
                type="checkbox"
                checked={selectedMerchants.includes(m.name)}
                onChange={() => handleCheckboxChange(m.name)}
                className="border-[#959BA4] rounded-[5px] cursor-pointer"
              />
            </td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.name}</td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.merchant}</td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.amount}</td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.credited}</td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.entryBy}</td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.currency}</td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.entryDate}</td>
            <td className="text-sm text-nowrap text-[#4B5563] px-2.5">{m.paymentDate}</td>
            <td className="w-[100px] px-2.5 text-sm font-bold text-center">
              <span
                className={`inline-block w-full px-2 py-1 rounded text-xs font-bold ${m.status === "Active"
                  ? "bg-[#EDFFEA] text-[#165E3D]"
                  : "bg-[#FFEAEA] text-[#B83131]"
                  }`}
              >
                {m.status}
              </span>
            </td>
          </tr>
        )}
      />

      <CtaPagination
        currentPage={currentPage}
        totalItems={filteredMerchants.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AutoDeposit;
