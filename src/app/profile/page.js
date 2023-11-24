"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState('');
  const { status } = session;
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // const [userImg,setUserImg]= useState('')

  useEffect(() => {
    if (status === 'authenticated'){
      setUserName(session?.data?.user?.name);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({name:userName}),
    })
    setIsSaving(false)
    if (response.ok) {
      setSaved(true);
    }
  }

 
  async function handleFileChange(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const selectedFile = ev.target.files[0];

    // handleButtonClick();
    if (selectedFile) {
      // const url = "https://api.cloudinary.com/v1_1/ditprttvz/image/upload";
      try {
        const formData = new FormData();
        
        formData.append("file", selectedFile);
        // formData.append('upload_preset', 'bqs8sgqc');
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        setIsSaving(false)

        if (response.ok) {
          const data = await response.json();
          console.log('Datos de la imagen: ', data);
          //setUserImg(data.secure_url);
          setSaved(true);
 
        } else {
          console.error('Error al subir la imagen a Cloudinary.');
        }
      } catch (error) {
        console.error('Error en la solicitud a Cloudinary:', error);
      }   
    }
  };

  //   async function handleFileChange(ev) {
//     const files = ev.target.files;
//     if(files?.length === 1){
//       const data = new FormData;
//       data.set('file', files[0])
//       await fetch('/api/upload', {
//         method: 'POST',
//         body: data,
//       })
//     }
//   }






  if (status === "loading") {
    return "loading...";
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }
  const userImage = session.data.user.image;
  return (
    <section className=" mt-8 ">
      <h1 className="text-center text-customColor text-4xl font-bold my-6">
        Perfil
      </h1>
      
      <div className="max-w-md mx-auto border my-6">
      {saved && (
        <h2 className=" bg-green-200 font-semibold text-center p-6 m-2 rounded-md border border-green-300">
          Perfil Actualizado!!
        </h2>
      )}
      {isSaving && (
        <h2 className=" bg-blue-200 font-semibold text-center p-6 m-2 rounded-md border border-blue-300">
          Cargando ...
        </h2>
      )

      }
        <div className="flex gap-2 items-center">
          <div>
            <div className=" bg-gray-200 p-2 rounded-lg ">
              <Image className="rounded-lg w-full h-full mb-2" src={userImage} width={150} height={150} alt="avatar" />
              <label>
              <input type="file" className="hidden" onChange={handleFileChange}></input>
              <span className=" cursor-pointer block mt-2 border p-2 border-gray-400 bg-gray-300  rounded-lg hover:scale-105	transition-all text-center font-semibold">
                Editar
              </span>
              </label>
            </div>
          </div>
          <form className=" grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="Nombres"
            value={userName} onChange={ev => setUserName(ev.target.value)}>
            </input>
            <input type="email" value={session.data.user.email} disabled="true" ></input>
            <button type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}