import clsx from "clsx";
import { useId, useState } from "react";
import { toast } from "react-toastify";

type InputTypeProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function InputText({
  labelText,
  defaultValue,
  ...remainingProps
}: InputTypeProps) {
  const [pastedUrl, setPastedUrl] = useState(String(defaultValue ?? ""));
  const id = useId();

  // async function handlePaste() {
  //   try {
  //     const text = await navigator.clipboard.readText();
  //     if (!text) {
  //       // toast.error("A área de transferência está vazia");
  //       return;
  //     }
  //     setPastedUrl(text);
  //     toast.success("Link colado com sucesso!");

  //     await navigator.clipboard.writeText("");
  //   } catch (error) {
  //     toast.error("Falha ao ler a área de transferência");
  //     console.error("Paste error:", error);
  //   }
  // }
  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        id={id}
        value={pastedUrl}
        // onClick={handlePaste}
        onChange={(e) => setPastedUrl(e.target.value)}
        {...remainingProps}
        className={clsx(
          "bg-white outline-0 text-base/tight",
          "ring-2 ring-slate-400 rounded",
          "p-2 transition focus:ring-blue-600",
          "placeholder-slate-300",
          "disabled:bg-slate-200",
          "disabled:text-slate-400",
          "disabled:placeholder-slate-300",
          "read-only:bg-slate-100",
          remainingProps.className,
        )}
      />
    </div>
  );
}
