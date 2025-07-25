"use client"
import React, { useState } from 'react'
import Icons from '../common/Icons'
import BulkListData from './BulkListData'
import ApproverCustomRequest from './ApproverCustomRequest'

const BulkDepositHero = () => {
    const [isTab, setIsTab] = useState("one")
    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] bg-white w-full relative py-3 rounded-xl">
            <div className="flex gap-5 overflow-x-auto overflow_none">
                <div onClick={() => setIsTab("one")} className={`max-w-[240px] cursor-pointer duration-300 w-full flex gap-4 md:gap-5 group hover:bg-purple/50 px-3 lg:px-5 py-1.5 md:py-2.5 rounded-[10px] items-center ${isTab === "one" ? "bg-purple" : "bg-white"}`}>
                    <div className='w-8 md:w-10 h-8 md:h-10 rounded-lg flex justify-center items-center bg-[#F2F2F2]'>
                        <Icons className={`${isTab === "one" ? "fill-purple" : "fill-black"}`} icon={"bulkblack"} />
                    </div>
                    <p className={`font-medium text-sm group-hover:text-white duration-300 leading-140 text-nowrap ${isTab === "one" ? "text-white" : "text-black"}`}>Bulk List</p>
                </div>
                <div onClick={() => setIsTab("two")} className={`max-w-[274px] cursor-pointer duration-300 w-full flex gap-4 md:gap-5 group hover:bg-purple/50 px-3 lg:px-5 py-1.5 md:py-2.5 rounded-[10px] items-center ${isTab === "two" ? "bg-purple" : "bg-white"}`}>
                    <div className='w-8 md:w-10 h-8 md:h-10 rounded-lg flex justify-center items-center bg-[#F2F2F2]'>
                        <Icons className={`${isTab === "two" ? "fill-purple" : "fill-black"}`} icon={"approversblack"} />
                    </div>
                    <p className={`font-medium text-sm group-hover:text-white duration-300 leading-140 text-nowrap ${isTab === "two" ? "text-white" : "text-black"}`}>Approver Custom Request</p>
                </div>
            </div>
            {isTab === "one" && (
                <BulkListData />
            )}
            {isTab === "two" && (
                <ApproverCustomRequest />
            )}
        </div>
    )
}

export default BulkDepositHero