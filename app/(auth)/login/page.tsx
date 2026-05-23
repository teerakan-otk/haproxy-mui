import type { Metadata } from "next";

import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-svh">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
