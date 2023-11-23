"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();
  const userData = session.data?.user;
  const status = session.status;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="flex items-center justify-between mt-2">
      <nav className="flex gap-4 text-gray-600 font-semibold items-center">
        <Link
          href={"/"}
          className="text-customColor font-semibold text-2xl pr-4"
        >
          DeliverEats
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>Sobre Nosotros</Link>
        <Link href={""}>Contacto</Link>
      </nav>
      <nav className="flex gap-6 text-gray-600 font-semibold items-center">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"} className="text-gray-500 whitespace-nowrap">
              Hola, {userName}
            </Link>

            <button
              onClick={() => signOut("")}
              className="bg-red-600 text-white px-4 py-2 rounded-full"
            >
              Cerrar Sesión
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Ingresa</Link>
            <Link
              href={"/register"}
              className="bg-red-600 text-white px-6 py-2 rounded-full  hover:scale-105	transition-all"
            >
              Regístrate
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
