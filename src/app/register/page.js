"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-customColor text-4xl font-bold">
        Regístrate
      </h1>
      {userCreated && (
        <div className="my-4 text-center font-medium">
          Usuario Creado <br />
          Ahora puedes{" "}
          <Link className="text-red-600" href={"/login"}>
            Iniciar Secion &raquo;
          </Link>
        </div>
      )}

      {error && (
        <div className="my-4 text-center font-medium">
          Ocurrió un <span className="text-customColor">Error!</span>
          <br />
          Por favor intenta mas tarde.
        </div>
      )}

      <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          required
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Ingresa una contraseña"
          value={password}
          required
          minLength={"5"}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Registrar
        </button>
        <div className="text-center text-gray-400 grid grid-cols-3 justify-center items-center">
          <hr className="border border-gray-300" />
          o regístrate con
          <hr className="border border-gray-300" />
        </div>
        <button className=" flex justify-center gap-4 items-center">
          <Image
            src={"/google.png"}
            width={32}
            height={32}
            alt={"Google Icon"}
          />
          Ingresa con Google
        </button>
      </form>
    </section>
  );
}
