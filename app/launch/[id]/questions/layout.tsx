import QuestionProvider from "@/providers/QuestionsProvider";

export default function Layout({
    children,
}: {
    children: Readonly<React.ReactNode>;
}) {
    return <QuestionProvider>{children}</QuestionProvider>;
}
