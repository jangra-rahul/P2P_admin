"use client";

import { useEffect, useRef, useState } from "react";
import CtaButton from "../custom-ui/CtaButton";
import CtaDropDown from "../custom-ui/CtaDropDown";
import CtaPagination from "../custom-ui/CtaPagination";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaTable from "../custom-ui/CtaTable";
import Icons from "../common/Icons";
import UpdateBulkDesposit from "./UpdateBulkDesposit";

const banks = [
    {
        name: "RBI",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Disable",
    },
    {
        name: "SBI",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Disable",
    },
    {
        name: "PNB",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Enable",
    },
    {
        name: "UNION",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Disable",
    },
    {
        name: "AXIS",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Enable",
    },
    {
        name: "PATYM",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Disable",
    },
    {
        name: "KANRA",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Disable",
    },
    {
        name: "AXIS",
        fileType: "Excel",
        columns: ["Date", "Narration", "Amount", "Credit", "Debit", "Debit"],
        status: "Disable",
    },
];

const columns = [
    "BANK NAME",
    "FILE TYPE",
    "COLUMNS",
    { label: "ACTION", className: "text-end pe-10" },
];

const BulkListData = () => {
    const [tempBankFilter, setTempBankFilter] = useState("");
    const [tempFileTypeFilter, setTempFileTypeFilter] = useState("");
    const [tempStatusFilter, setTempStatusFilter] = useState("");
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const [bankFilter, setBankFilter] = useState("");
    const [fileTypeFilter, setFileTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loadClicked, setLoadClicked] = useState(false);
    const [popupBank, setPopupBank] = useState(null);
    const [updateBulkDespositData, setUpdateBulkDespositData] = useState(false);

    const bankDropdownRef = useRef(null);
    const fileTypeDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const uniqueBanks = [...new Set(banks.map((b) => b.name))];
    const uniqueFileTypes = [...new Set(banks.map((b) => b.fileType))];
    const uniqueStatuses = [...new Set(banks.map((b) => b.status))];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (bankDropdownRef.current && !bankDropdownRef.current.contains(e.target)) {
                // close dropdown logic here
            }
            if (fileTypeDropdownRef.current && !fileTypeDropdownRef.current.contains(e.target)) {
                // close dropdown logic here
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
                // close dropdown logic here
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLoad = () => {
        setBankFilter(tempBankFilter);
        setFileTypeFilter(tempFileTypeFilter);
        setStatusFilter(tempStatusFilter);
        setLoadClicked(true);
        setSelectedBanks([]);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setTempBankFilter("");
        setTempFileTypeFilter("");
        setTempStatusFilter("");
        setTempSearchTerm("");
        setBankFilter("");
        setFileTypeFilter("");
        setStatusFilter("");
        setSelectedBanks([]);
        setLoadClicked(false);
        setCurrentPage(1);
    };

    const filteredBanks = banks
        .filter((bank) => {
            const matchBank = bankFilter === "" || bank.name === bankFilter;
            const matchFile = fileTypeFilter === "" || bank.fileType === fileTypeFilter;
            const matchStatus = statusFilter === "" || bank.status === statusFilter;
            return matchBank && matchFile && matchStatus;
        })
        .filter((bank) =>
            bank.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
        );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBanks = filteredBanks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBanks.length / itemsPerPage);

    const handleCheckboxChange = (name) => {
        setSelectedBanks((prev) =>
            prev.includes(name) ? prev.filter((id) => id !== name) : [...prev, name]
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div >
            <div className="py-7 md:py-8 lg:py-10 flex flex-col gap-4 sm:flex-row w-full justify-between sm:items-center">
                <div>
                    <p className='text-lg md:text-xl text-black font-medium leading-100'>
                        Update Bulk Deposit Configuration
                    </p>
                    <p className='text-sm md:text-base font-normal text-black/70 leading-100 pt-1'>
                        Here you can upload statements for bulk deposit.
                    </p>
                </div>
                <button onClick={() => setUpdateBulkDespositData(true)} className='text-sm md:text-base py-2 cursor-pointer rounded-[10px] px-4 bg-purple flex items-center gap-5 text-white hover:opacity-85 max-w-max'>
                    Add New
                    <Icons icon={"puls"} />
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-y-2.5 md:gap-y-5 gap-5">
                <CtaDropDown
                    data={uniqueBanks}
                    value={tempBankFilter}
                    onChange={setTempBankFilter}
                    placeholder="Bank Name"
                    dropdownRef={bankDropdownRef}
                />
                <CtaDropDown
                    data={uniqueFileTypes}
                    value={tempFileTypeFilter}
                    onChange={setTempFileTypeFilter}
                    placeholder="File Type"
                    dropdownRef={fileTypeDropdownRef}
                />
                <CtaDropDown
                    data={uniqueStatuses}
                    value={tempStatusFilter}
                    onChange={setTempStatusFilter}
                    placeholder="All"
                    dropdownRef={statusDropdownRef}
                />
                <CtaButton
                    left
                    className={`${loadClicked ? "bg-purple text-white" : "bg-purple text-white"}`}
                    onClick={handleLoad}
                    main
                >
                    Load
                </CtaButton>
                <CtaButton left main onClick={handleReset}>Reset</CtaButton>
            </div>

            {/* Search */}
            <CtaSearch
                addLink="/"
                searchValue={tempSearchTerm}
                placeholder="Search by bank name"
                onChange={(e) => setTempSearchTerm(e.target.value)}
                exportbutton
                icons={"exportcsv"}
            >
                Export CSV
            </CtaSearch>

            {/* Table */}
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
                        setSelectedBanks(currentBanks.map((b) => b.name));
                    }
                }}
                renderRow={(b, i) => (
                    <tr key={i} className="border-t border-[#E4E6E8]">
                        <td className="md:px-[15px] py-3 px-2">
                            <input
                                type="checkbox"
                                checked={selectedBanks.includes(b.name)}
                                onChange={() => handleCheckboxChange(b.name)}
                                className="border-[#959BA4] rounded-[5px] cursor-pointer"
                            />
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{b.name}</td>
                        <td className="text-[#4B5563] text-sm font-normal text-nowrap px-2.5">{b.fileType}</td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            <div className="flex gap-10 md:gap-14 xl:gap-16">
                                {b.columns.map((col, index) => (
                                    <span key={index}>{col}</span>
                                ))}
                            </div>
                        </td>
                        <td className="text-end text-sm font-normal text-nowrap px-2.5 space-x-2">
                            <button className="text-sm text-[#4B5563] cursor-pointer underline">Edit</button>
                            <button
                                onClick={() => setPopupBank(b.name)}
                                className={`text-sm cursor-pointer underline ${popupBank === b.name ? "text-[#4B5563]/65" : "text-[#4B5563]"}`}
                            >
                                {popupBank === b.name ? "Enable" : "Disable"}
                            </button>
                        </td>
                    </tr>
                )}
            />

            <CtaPagination
                currentPage={currentPage}
                totalItems={filteredBanks.length}
                itemsPerPage={itemsPerPage}
                onPageChange={paginate}
            />

            {updateBulkDespositData && (
                <UpdateBulkDesposit updateBulkDespositData={updateBulkDespositData}
                    setUpdateBulkDespositData={setUpdateBulkDespositData}
                />
            )}
        </div>
    );
};

export default BulkListData;
