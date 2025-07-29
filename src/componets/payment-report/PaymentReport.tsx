"use client";

import { useState } from "react";
import CtaButton from "../custom-ui/CtaButton";
import CtaDropDown from "../custom-ui/CtaDropDown";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaTable from "../custom-ui/CtaTable";
import Icons from "../common/Icons";

const approvers = [
    {
        name: "Maria Review",
        merchant: "QuantumX",
        amount: "₹75 Lakh",
        credited: "₹75 Lakh",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Apr 15, 2022, 10:00 AM",
        paymentDate: "Apr 15, 2022, 10:00 AM",
        status: "Active",
    },
    {
        name: "Ethan Approver",
        merchant: "NebulaTech",
        amount: "₹50 Lakh",
        credited: "₹50 Lakh",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "May 10, 2022, 09:00 AM",
        paymentDate: "May 10, 2022, 09:00 AM",
        status: "Active",
    },
    {
        name: "Olivia Reviewer",
        merchant: "Starlight Innovations",
        amount: "₹2 Crore",
        credited: "₹2 Crore",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Jun 20, 2022, 14:00 PM",
        paymentDate: "Jun 20, 2022, 14:00 PM",
        status: "Active",
    },
    {
        name: "James Approver",
        merchant: "CometCore",
        amount: "₹1.5 Crore",
        credited: "₹1.5 Crore",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Jul 05, 2022, 11:00 AM",
        paymentDate: "Jul 05, 2022, 11:00 AM",
        status: "Active",
    },
    {
        name: "Sophia Reviewer",
        merchant: "Galactic Ventures",
        amount: "₹90 Lakh",
        credited: "₹90 Lakh",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Aug 12, 2022, 15:00 PM",
        paymentDate: "Aug 12, 2022, 15:00 PM",
        status: "Active",
    },
    {
        name: "Liam Approver",
        merchant: "AstroDynamics",
        amount: "₹30 Lakh",
        credited: "₹30 Lakh",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Sep 18, 2022, 16:00 PM",
        paymentDate: "Sep 18, 2022, 16:00 PM",
        status: "Active",
    },
    {
        name: "Ava Reviewer",
        merchant: "Lunar Holdings",
        amount: "₹1.2 Crore",
        credited: "₹1.2 Crore",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Oct 25, 2022, 12:00 PM",
        paymentDate: "Oct 25, 2022, 12:00 PM",
        status: "Active",
    },
    {
        name: "Noah Approver",
        merchant: "SolarWave",
        amount: "₹65 Lakh",
        credited: "₹65 Lakh",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Nov 30, 2022, 09:00 AM",
        paymentDate: "Nov 30, 2022, 09:00 AM",
        status: "Active",
    },
    {
        name: "Emma Reviewer",
        merchant: "Orion Projects",
        amount: "₹1.2 Crore",
        credited: "₹1.2 Crore",
        entryBy: "Admin",
        currency: "INR",
        entryDate: "Dec 14, 2022, 08:00 AM",
        paymentDate: "Dec 14, 2022, 08:00 AM",
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

const PaymentReport = () => {
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

    const handleCheckboxChange = (name) => {
        setSelectedMerchants((prev) =>
            prev.includes(name)
                ? prev?.filter((id) => id !== name)
                : [...prev, name]
        );
    };

    return (
        <div className="max-w-[1100px] 2xl:mx-auto py-3 rounded-xl min-[1441px]:max-w-[1200px] overflow-clip lg:px-[22px] bg-white w-full relative">

            <div className="max-w-[888px] grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-7 lg:grid-cols-3 mb-7 md:mb-8 lg:mb-10">
                <div className="bg-white rounded-[10px] flex gap-2.5 py-3 px-4">
                    <Icons icon={"totaldeposit"} />
                    <div className="">
                        <p className="text-[#425166] font-bold text-[11px]">Total Deposits</p>
                        <p className="text-base md:text-lg font-semibold flex items-center gap-2.5 leading-120">₹50,435.362
                            <span className="text-[#24A959] text-xs font-semibold flex items-center gap-1">
                                <Icons icon={"greenarrow"} />
                                {""} 1.7%
                            </span>
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-[10px] flex gap-2.5 py-3 px-4">
                    <Icons icon={"totalearning"} />
                    <div className="">
                        <p className="text-[#425166] font-bold text-[11px]">Total Deposits</p>
                        <p className="text-base md:text-lg font-semibold flex items-center gap-2.5 leading-120">₹20,0000
                            <span className="text-[#24A959] text-xs font-semibold flex items-center gap-1">
                                <Icons icon={"greenarrow"} />
                                {""} 1.7%
                            </span>
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-[10px] flex gap-2.5 py-3 px-4">
                    <Icons icon={"totaapproverl"} />
                    <div className="">
                        <p className="text-[#425166] font-bold text-[11px]">Total Deposits</p>
                        <p className="text-base md:text-lg font-semibold flex items-center gap-2.5 leading-120">₹30,435.362
                            <span className="text-[#24A959] text-xs font-semibold flex items-center gap-1">
                                <Icons icon={"greenarrow"} />
                                {""} 1.7%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-y-4 md:gap-y-5 gap-5 items-center">
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
                <CtaDropDown
                    data={uniqueMerchants}
                    value={tempMerchantFilter}
                    onChange={setTempMerchantFilter}
                    placeholder="Merchant Name"
                />
                <CtaButton
                    left
                    className={`${loadClicked ? "bg-purple text-white" : "bg-purple text-white"}`}
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
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.name}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.merchant}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.amount}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.credited}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.entryBy}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.currency}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.entryDate}</td>
                        <td className="text-sm text-nowrap text-[#4B5563] px-4">{m.paymentDate}</td>
                        <td className="w-[100px] px-4 text-sm font-bold text-center">
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

export default PaymentReport;
