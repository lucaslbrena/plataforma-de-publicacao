import { LoginForm } from "@/components/admin/LoginForm";
import ErrorMessage from "@/components/ErrorMessage";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for admin users.",
};
export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle="403"
        pageTitle="Libere essa bagaça"
        content="The page you are looking for does not exist."
        imageUrl="/images/teste.png"
      />
    );
  }
  return <LoginForm />;
}
