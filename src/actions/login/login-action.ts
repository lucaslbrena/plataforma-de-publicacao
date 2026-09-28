"use server";

import { createLoginSession } from "@/lib/login/manage-login";
import { verifyPassword } from "@/lib/login/password-hashing";

import { asyncDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

type loginActionState = {
  username: string;
  error: string;
};
export async function loginAction(state: loginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      username: "",
      error: "Login not allowed",
    };
  }

  await asyncDelay(2000, true);

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      error: "Dados invalidos",
    };
  }

  const username = formData.get("username")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";

  if (!username || !password) {
    return {
      username: "",
      error: "Digite usuário e senha",
    };
  }

  const isUserNameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || "",
  );

  if (!isUserNameValid || !isPasswordValid) {
    // valida se o usuário e senha são válidos
    return {
      username: "",
      error: "Usuário ou senha inválidos!",
    };
  }

  await createLoginSession(username);
  redirect("/admin/post");
}
