import LoginForm from "@components/modules/authentication/organisms/LoginForm";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <div>
      <div className="max-w-[1000px] mx-auto text-center">
        <h1>Login</h1>
        <LoginForm />
        <Link href="/register">
          <p className="underline">
            You are not registered yet ? Click here to create an account !
          </p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
