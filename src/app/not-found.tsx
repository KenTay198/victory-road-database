"use client";
import Button from "@atoms/Button";
import React from "react";

function NotFoundPage() {
  return (
    <div className="mx-auto w-fit">
      <h1>OOPS ! This page doesn&apos;t exists !</h1>
      <p>It seems like the page you tried to access is unavailable.</p>
      <p>
        To ensure you find what you&apos;re looking for, please use the links in
        the navigation bar at the top of the page or the buttons throughout the
        site.
      </p>
      <p>Click on the button below to return to the home page.</p>
      <Button color="yellow" href="/">
        Back to home
      </Button>
    </div>
  );
}

export default NotFoundPage;
