import NavBar from '@/componets/common/NavBar'
import SideBar from '@/componets/common/SideBar'
import Image from 'next/image'

export default function layoutDashboard({ children }) {
    return (
        <div className='h-screen bg-grey-dark p-4 lg:px-2 lg:pe-0 xl:p-7 xl:pe-1.5 relative max-w-[1920px] mx-auto'>
            <Image className='absolute bottom-0 left-0'
                src={'/assets/images/svg/bottom_line.svg'} height={300} width={300} alt='bottom_line' />
            <div className='relative z-30 flex lg:gap-7'>
                <div className='lg:fixed top-4 lg:left-0 xl:left-4 max-w-[280px]'>
                    <SideBar />
                </div>
                <div className='flex flex-col gap-6 xl:gap-7 w-full lg:ml-[280px]'>
                    <NavBar />
                    {children}
                </div>
            </div>
        </div>
    )
}
