import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/AuthProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "InterviewGenie",
    description:
        "Practice job interview questions tailored to your job description. Get instant AI feedback and suggestions to improve your answers.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/logo.png"
                    type="image/png"
                    sizes="16*16"
                />
            </head>
            <ClerkProvider>
                <AuthProvider>
                    <body className={cn(font.className)}>
                        <div
                            className={cn(
                                "text-gray-500 px-[5%] w-full overflow-x-hidden overflow-y-auto"
                            )}
                        >
                            <Navbar />
                            {children}
                            <Footer />
                        </div>
                        <Toaster />
                    </body>
                </AuthProvider>
            </ClerkProvider>
        </html>
    );
}
