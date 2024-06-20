"use client";

import { useUser } from "@clerk/nextjs";
import Logo from "./Logo";
import Link from "next/link";
import NavLinkType from "@/types/nav-link.type";
import ShimmerButton from "./magicui/shimmer-button";

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
                      href: "/launch-interview",
                      button: true,
                  },
              ];

    return (
        <nav>
            <div className="py-4 flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-4">
                    {navLinks?.map((navLink) => (
                        <Link href={navLink.href} key={navLink.href}>
                            {navLink.button ? (
                                <ShimmerButton>{navLink.label}</ShimmerButton>
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
