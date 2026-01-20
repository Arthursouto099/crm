// src/lib/uploadAvatar.ts
import { supabase } from "@/src/api/config/storage/supabaseClient";

export async function upload(file: File, id_user: string, path?: string) {
  // tenta pegar a extensão do arquivo (ex: .jpg, .png)
  
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${id_user}-${Date.now()}.${ext}`;
  const filePath = `${path ?? "avatars"}/${fileName}`; // pasta "avatars" dentro do bucket

  const { error } = await supabase.storage
    .from("media") // NOME DO BUCKET no Supabase
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Erro ao fazer upload do avatar no Supabase:", error);
    throw error;
  }

  const { data } = supabase.storage.from("media").getPublicUrl(filePath);

  return {
    path: filePath,
    publicUrl: data.publicUrl,
  };
}
