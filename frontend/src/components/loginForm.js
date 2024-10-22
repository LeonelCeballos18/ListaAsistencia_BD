// src/components/LoginForm.js

"use client"; // Agrega esta línea

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios.instance.js';
import Input from './input.js';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviamos las credenciales al backend
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data.success) {
        // Si el login es exitoso, redirigimos al dashboard
        router.push('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError('Error: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  return (
    <form className="bg-white p-8 rounded-lg shadow-md space-y-4" onSubmit={handleLogin}>
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white py-2 rounded-md w-full hover:bg-blue-600">
        Log in
      </button>
    </form>
  );
}
