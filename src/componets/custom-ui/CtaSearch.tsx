"use client";

import React, { ChangeEvent, ReactNode } from "react";
import Icons from "../common/Icons";
import Link from "next/link";


interface CtaSearchProps {
  searchValue: string;
  list?: string;
  exportbutton?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icons?: string;
  placeholder?: string;
  addLink?: string;
  children: ReactNode;
}


const CtaSearch: React.FC<CtaSearchProps>  = ({ searchValue,list, exportbutton, onChange, icons, placeholder, addLink, children }) => {
    return (
        <div className="my-4 md:my-7 lg:my-[30px] flex-col sm:flex-row gap-4 md:gap-6 flex justify-between">
            {list && <p className="text-xs py-3 md:text-sm text-[#05004E] font-semibold">{list}</p>}
            <div className="max-w-[481px] flex gap-1 w-full px-2 py-2.5">
                <label htmlFor="searchmerch">
                    <Icons icon="marchentsearch" />
                </label>
                <input
                    id="searchmerch"
                    name="searchmerch"
                    type="search"
                    value={searchValue}
                    onChange={onChange}
                    className="placeholder:text-[#959BA4] text-black text-sm lg:text-base leading-100 w-full outline-none"
                    placeholder={placeholder}
                />
            </div>
            {exportbutton ? (<button className="flex gap-2.5 max-w-max items-center p-2 cursor-pointer border-grey-off border-[0.8px] h-[31px] rounded-[6px]">
                <Icons icon={icons} />
                <span className="text-xs md:text-[13px] font-normal text-[#4B5563] leading-100">
                    {children}
                </span>
            </button>) : (<Link
                href={addLink}
                className="bg-purple text-nowrap max-w-max hover:opacity-85 duration-300 flex gap-2.5 items-center cursor-pointer py-1.5 md:py-2.5 px-4 rounded-[10px] text-white"
            >
                <Icons icon="circleadd" />
                <span>{children}</span>
            </Link>)}

        </div>
    );
};

export default CtaSearch;
