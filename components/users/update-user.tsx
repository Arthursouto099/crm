"use client";
import { UserModel } from "@/src/api/types/user.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { AvatarUpload } from "./avatar-user";
import { toast } from "sonner";
import userServices from "@/src/api/services/auth.services";
import { upload } from "@/utils/uploads";
import { Spinner } from "../ui/spinner";

interface UpdateUserFormProps {
  preview: Partial<UserModel>;
}

export default function UpdateUserForm({ preview }: UpdateUserFormProps) {
  const [name, setName] = useState<string>(preview.name ?? "");
  const [email, setEmail] = useState<string>(preview.email ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!preview.id_user) return;

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      try {
        setLoading(true);
        await userServices.updateUser({ email, name });
        toast.success("usuario editado com sucesso");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const message =
          e?.response?.data?.error || e?.message || "Erro inesperado";
        toast.error(message);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const { publicUrl } = await upload(file, preview.id_user as string);
      await userServices.updateUser({
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleUpdate(e);
      }}
      className="flex flex-col   w-full h-full gap-5"
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
        <Input value={name} className="text-foreground/60" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-col  gap-2  ">
        <Label>Email</Label>
        <Input value={email}  className="text-foreground/60" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="w-full h-[0.1px] mt-5 bg-accent/50 "></div>

      <div className="flex justify-end w-full ">
        <Button disabled={loading === true ? true : false} className="bg-violet-600 hover:bg-violet-500 flex items-center gap-2 text-white">
          <Pen /> {loading === true ? <Spinner/> : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
