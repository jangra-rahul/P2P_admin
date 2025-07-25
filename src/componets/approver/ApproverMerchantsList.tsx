"use client";

import React, { useState } from "react";
import CtaTable from "../custom-ui/CtaTable";
import CtaSearch from "../custom-ui/CtaSearch";
import CtaButton from "../custom-ui/CtaButton";

const merchants = [
    {
        name: "Rapidpay Solutions",
        platform: "1xbet",
        email: "Rapidpay@gmail.com",
        status: "Active",
    },
    {
        name: "QuickPay",
        platform: "indibet",
        email: "QuickPay@gmail.com",
        status: "Active",
    },
    {
        name: "FastPay Gateway",
        platform: "dafapromo",
        email: "FastPay@gmail.com",
        status: "Active",
    },
    {
        name: "SecurePay",
        platform: "gem.bet",
        email: "SecurePay@gmail.com",
        status: "Active",
    },
    {
        name: "QuickPay",
        platform: "premierbet",
        email: "QuickPay@gmail.com",
        status: "Active",
    },
    {
        name: "EasyPay",
        platform: "mozzartbet",
        email: "EasyPay@gmail.com",
        status: "Active",
    },
];

const ApproverMerchantsList = () => {
    const [selectedMerchants, setSelectedMerchants] = useState([]);
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const handleCheckboxChange = (email) => {
        setSelectedMerchants((prev) =>
            prev.includes(email)
                ? prev.filter((e) => e !== email)
                : [...prev, email]
        );
    };

    const filteredMerchants = merchants.filter((merchant) =>
        merchant.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
    );

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
                        setSelectedMerchants(filteredMerchants.map((m) => m.email));
                    }
                }}
                renderRow={(m, i) => (
                    <tr key={i} className="border-t border-[#E4E6E8]">
                        <td className="md:px-[15px] py-3 px-2">
                            <input
                                type="checkbox"
                                checked={selectedMerchants.includes(m.email)}
                                onChange={() => handleCheckboxChange(m.email)}
                                className="border-[#959BA4] rounded-[5px] cursor-pointer"
                            />
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            {m.name}
                        </td>
                        <td className="text-[#4B5563] text-sm font-normal px-2.5">
                            {m.platform}
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
                <CtaButton left main className={'bg-purple text-white py-3 px-5'}>Save</CtaButton>
            </div>
        </>
    );
};

export default ApproverMerchantsList;
