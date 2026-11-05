export const instant = false;

import Link from "next/link";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    registered?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  async function credentialsLogin(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        login: formData.get("login"),
        password: formData.get("password"),
        redirectTo: "/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect("/login?error=CredentialsSignin");
      }

      throw error;
    }
  }

  async function googleLogin() {
    "use server";

    await signIn("google", {
      redirectTo: "/dashboard",
    });
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-cyan-900/60 bg-slate-900 p-8 shadow-2xl shadow-cyan-950/20">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-xl font-bold text-cyan-300">
            DW
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            DW Finance AI
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Entre para acessar seu painel financeiro.
          </p>
        </div>

        {params.registered === "true" && (
          <p className="mb-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            Cadastro realizado! Entre com seu usuário ou e-mail e senha.
          </p>
        )}

        {params.error === "CredentialsSignin" && (
          <p
            role="alert"
            className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
          >
            Usuário, e-mail ou senha inválidos.
          </p>
        )}

        <form action={credentialsLogin} className="space-y-5">
          <div>
            <label htmlFor="login" className="text-sm text-slate-300">
              Usuário ou e-mail
            </label>
            <input
              id="login"
              name="login"
              type="text"
              autoComplete="username"
              required
              className={inputClass}
              placeholder="Seu usuário ou e-mail"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-slate-300">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
              placeholder="Sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Entrar
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-xs text-slate-500">OU</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <form action={googleLogin}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 font-medium text-slate-900 transition hover:bg-slate-200"
          >
            <span aria-hidden="true" className="text-lg font-bold">
              G
            </span>
            Entrar com Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-medium text-cyan-300 hover:text-cyan-200"
          >
            Criar conta
          </Link>
        </p>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Seus dados financeiros devem ser acessíveis somente por você
          e por administradores autorizados.
        </p>
      </div>
    </main>
  );
}
