"use client";

import Logo from "./Logo";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import NavLinkType from "@/types/nav-link.type";

export default function Navbar() {
    const { isLoaded, user } = useUser();
    const navLinks: NavLinkType[] =
        !isLoaded || !user
            ? [
                  {
                      label: "Pricing",
                      href: "/pricing",
                  },
                  {
                      label: "Sign In",
                      href: "/sign-in",
                      button: true,
                  },
              ]
            : [
                  {
                      label: "Pricing",
                      href: "/pricing",
                  },
                  {
                      label: "Dashboard",
                      href: "/dashboard",
                  },
                  {
                      label: "Account",
                      href: "/account",
                  },
                  {
                      label: "Launch Interview",
                      href: `/launch/${uuidv4()}`,
                      button: true,
                  },
              ];

    return (
        <nav>
            <div className="py-4 flex items-center justify-between">
                <Link href={"/"}>
                    <Logo />
                </Link>
                <div className="flex items-center gap-4 font-medium">
                    {navLinks?.map((navLink) => (
                        <Link href={navLink.href} key={navLink.href}>
                            {navLink.button ? (
                                <button className="py-[5px] bg-green-600/10 text-green-600 px-4 rounded-full border-green-600/20 border">
                                    {navLink.label}
                                </button>
                            ) : (
                                <p>{navLink.label}</p>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
