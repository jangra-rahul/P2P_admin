"use client";

import React, { useEffect, useState } from "react";

const approvers = [
  { name: "Nirropay", popularity: 45, bg: "bg-[#CDE7FF]", color: "bg-[#0095FF]", track: "text-[#0095FF] bg-[#F0F9FF]" },
  { name: "Zeropay", popularity: 29, bg: "bg-[#8CFAC6]", color: "bg-[#00E58F]", track: "text-[#00E58F] bg-[#F0FDF4]" },
  { name: "Zerodho", popularity: 18, bg: "bg-[#C5A8FF]", color: "bg-[#884DFF]", track: "text-[#884DFF] bg-[#FBF1FF]" },
  { name: "Nirropay", popularity: 25, bg: "bg-[#FFD5A3]", color: "bg-[#FF8900]", track: "text-[#FF8900] bg-[#FEF6E6]" },
];
const merchants = [
  { name: "MerchOne", popularity: 60, bg: "bg-[#CDE7FF]", color: "bg-[#0095FF]", track: "text-[#0095FF] bg-[#F0F9FF]" },
  { name: "MerchTwo", popularity: 42, bg: "bg-[#8CFAC6]", color: "bg-[#00E58F]", track: "text-[#00E58F] bg-[#F0FDF4]" },
  { name: "MerchThree", popularity: 18, bg: "bg-[#C5A8FF]", color: "bg-[#884DFF]", track: "text-[#884DFF] bg-[#FBF1FF]" },
  { name: "MerchFour", popularity: 55, bg: "bg-[#FFD5A3]", color: "bg-[#FF8900]", track: "text-[#FF8900] bg-[#FEF6E6]" },
];

const TopApproversTable = () => {
  const [activeTab, setActiveTab] = useState("Top Approvers");
  const [animateWidths, setAnimateWidths] = useState(false);

  const selectedData = activeTab === "Top Approvers" ? approvers : merchants;

  useEffect(() => {
    setAnimateWidths(false);
    const timer = setTimeout(() => {
      setAnimateWidths(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="bg-white rounded-[10px] py-2.5">
      <div className="flex gap-3 mb-3">
        {["Top Approvers", "Top Merchant"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-[5px] text-sm font-semibold cursor-pointer rounded-full transition-all duration-300 ${activeTab === tab ? "text-white bg-purple shadow-md" : "text-black/65"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-[#96A5B8] text-left">
            <th className="py-2 ps-4 text-[9px] font-normal leading-120">#</th>
            <th className="py-2 text-[9px] font-normal leading-120">Name</th>
            <th className="py-2 text-[9px] font-normal leading-120">Popularity</th>
            <th className="py-2 text-[9px] font-normal leading-120">Sales</th>
          </tr>
        </thead>
        <tbody>
          {[...selectedData]
            .sort((a, b) => b.popularity - a.popularity)
            .map((item, i) => (
              <tr key={i} className="border-t border-[#EDF2F6]">
                <td className="py-3 ps-4 text-[#444A6D] text-[10px] font-normal">{`0${i + 1}`}</td>
                <td className="py-3 font-normal text-[10px] text-[#444A6D]">{item.name}</td>
                <td className="py-3 pe-5 w-[56%]">
                  <div className={`h-2 w-full rounded-full ${item.bg} relative overflow-hidden`}>
                    <div
                      className={`h-2 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: animateWidths ? `${item.popularity}%` : "0%" }}
                    />
                  </div>
                </td>
                <td className="py-3">
                  <span className={`px-3 py-0.5 text-xs font-medium rounded-[5px] border ${item.track}`}>
                    {item.popularity}%
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopApproversTable;
