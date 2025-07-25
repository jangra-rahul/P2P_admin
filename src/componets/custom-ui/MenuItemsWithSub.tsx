"use client";
import Link from 'next/link';
import Icons from '../common/Icons';


interface MenuItemsWithSubProps {
  icon: any;
  children: any;
  activeTab: any;
  setActiveTab: any;
  isOpen: any;
  openTab: any;
  setOpenTab: any;
  pathname: any;
  submenu?: any[];
  to: any;
  subicon?: any; // ✅ Make it optional
}

const MenuItemsWithSub: React.FC<MenuItemsWithSubProps> = ({
    icon,
    children,
    activeTab,
    setActiveTab,
    isOpen,
    openTab,
    subicon,
    setOpenTab,
    pathname,
    submenu = [],
    to,
}) => {
    const isActive = activeTab === to;

    const handleClick = () => {
        const isAlreadyOpen = openTab === to;
        setOpenTab(isAlreadyOpen ? "" : to);
        setActiveTab(to);
    };

    return (
        <div>
            <div
                onClick={handleClick}
                className={`w-full rounded-xl font-semibold text-sm duration-300 flex items-center gap-3 py-3 px-4 cursor-pointer ${
                    isActive
                        ? "bg-purple text-white hover:opacity-85"
                        : "text-grey hover:bg-purple/10 hover:text-purple"
                }`}
            >
                <Icons className={isActive ? "fill-white" : ""} icon={icon} />
                <span>{children}</span>
            </div>

            <div
                className={`flex flex-col gap-4 ps-6 overflow-hidden transition-all ease-in-out duration-300 ${
                    isOpen ? "max-h-44 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
            >
                {submenu.map((item, index) => {
                    const isSubActive = pathname.startsWith(item.path); // ✅ match partial routes

                    return (
                        <Link
                            key={index}
                            href={item.path}
                            className={`w-full rounded-xl font-semibold text-sm duration-300 flex items-center gap-2 py-3 px-4 cursor-pointer ${
                                isSubActive
                                    ? "bg-grey-white text-purple hover:opacity-85"
                                    : "text-grey hover:bg-purple/10 hover:text-purple"
                            }`}
                        >
                            <Icons className={isSubActive ? "fill-purple" : ""} icon={item.subicon} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MenuItemsWithSub;
