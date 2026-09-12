import { useActionState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../services/api";
import { handleError } from "../utils/handleError";

const signUpSchema = z
  .object({
    name: z
      .string("The name field is required")
      .trim()
      .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("Digite um e-mail válido").trim(),
    password: z
      .string("A senha é obrigatória")
      .trim()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string("A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export function SignUp() {
  const [state, formAction, isLoading] = useActionState(onSignUp, null);

  const navigate = useNavigate();

  async function onSignUp(_: any, formData: FormData) {
    try {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      const data = signUpSchema.parse({
        name,
        email,
        password,
        confirmPassword,
      });

      await api.post("/users", data);

      if (confirm("Cadastro realizado com sucesso!")) {
        navigate("/");
      }
    } catch (err) {
      return handleError(err);
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" action={formAction}>
      <Input legend="Nome" name="name" placeholder="John Doe" required />

      <Input
        type="email"
        name="email"
        legend="E-mail"
        placeholder="john.doe@email.com"
        required
      />

      <Input
        type="password"
        name="password"
        legend="Senha"
        placeholder="••••••••"
        required
      />

      <Input
        type="password"
        name="confirmPassword"
        legend="Confirmar senha"
        placeholder="••••••••"
        required
      />

      {state?.message && (
        <p className="text-center text-xs font-semibold text-red-500">
          {state.message}
        </p>
      )}

      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>

      <a
        className="text-sm font-semibold text-gray-100 hover:text-green-800 text-center mt-4 mb-4 transition ease-linear"
        href="/"
      >
        Já tem uma conta? Entre!
      </a>
    </form>
  );
}
