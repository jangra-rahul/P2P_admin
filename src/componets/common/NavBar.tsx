"use client"
import { useLayoutContext } from '@/context/LayoutContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Icons from './Icons';

const titleMap = {
    "/dashboard": "Dashboard",
    "/dashboard/merchants": "User Management",
    "/dashboard/merchants/add-new-merchant": "Add New Merchant",
    "/dashboard/approvers": "User Management",
    "/dashboard/approvers/add-new-approvers": "Add New Approver",
    "/dashboard/auto-deposit": "Auto Deposit Report",
    "/dashboard/bulk-deposit": "Bulk Deposit Sheet",
    "/dashboard/payment-reports": "Payment Reports",
    "/dashboard/settings": "Setting",
};

const NavBar = () => {
    const { setIsSideBarOpen } = useLayoutContext();
    const pathname = usePathname();

    const pageTitle = titleMap[pathname] || "Dashboard";
    return (
        <div className='max-w-[1100px] 2xl:mx-auto min-[1441px]:max-w-[1200px] lg:py-4 lg:px-5 bg-white max-h-max w-full'>
            <div className="flex justify-between items-center md:gap-8  xl:gap-20">
                <div className='flex items-center gap-1'>
                    <div onClick={() => setIsSideBarOpen(true)} className='lg:hidden'>
                        <Icons icon={'menu'} />
                    </div>
                    <Image
                        src="/assets/images/png/sidebar_logo.png"
                        className="min-w-[110px] w-[150px] lg:hidden md:w-[180px] lg:w-[217px] h-auto"
                        height={59}
                        width={217}
                        alt="page-logo"
                    />
                    <h3 className='text-lg hidden lg:flex sm:text-base text-nowrap xl:text-2xl leading-140 text-navy font-semibold'>{pageTitle}</h3>
                </div>
                <div className='gap-2  hidden md:flex items-center max-w-[497px] w-full px-4 py-3.5'>
                    <label htmlFor="search" className='cursor-pointer'>
                        <Icons icon={'search'} />
                    </label>
                    <input type="search" placeholder='Search here...' className='text-navy outline-none placeholder:text-grey w-full' />
                </div>
                <div className="flex gap-2 md:gap-4 items-center">
                    <div className='md:hidden'>
                        <Icons icon={"search"} />
                    </div>
                    <div className='cursor-pointer relative w-8 flex justify-center items-center h-8 rounded duration-300 hover:bg-yellow-light'>
                        <Icons icon={"notification"} />
                        <span className='w-1 h-1 rounded-full absolute top-1 right-2 inline-block bg-red'></span>
                    </div>
                    <div className="cursor-pointer gap-3 flex items-center">
                        <Image alt='people' src={"/assets/images/png/admin_img.png"} width={40} height={40}
                            className='sm:w-10 sm:h-10 w-8 h-8 rounded-[10px]'
                        />
                        <div className='hidden md:flex gap-2 items-center w-[100px] justify-between'>
                            <div>
                                <p className='text-navy text-[10px] font-medium leading-140'>Musfiq</p>
                                <p className='text-[9px] leading-100 text-grey'>Admin</p>
                            </div>
                            <Icons icon={'downarrow'} />
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='text-[22px] lg:hidden sm:text-2xl text-nowrap pt-6 leading-140 text-navy font-semibold'>{pageTitle}</h3>
        </div>
    )
}

export default NavBar