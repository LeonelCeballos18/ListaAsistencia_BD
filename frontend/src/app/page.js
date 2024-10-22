// src/app/page.js

"use client"; // Esto indica que el componente se debe ejecutar en el cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../utils/axios.instance.js'; // Asegúrate de que tienes la instancia de axios configurada.

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get('/check-auth');
        if (!response.data.success) {
          // Si el usuario no está autenticado, redirigir al login
          router.push('/login');
        }
      } catch (error) {
        // Si ocurre un error, asumir que el usuario no está autenticado
        router.push('/login');
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div>
      <h1>Welcome to the homepage!</h1>
    </div>
  );
}
