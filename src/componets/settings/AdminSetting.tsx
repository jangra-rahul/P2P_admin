import React from 'react'
import Icons from '../common/Icons'
const settingdata = [
    {
        icon: "enable",
        title: "Enable/disable manual overrides",
        description: "Toggle manual approval access for deposits."
    },
    {
        icon: "autoapproval",
        title: "Auto-approval thresholds",
        description: "Set rules for automatic deposit approval."
    },
    {
        icon: "wide",
        title: "Platform-wide notifications",
        description: "Send alerts to merchants and users instantly."
    },
    {
        icon: "cricleline",
        title: "Export data options: CSV / PDF / XLS",
        description: "Download reports in your preferred format."
    },
]

const AdminSetting = () => {
    return (
        <div className="max-w-[1100px] py-3 rounded-xl 2xl:mx-auto min-[1441px]:max-w-[1200px] overflow-clip lg:px-[22px] bg-white w-full relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {settingdata.map((obj, i) => {
                    return (
                        <div key={i} className="bg-white p-4 md:p-5 flex gap-4 md:gap-5">
                            <div className="bg-[#EEEEEE] min-w-11 h-11 rounded-[5px] flex items-center justify-center">
                                <Icons icon={obj.icon} />
                            </div>
                            <div className="">
                                <p className='text-[#4B5563] text-sm md:text-base font-medium leading-100 pb-[5px]'>{obj.title}</p>
                                <p className='text-xs md:text-sm text-[#4B5563]/60 font-normal leading-100'>{obj.description}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default AdminSetting