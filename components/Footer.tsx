import Logo from "./Logo";
import Link from "next/link";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Footer() {
    return (
        <footer className="mt-10 py-14 flex flex-col md:flex-row items-center justify-between border-t">
            <Link href={"/"}>
                <Logo />
            </Link>
            <div className="text-center md:text-end mt-4 md:mt-0">
                <p>
                    Made by{" "}
                    <Link
                        href="https://www.linkedin.com/in/tier3guy"
                        target="_blank"
                        className="underline"
                    >
                        <span className={font.className}>Avinash Gupta</span>
                    </Link>
                </p>
                <p>
                    Questions or feedback? Email{" "}
                    <Link
                        href="mailto:avinashgupta.work@gmail.com"
                        className="underline"
                    >
                        <span className={font.className}>
                            avinashgupta.work@gmail.com
                        </span>
                    </Link>
                </p>
            </div>
        </footer>
    );
}
