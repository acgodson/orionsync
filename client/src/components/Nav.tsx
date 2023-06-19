"use client";
import { navData } from "@/data/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNav = () => {
  const pathname = usePathname();
  const cleanPath = pathname.split("#")[0].split("?")[0];
  const segments = cleanPath.split("/");
  const spaceId = segments[1];

  return (
    <nav className=" flex flex-col justify-center gap-8 px-8 pb-[50px] bg-white h-screen">
      <img src="/logo.svg" className=" absolute top-4 left-7" alt="" />
      {navData.map((nav, i) => {
        return (
          <Link href={`${spaceId}${nav.href}`} key={i}>
            <Image
              width={43}
              height={43}
              src={pathname == `/${spaceId}${nav.href}` ? nav.homeA : nav.homeN}
              alt=""
              className="w-[43px]"
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
