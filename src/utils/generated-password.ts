import { hashPassword } from "@/lib/login/password-hashing";

(async () => {
  // nao esquecer de apagar senha
  const password = "1452";
  const hashedPassword = await hashPassword(password);

  console.log("hashedPassword", { hashedPassword });
})();
