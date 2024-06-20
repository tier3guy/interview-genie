"use client";

import Logo from "./Logo";
import Link from "next/link";
import useMedia from "use-media";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { AlignRight } from "lucide-react";
import NavLinkType from "@/types/nav-link.type";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
    const { isLoaded, user } = useUser();
    const isWide = useMedia({ minWidth: "600px" });
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);

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

    if (!isWide) {
        return (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <div className="py-4 flex items-center justify-between">
                    <Link href={"/"}>
                        <Logo />
                    </Link>
                    <SheetTrigger>
                        <AlignRight className="text-green-600" />
                    </SheetTrigger>
                    <SheetContent className="p-3 pt-10">
                        <div className="flex flex-col py-3">
                            {navLinks?.map((navLink) => (
                                <Link href={navLink.href} key={navLink.href}>
                                    {navLink.button ? (
                                        <div className="flex justify-center mt-2">
                                            <button
                                                className="py-[5px] bg-green-600/10 text-green-600 px-4 rounded-full border-green-600/20 border"
                                                onClick={() => {
                                                    setSheetOpen(false);
                                                }}
                                            >
                                                {navLink.label}
                                            </button>
                                        </div>
                                    ) : (
                                        <p
                                            className=" w-full text-center py-2"
                                            onClick={() => {
                                                setSheetOpen(false);
                                            }}
                                        >
                                            {navLink.label}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </div>
            </Sheet>
        );
    }
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
