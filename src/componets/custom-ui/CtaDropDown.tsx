"use client";

import React, { useState, useEffect, useRef } from "react";
import Icons from "../common/Icons";

const CtaDropDown = ({
    data = [],
    value = "",
    onChange,
    placeholder = "Select option",
    icon = null,
    dropdownRef = null,
    className = "", // ✅ default empty string
}: {
    data?: any[];
    value?: string;
    onChange: (val: string) => void;
    placeholder?: string;
    icon?: any;
    dropdownRef?: any;
    className?: string; // ✅ Make optional here
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const localRef = useRef(null);
    const ref = dropdownRef || localRef;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className="relative" ref={ref}>
            <div
                className={`border cursor-pointer border-[#F0F2F4] flex gap-2.5 py-1.5 px-2.5 rounded-lg items-center ${className}`}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {icon && <Icons icon={icon} />}
                <p className="text-[#4B5563] text-sm md:text-base leading-100">
                    {value || placeholder}
                </p>
                <Icons icon="downarrow" />
            </div>

            <div
                className={`absolute top-[110%] left-0 w-full min-w-max mx-auto z-[10000] bg-white border border-[#F0F2F4] rounded-md shadow-md transition-all duration-300 ${showDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <div
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                    onClick={() => {
                        onChange("");
                        setShowDropdown(false);
                    }}
                >
                    All
                </div>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="px-3 py-2 text-nowrap hover:bg-gray-100 cursor-pointer text-sm text-[#4B5563]"
                        onClick={() => {
                            onChange(item);
                            setShowDropdown(false);
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CtaDropDown;
