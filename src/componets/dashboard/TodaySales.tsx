"use client";
import React, { useState, useRef, useEffect } from "react";
import Icons from "../common/Icons";
import TodayCardsDetails from "./TodayCardsDetails";
import CtaDropDown from "../custom-ui/CtaDropDown";

const options = ["Today", "Yesterday", "Last 7 Days", "This Month", "Last Month"];

const TodaySales = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Today");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelected(option);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] py-3 rounded-[10px] bg-white max-h-max w-full relative">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-navy-light text-xs md:text-sm font-semibold leading-140 pb-0.5">
                        Today’s Sales
                    </p>
                    <p className="text-[10px] md:text-[12px] leading-200 font-normal text-grey">
                        Sales Summary
                    </p>
                </div>

                <div className="flex md:gap-5 gap-3 relative z-10">
                   <CtaDropDown
                        data={options}
                        value={selected}
                        onChange={setSelected}
                        placeholder="Select Range"
                        className="border-grey-off"
                    />
                    <button className="flex gap-2.5 items-center p-2 cursor-pointer border-grey-off border-[0.8px] h-[31px] rounded-[6px]">
                        <Icons icon={"export"} />
                        <span className="text-xs md:text-[13px] font-medium text-navy-light leading-100">
                            Export CSV
                        </span>
                    </button>
                </div>
            </div>
            <TodayCardsDetails />
        </div>
    );
};

export default TodaySales;
