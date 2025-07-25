import React from 'react'
import Icons from '../common/Icons'

type Props = {
  setPopupApprover: (val: any) => void;
  popupApprover: any;
};


const ApproverPopUp: React.FC<Props>  = ({ setPopupApprover, popupApprover }) => {
    return (
        <div className={`${popupApprover ? "scale-100 pointer-events-auto" : "scale-0 pointer-events-none"} duration-300 fixed top-0 left-0 bg-black/40 w-full h-full flex justify-center items-center`}>
             <div className='bg-white rounded-[10px] p-4 md:p-[30px] pe-3 max-w-[610px] w-[90%] relative '>
                <div onClick={() => setPopupApprover(null)} className='absolute cursor-pointer -top-4 -right-4'>
                    <Icons icon={"whitecross"} />
                </div>
                <div className='max-h-[80vh] pe-[18px] overflow-auto'>
                    <div className="flex justify-between">
                        <div className="">
                            <p className='text-sm font-semibold leading-140 text-[#374151] pb-1 uppercase'>Approver Name</p>
                            <p className='text-sm font-normal text-[#4B5563]'>Niroopay</p>
                        </div>
                        <div className="">
                            <p className='text-sm font-semibold leading-140 text-[#374151] pb-1 uppercase'>email</p>
                            <p className='text-sm font-normal text-[#4B5563]'>niroopay@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex gap-2.5 justify-end py-4 lg:py-5 border-dotted border-b-[0.5px] border-black/40">
                        <button
                            className={`rounded-[10px] hover:opacity-85 duration-300 bg-purple text-white
                       cursor-pointer text-sm md:text-base leading-100 py-2 px-4`}
                        >
                            Edit
                        </button>

                        <button
                            className="rounded-[10px] hover:opacity-85 duration-300 bg-[#ECE8F2] cursor-pointer text-[#4B5563] text-sm md:text-base leading-100 py-2 px-4"
                        >
                            Delete
                        </button>
                    </div>
                    <p className="py-5 text-sm font-semibold leading-140 text-[#374151] uppercase">
                        Assigned Merchant(s) - 25
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4 sm:gap-5">
                        <div className="p-2.5 flex gap-1 items-center justify-between rounded-[10px] bg-[#EDEEEF]">
                            <p className='text-[#4B5563] text-sm md:text-base leading-100'>1. 4XGAMING</p>
                            <span className='cursor-pointer'>
                                <Icons icon={"redcross"} />
                            </span>
                        </div>
                        <div className="p-2.5 flex gap-1 items-center justify-between rounded-[10px] bg-[#EDEEEF]">
                            <p className='text-[#4B5563] text-sm md:text-base leading-100'>1. 4XGAMING</p>
                            <span className='cursor-pointer'>
                                <Icons icon={"redcross"} />
                            </span>
                        </div>
                        <div className="p-2.5 flex gap-1 items-center justify-between rounded-[10px] bg-[#EDEEEF]">
                            <p className='text-[#4B5563] text-sm md:text-base leading-100'>1. 4XGAMING</p>
                            <span className='cursor-pointer'>
                                <Icons icon={"redcross"} />
                            </span>
                        </div>
                        <div className="p-2.5 flex gap-1 items-center justify-between rounded-[10px] bg-[#EDEEEF]">
                            <p className='text-[#4B5563] text-sm md:text-base leading-100'>1. 4XGAMING</p>
                            <span className='cursor-pointer'>
                                <Icons icon={"redcross"} />
                            </span>
                        </div>
                    </div>
                    <button
                        className={`rounded-[10px] hover:opacity-85 duration-300 w-full text-center mt-[30px] bg-purple text-white
                       cursor-pointer text-sm md:text-base leading-100 py-2 px-4`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApproverPopUp