import { TOADY_SALES_DATA_LIST } from '@/utils/helper'
import React from 'react'
import Icons from '../common/Icons'

const TodayCardsDetails = () => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-5 pt-4'>
            {TOADY_SALES_DATA_LIST.map((obj, i) => {
                return (
                    <div key={i} className={`p-[15px] rounded-[10px] ${obj.bgColor} `}>
                        <Icons icon={obj.icon} />
                        <p className='font-semibold text-navy text-sm md:text-base lg:text-[17px] leading-140 py-2.5'>{obj.title}</p>
                        <p className='pb-1 font-medium text-purple-light text-[10px] md:text-[11px]'>{obj.heading}</p>
                        <p className='font-medium text-[8px] text-blue'>{obj.des}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default TodayCardsDetails