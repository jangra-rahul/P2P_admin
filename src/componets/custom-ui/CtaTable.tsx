"use client";

import React from "react";

const CtaTable = ({ columns = [], data = [], renderRow, showCheckbox = false, onCheckAll, allChecked }) => {
    return (
        //  lg:max-w-[692px] xl:max-w-[1028px] 2xl:max-w-[1156px] 
        <div className="overflow-auto lg:max-w-[calc(100vw-340px)] xl:max-w-[calc(100vw-380px)] 2xl:max-w-[calc(100vw-416px)]">
            {data.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-10">Data not found</div>
            ) : (
                <table className="w-full text-sm">
                    <thead className="bg-white">
                        <tr className="text-left border-t border-[#E4E6E8]">
                            {showCheckbox && (
                                <th className="md:px-[15px] py-3 lg:py-[14px] px-2">
                                    <input
                                        type="checkbox"
                                        className="border-[#959BA4] rounded-[5px] cursor-pointer"
                                        onChange={onCheckAll}
                                        checked={allChecked}
                                    />
                                </th>
                            )}
                            {columns.map((col, idx) => {
                                const label = typeof col === "string" ? col : col.label;
                                const className = typeof col === "object" && col.className ? col.className : "";
                                return (
                                    <th
                                        key={idx}
                                        className={`text-[#374151] text-sm font-bold uppercase text-nowrap px-2.5 ${className}`}
                                    >
                                        {label}
                                    </th>
                                );
                            })}

                        </tr>
                    </thead>
                    <tbody className="border-b border-[#E4E6E8]">
                        {data.map((item, i) => renderRow(item, i))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CtaTable;
