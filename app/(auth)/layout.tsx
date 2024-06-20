import Logo from "@/components/Logo";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full h-screen overflow-hidden flex">
            <div className="flex-1 h-full gradient grid place-content-center">
                <div className="px-[10%]">
                    <Logo className="text-white" />
                    <p className="text-gray-100 mt-4">
                        Practice job interview questions tailored to your job
                        description. Get instant AI feedback and suggestions to
                        improve your answers.
                    </p>
                </div>
            </div>
            <div className="flex-1 h-full grid place-content-center">
                {children}
            </div>
        </main>
    );
}
