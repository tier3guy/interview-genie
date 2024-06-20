import Logo from "./Logo";

export default function Navbar() {
    return (
        <nav>
            <div className="py-4 flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-4">
                    <p>Pricing</p>
                    <p>Sign In</p>
                </div>
            </div>
        </nav>
    );
}
