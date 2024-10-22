import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../utils/auth.js';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      const authenticatedUser = await checkAuth();
      if (!authenticatedUser) {
        // Si el usuario no está autenticado, redirigir al login
        router.push('/login');
      } else {
        setUser(authenticatedUser);
      }
    };

    verifyUser();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-green-500">Bienvenido al Dashboard</h1>
      {user && <p>Hola, {user.email}</p>}
    </div>
  );
}
