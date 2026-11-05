"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Não foi possível realizar o cadastro.");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Não foi possível conectar ao servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-cyan-900/60 bg-slate-900 p-8 shadow-2xl shadow-cyan-950/20">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-xl font-bold text-cyan-300">
            DW
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Criar sua conta
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Comece a organizar sua vida financeira.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-sm text-slate-300">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label htmlFor="username" className="text-sm text-slate-300">
              Nome de usuário
            </label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              required
              minLength={3}
              maxLength={30}
              pattern="[a-zA-Z0-9_]+"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={inputClass}
              placeholder="exemplo_usuario"
            />
            <p className="mt-1 text-xs text-slate-500">
              Use letras sem acento, números ou sublinhado.
            </p>
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-slate-300">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              placeholder="voce@exemplo.com"
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
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={72}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
              placeholder="Mínimo de 8 caracteres"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm text-slate-300">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={72}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={inputClass}
              placeholder="Digite a senha novamente"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-cyan-300 hover:text-cyan-200"
          >
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
