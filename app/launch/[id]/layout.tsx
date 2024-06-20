import MockTestProvider from "@/providers/MockTestProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <MockTestProvider>{children}</MockTestProvider>;
}
