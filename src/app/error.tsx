"use client";
import Button from "@atoms/Button";
import React from "react";

function ErrorPage() {
  return (
    <div className="mx-auto w-fit">
      <h1>OOPS ! An error has occurred !</h1>
      <p>It seems that an error has occurred while consulting this page.</p>
      <p>
        If the problem persists, please contact the site administrator.
      </p>
      <p>Click on the button below to return to the home page.</p>
      <Button color="yellow" href="/">
        Back to home
      </Button>
    </div>
  );
}

export default ErrorPage;
