"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MenuItems from "../custom-ui/MenuItems";
import MenuItemsWithSub from "../custom-ui/MenuItemsWithSub";
import { SIDEBAR_DATA_LIST } from "@/utils/helper";
import { useLayoutContext } from "@/context/LayoutContext";
import Icons from "./Icons";

const SideBar = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");
  const [openTab, setOpenTab] = useState("");
  const { isSideBarOpen, setIsSideBarOpen } = useLayoutContext();

  useEffect(() => {
    for (const item of SIDEBAR_DATA_LIST) {
      const tabName = item.title.toLowerCase().replace(/\s+/g, "");

      if (item.path && pathname === item.path) {
        setActiveTab(tabName);
        setOpenTab(tabName);
        setIsSideBarOpen(false);
        break;
      }

      if (item.tabData) {
        for (const subItem of item.tabData) {
          if (pathname.startsWith(subItem.path)) {
            setActiveTab(tabName); // highlight the sidebar tab
            setOpenTab(tabName); // keep the slider (accordion) open
            setIsSideBarOpen(false);
            return;
          }
        }
      }
    }
  }, [pathname]);

  return (
    <div
      className={`max-w-[320px] w-full z-50 max-lg:fixed max-lg:top-4 duration-300 ${
        isSideBarOpen ? "left-4" : "-left-full"
      }`}
    >
      <span
        className={`bg-black/10 w-full h-full fixed top-0 duration-300 lg:hidden z-10 ${
          isSideBarOpen ? "left-0" : "-left-full"
        }`}
      ></span>
      <div className="relative z-[100] bg-white ps-[18px] py-2 rounded-[10px]">
        <div className="overflow-y-auto py-2 pe-3 h-[calc(100vh-48px)] xl:h-[calc(100vh-60px)] overflow-clip">
          <div className="flex justify-between gap-1">
            <Image
              src="/assets/images/png/sidebar_logo.png"
              className="w-[150px] md:w-[180px] lg:w-[217px] h-auto"
              height={59}
              width={217}
              alt="page-logo"
            />
            <div
              onClick={() => setIsSideBarOpen(false)}
              className="cursor-pointer lg:hidden"
            >
              <Icons icon={"cross"} />
            </div>
          </div>
          <div className="mt-[38px] flex flex-col gap-5">
            {SIDEBAR_DATA_LIST.map((item, index) => {
              const tabKey = item.title.toLowerCase().replace(/\s+/g, "");
              const isOpen = openTab === tabKey;

              const handleClick = () => {
                if (item.title === "Sign Out") {
                  localStorage.removeItem("token"); // remove token
                  // optionally redirect to login or home
                  window.location.href = "/"; // or use a router like: router.push('/')
                }
              };
              if (!item.tabData) {
                return (
                  <MenuItems
                    key={index}
                    path={item.path}
                    icon={item.icon}
                    to={tabKey}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    onClick={handleClick}
                  >
                    {item.title}
                  </MenuItems>
                );
              }

              return (
                <MenuItemsWithSub
                  key={index}
                  pathname={pathname}
                  icon={item.icon}
                  to={tabKey}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  openTab={openTab}
                  setOpenTab={setOpenTab}
                  isOpen={isOpen}
                  submenu={item.tabData.map((subItem) => ({
                    title: subItem.title,
                    path: subItem.path,
                    subicon: subItem.icons,
                  }))}
                >
                  {item.title}
                </MenuItemsWithSub>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
