'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Lock, Mail, User, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isRegister) {
      // Register logic
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Registration failed');
          setLoading(false);
          return;
        }
        setSuccess('Registration successful! Logging you in...');
        
        // Log in after successful registration
        const loginRes = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (loginRes?.error) {
          setError(loginRes.error);
          setLoading(false);
        } else {
          router.push('/scan');
          router.refresh();
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    } else {
      // Sign in logic
      try {
        const res = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          setError(res.error);
          setLoading(false);
        } else {
          setSuccess('Login successful! Redirecting...');
          router.push('/');
          router.refresh();
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-cyan-50/20 dark:from-slate-950 dark:via-teal-950/10 dark:to-cyan-950/10 transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-150 dark:border-gray-800 rounded-3xl p-8 shadow-2xl shadow-gray-200/50 dark:shadow-black/40">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl mb-4">
              <Sparkles size={28} className="animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {isRegister ? 'Sign up to create custom cheque templates' : 'Sign in to access your templates'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-2xl border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 text-sm font-medium rounded-2xl border border-teal-100 dark:border-teal-900/30">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 text-gray-400 group-hover:text-teal-500 transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-gray-100"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-400 group-hover:text-teal-500 transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-hover:text-teal-500 transition-colors" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 dark:shadow-none hover:shadow-xl hover:shadow-teal-500/30 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : isRegister ? 'Register' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </span>{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
