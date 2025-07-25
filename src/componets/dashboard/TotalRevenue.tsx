import Image from 'next/image'
import Icons from '../common/Icons'

const TotalRevenue = () => {
    return (
        <div className="max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] py-3 rounded-xl lg:px-[22px] bg-white max-h-max w-full relative">
            <div className="grid md:col-span-2 lg:grid-cols-[59%_38%] xl:grid-cols-[43%_27%_27%] gap-5">
                <div className='bg-white border border-[#F8F9FA] row-span-1 rounded-2xl p-[19px] w-full'>
                    <p className="text-navy-light text-xs md:text-sm font-semibold leading-140 pb-4">
                        Total Revenue
                    </p>
                    <Image
                        alt='total_renive'
                        className='w-full'
                        width={421}
                        height={171}
                        src={"/assets/images/webp/total_revenue.webp"}
                    />
                </div>
                <div className='bg-white border border-[#F8F9FA] rounded-2xl p-[19px] lg:px-2 w-full'>
                    <p className="text-navy-light text-xs md:text-sm font-semibold leading-140 pb-4">
                        Customer Satisfaction
                    </p>
                    <Image
                        alt='toatla'
                        className='w-full'
                        width={284}
                        height={119}
                        src={"/assets/images/webp/customer_satisfaction.webp"}
                    />
                    <span className='block my-[7px] max-w-[260px] mx-auto h-[1px] bg-[#EDF2F6] w-full'></span>
                    <div className="flex gap-2.5 justify-center">
                        <div className='flex gap-2.5'>
                            <div className='pt-1'>
                                <Icons icon={"bluelinecircle"} />
                            </div>
                            <p className='text-[#96A5B8] text-[10px] md:text-[11px] leading-100'>
                                Last Month
                                <span className='text-[#222B45] block text-[10px] font-medium'>
                                    $3,004
                                </span>
                            </p>
                        </div>
                        <span className='block w-[1px] h-4 bg-[#BDC9D3]'></span>
                        <div className='flex gap-2.5'>
                            <div className='pt-1'>
                                <Icons icon={"greenlinecircle"} />
                            </div>
                            <p className='text-[#96A5B8] text-[10px] md:text-[11px] leading-100'>
                                This Month
                                <span className='text-[#222B45] block text-[10px] font-medium'>
                                    $4,504
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='bg-white border border-[#F8F9FA] rounded-2xl p-[19px] lg:px-3 w-full'>
                    <p className="text-navy-light text-xs md:text-sm font-semibold leading-140 pb-4">
                        Target vs Reality
                    </p>
                    <Image
                        alt='toatla'
                        className='w-full'
                        width={238}
                        height={113}
                        src={"/assets/images/webp/target.webp"}
                    />
                    <div className='flex flex-col gap-2.5 max-w-[167px] w-full pt-3'>
                        <div className='flex items-center gap-3 justify-between'>
                            <div className="flex gap-2">
                                <Image height={25} width={25} alt='cir'
                                    src={'/assets/images/svg/realty_sales.svg'}
                                />
                                <p className='text-navy font-semibold text-[8px] leading-120'>Reality Sales
                                    <span className='block text-grey font-normal'>Global</span>
                                </p>
                            </div>
                            <p className='leading-120 text-[#27AE60] text-[10px]'>8.823</p>
                        </div>
                        <div className='flex items-center gap-3 justify-between'>
                            <div className="flex gap-2">
                                <Image height={25} width={25} alt='cir'
                                    src={'/assets/images/svg/target_sales.svg'}
                                />
                                <p className='text-navy font-semibold text-[8px] leading-120'>Target Sales
                                    <span className='block text-grey font-normal'>Commercial</span>
                                </p>
                            </div>
                            <p className='leading-120 text-[#FFA412] text-[10px]'>12.122</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalRevenue