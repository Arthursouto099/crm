"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useAuthContext from "@/hooks/use-auth";

interface AvatarUploadProps {
  id_user: string;
  onUpload: (file: File) => void;
}

export function AvatarUpload({ onUpload }: AvatarUploadProps) {
  const { user } = useAuthContext();
  const [preview, setPreview] = useState<string>(
    user?.profile_image || "https://github.com/shadcn.png"
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    // Retornando o FILE real
    onUpload(file);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="file"
        accept="image/*"
        id="avatar-input"
        className="hidden"
        onChange={handleImageChange}
      />

      <label htmlFor="avatar-input" className="cursor-pointer">
        <Avatar className="h-20 w-20">
          <AvatarImage src={preview} />
          <AvatarFallback>IMG</AvatarFallback>
        </Avatar>
      </label>

      <p className="text-sm text-muted-foreground">
        Clique na imagem para alterar seu avatar
      </p>
    </div>
  );
}
