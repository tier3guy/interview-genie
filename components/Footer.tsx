import Logo from "./Logo";
import Link from "next/link";
import { Bricolage_Grotesque as BricolageGrotesque } from "next/font/google";

const font = BricolageGrotesque({ subsets: ["latin"] });

export default function Footer() {
    return (
        <footer className="mt-10 py-14 flex items-center justify-between border-t">
            <Logo />
            <div className="text-end">
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
