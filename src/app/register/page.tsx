import RegisterForm from "@components/modules/authentication/organisms/RegisterForm";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Register | Victory Road Database",
};

function RegisterPage() {
  return (
    <div>
      <div className="max-w-[1000px] mx-auto text-center">
        <h1>Register</h1>
        <RegisterForm />
        <Link href="/login">
          <p className="underline">
            You already have an account ? Click here to sign in !
          </p>
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
