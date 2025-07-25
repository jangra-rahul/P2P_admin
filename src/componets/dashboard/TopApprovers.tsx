import React from 'react'
import TopApproversTable from './TopApproversTable'
import Image from 'next/image'
import Icons from '../common/Icons'

const TopApprovers = () => {
    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:px-[22px] py-3 rounded-xl bg-white max-h-max w-full relative xl:-mt-6">
            <div className="grid md:col-span-2 lg:grid-cols-[59%_38%] xl:grid-cols-[43%_27%_27%] gap-5">
                <TopApproversTable />
                <div className='bg-white border border-[#F8F9FA] rounded-2xl p-[19px] lg:px-2 w-full'>
                    <p className="text-navy-light text-xs md:text-sm font-semibold leading-140 pb-4">
                        Sales Mapping by Country
                    </p>
                    <Image
                        alt='toatla'
                        className='w-full pt-6'
                        width={284}
                        height={119}
                        src={"/assets/images/webp/map.webp"}
                    />

                </div>
                <div className='bg-white border border-[#F8F9FA] rounded-2xl p-[19px] lg:px-3 w-full'>
                    <p className="text-navy-light text-xs md:text-sm font-semibold leading-140 pb-4">
                        Volume vs Service Level
                    </p>
                    <Image
                        alt='toatla'
                        className='w-full'
                        width={238}
                        height={113}
                        src={"/assets/images/webp/volume.webp"}
                    />
                    <div className="flex gap-2.5 pt-3 justify-center">
                        <div className='flex gap-2.5'>
                            <div className='pt-1'>
                                <span className='h-2 block w-2 rounded-full bg-red'></span>
                            </div>
                            <p className='text-[#96A5B8] text-[10px] md:text-[11px] leading-100'>
                                Volume
                                <span className='text-[#222B45] block text-[10px] font-medium'>
                                    1,135
                                </span>
                            </p>
                        </div>
                        <span className='block w-[1px] h-4 bg-[#BDC9D3]'></span>
                        <div className='flex gap-2.5'>
                            <div className='pt-1'>
                                <span className='h-2 block w-2 rounded-full bg-[#00E096]'></span>
                            </div>
                            <p className='text-[#96A5B8] text-[10px] md:text-[11px] leading-100'>
                                Services
                                <span className='text-[#222B45] block text-[10px] font-medium'>
                                    635
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopApprovers