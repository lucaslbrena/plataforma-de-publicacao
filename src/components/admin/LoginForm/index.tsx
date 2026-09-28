"use client";

import { loginAction } from "@/actions/login/login-action";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import clsx from "clsx";
import { LogInIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export function LoginForm() {
  const initialState = {
    username: "",
    error: "",
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    console.log();
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  return (
    <div
      className={clsx(
        "flex items-center justify-center text-center max-w-sm mt-16 mb-16 mx-auto",
      )}
    >
      <form action={action} className="flex flex-1 flex-col gap-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <InputText
          type="text"
          name="username"
          labelText="Usuário"
          placeholder="Usuário"
          disabled={isPending}
          defaultValue={state.username}
        />
        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Senha"
          disabled={isPending}
        />
        <Button
          variant="default"
          type="submit"
          className="mt-4"
          disabled={isPending}
        >
          <LogInIcon className="w-4 h-4 mr-2" />
          Entrar
        </Button>
        {!!state.error && <span className="text-red-600">{state.error}</span>}
      </form>
    </div>
  );
}
