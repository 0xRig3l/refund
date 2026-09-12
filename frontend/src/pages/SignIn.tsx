import { useActionState } from "react";
import z from "zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { handleError } from "../utils/handleError";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.email("Digite um e-mail válido").trim(),
  password: z
    .string("A senha é obrigatória")
    .trim()
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(onSignIn, null);
  const authContext = useAuth();

  async function onSignIn(_: any, formData: FormData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");

      const data = signInSchema.parse({ email, password });
      const sessionsResponse = await api.post("/sessions", data);

      authContext.save(sessionsResponse.data);
    } catch (err) {
      return handleError(err);
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" action={formAction}>
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

      {state?.message && (
        <p className="text-center text-xs font-semibold text-red-500">
          {state.message}
        </p>
      )}

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        className="text-sm font-semibold text-gray-100 hover:text-green-800 text-center mt-4 mb-4 transition ease-linear"
        href="/signup"
      >
        Ainda não tem uma conta? Cadastre-se!
      </a>
    </form>
  );
}
