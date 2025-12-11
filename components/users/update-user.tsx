"use client";
import { UserModel } from "@/api/types/user.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { AvatarUpload } from "./avatar-user";
import { toast } from "sonner";
import userServices from "@/api/services/auth.services";
import { uploadUserAvatar } from "@/utils/uploads";

interface UpdateUserFormProps {
  preview: Partial<UserModel>;
  token: string;
}

export default function UpdateUserForm({
  preview,
  token,
}: UpdateUserFormProps) {
  const [name, setName] = useState<string>(preview.name ?? "");
  const [email, setEmail] = useState<string>(preview.email ?? "");
  const [file, setFile] = useState<File | null>(null);

  if (!preview.id_user) return;

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      try {
        const { data } = await userServices.updateUser(
          token,
          preview.id_user!,
          { email, name }
        );
        toast.success("usuario editado com sucesso");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const message =
          e?.response?.data?.error || e?.message || "Erro inesperado";
        toast.error(message);
      }
      return;
    }

    try {
      const { publicUrl } = await uploadUserAvatar(
        file,
        preview.id_user as string
      );
      const { data } = await userServices.updateUser(token, preview.id_user!, {
        email,
        name,
        profile_image: publicUrl, // backend deve aceitar esse campo
      });
      toast.success("Usuário e avatar atualizados com sucesso");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message =
        e?.response?.data?.error || e?.message || "Erro inesperado";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleUpdate(e);
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col  gap-2 ">
        <AvatarUpload
          id_user={preview.id_user!}
          onUpload={(file) => {
            setFile(file);
          }}
        />
      </div>

      <div className="flex flex-col  gap-2 ">
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-col  gap-2  ">
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="w-full h-[0.1px] mt-5 bg-accent/50 "></div>

      <div className="flex justify-end w-full ">
        <Button className="bg-violet-600 hover:bg-violet-500 flex items-center gap-2 text-white">
          <Pen /> Salvar
        </Button>
      </div>
    </form>
  );
}
