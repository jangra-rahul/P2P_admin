"use client";
import SideBar from "@/componets/common/SideBar";
import LogIn from "@/componets/login/LogIn";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  if (pathname === "/") {
    return <LogIn />;
  }

  return (
    <div className="bg-black h-screen p-7">
      <SideBar />
    </div>
  );
}
