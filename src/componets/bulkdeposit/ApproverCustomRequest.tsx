"use client";

import { useState } from "react";
import CtaTable from "../custom-ui/CtaTable";
import CtaPagination from "../custom-ui/CtaPagination";

const banks = [
    {
        approverName: "Raj Approver",
        bankName: "RBI",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Sita Verifier",
        bankName: "SBI",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Arjun Inspector",
        bankName: "PNB",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Arjun Inspector",
        bankName: "PNB",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Maya Reviewer",
        bankName: "UNION",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Anya Checker",
        bankName: "AXIS",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Vikram Moderator",
        bankName: "PATYM",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Priya Evaluator",
        bankName: "KANRA",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
    {
        approverName: "Anya Checker",
        bankName: "AXIS",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit"],
    },
];

const columns = [
    "APPROVER NAME",
    "BANK NAME",
    "FILE TYPE",
    "COLUMNS",
    { label: "ACTION", className: "text-end pe-10" },
];

const ApproverCustomRequest = () => {
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBanks = banks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(banks.length / itemsPerPage);

    const handleCheckboxChange = (name) => {
        setSelectedBanks((prev) =>
            prev.includes(name)
                ? prev.filter((id) => id !== name)
                : [...prev, name]
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="">
            <div className="py-7 md:py-8 lg:py-10">
                <p className="text-lg md:text-xl text-black font-medium leading-100">
                    Approver Custom Request
                </p>
                <p className="text-sm md:text-base font-normal text-black/70 leading-100 pt-1">
                    Here you can Accept or decline Approver custom request
                </p>
            </div>

            <CtaTable
                columns={columns}
                data={currentBanks}
                showCheckbox
                allChecked={
                    currentBanks.length > 0 &&
                    selectedBanks.length === currentBanks.length
                }
                onCheckAll={() => {
                    if (selectedBanks.length === currentBanks.length) {
                        setSelectedBanks([]);
                    } else {
                        setSelectedBanks(currentBanks.map((b) => b.approverName));
                    }
                }}
                renderRow={(b, i) => (
                    <tr key={i} className="border-t border-[#E4E6E8]">
                        <td className="md:px-[15px] py-3 px-2">
                            <input
                                type="checkbox"
                                checked={selectedBanks.includes(b.approverName)}
                                onChange={() => handleCheckboxChange(b.approverName)}
                                className="border-[#959BA4] rounded-[5px] cursor-pointer"
                            />
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                            {b.approverName}
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                            {b.bankName}
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">
                            {b.fileType}
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            <div className="flex gap-10 md:gap-14 xl:gap-16">
                                {b.columns.map((col, index) => (
                                    <span key={index}>{col}</span>
                                ))}
                            </div>
                        </td>
                        <td className="text-end text-sm font-normal text-nowrap px-2.5 space-x-2">
                            <button className="text-sm text-[#4B5563] cursor-pointer underline">
                                Accept
                            </button>
                            <button className="text-sm text-[#4B5563] cursor-pointer underline">
                                Decline
                            </button>
                        </td>
                    </tr>
                )}
            />

            <CtaPagination
                currentPage={currentPage}
                totalItems={banks.length}
                itemsPerPage={itemsPerPage}
                onPageChange={paginate}
            />
        </div>
    );
};

export default ApproverCustomRequest;
