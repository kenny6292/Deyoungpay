"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError("");const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setError(error.message);else window.location.href="/dashboard";setLoading(false);}
  return <main className="min-h-screen bg-slate-950 px-6 py-16 text-white"><div className="mx-auto max-w-md"><Link href="/" className="text-sm text-green-300">← Global Pay</Link><div className="mt-8 rounded-3xl border border-white/10 bg-white/[.03] p-8"><h1 className="text-3xl font-bold">Welcome back</h1><p className="mt-2 text-slate-400">Sign in to your Global Pay account.</p><form onSubmit={submit} className="mt-8 space-y-4"><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-green-400"/><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-green-400"/>{error&&<p className="text-sm text-red-300">{error}</p>}<button disabled={loading} className="w-full rounded-xl bg-green-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-50">{loading?"Signing in…":"Sign in"}</button></form><p className="mt-6 text-sm text-slate-400">New to Global Pay? <Link href="/signup" className="text-green-300">Create an account</Link></p></div></div></main>;
}
