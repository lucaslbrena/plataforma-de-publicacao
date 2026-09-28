"use client";
import ErrorMessage from "@/components/ErrorMessage";

export default function NotFound() {
  return (
    <>
      <ErrorMessage
        pageTitle="404 - Page Not Found"
        contentTitle="Page Not Found"
        content="The page you are looking for does not exist."
        imageUrl="/images/teste.png"
      ></ErrorMessage>
    </>
  );
}
