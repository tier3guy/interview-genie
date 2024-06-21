import Logo from "@/components/Logo";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full h-screen flex flex-col md:flex-row absolute top-0 left-0 bg-white">
            <div className="flex-1 h-full gradient grid place-content-center">
                <div className="px-[10%] py-[10%] md:py-0">
                    <Logo className="text-white" />
                    <p className="text-gray-100 mt-4">
                        Practice job interview questions tailored to your job
                        description. Get instant AI feedback and suggestions to
                        improve your answers.
                    </p>
                </div>
            </div>
            <div className="flex-1 h-full grid place-content-center mt-10 md:mt-0">
                {children}
            </div>
        </main>
    );
}
