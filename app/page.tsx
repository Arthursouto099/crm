"use client";
import userServices from "@/api/services/auth.services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { toast } from "sonner";
import Link from "next/link";
import * as Jwt from "jwt-decode";
import { User } from "@/contexts/UserLogged";
import useAuthContext from "@/hooks/use-auth";
import { useRouter } from "next/navigation"


export default function Signup() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-full m-10  md:w-1/4 min-h-[40%] max-h-[60%]  ">
        <div className="w-full text-center flex flex-col gap-2">
          <h1 className="text-5xl font-semibold">
            TEAM <span className="text-violet-400">CODE</span>
          </h1>
          <h2 className="text-accent-foreground/40">
            Organize seu time da maneira mais eficiente.
          </h2>
        </div>

        <div className="mt-7 flex  flex-col justify-center">
          <SignupModal />
          <div className="mt-4 text-sm text-foreground/60 text-center">
            <h1>
              Caso você já possua uma conta, faça login em{" "}
              <Link className="text-violet-400" href={"/auth"}>
                sign
              </Link>
              .{" "}
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

function SignupModal() {
  const { login} = useAuthContext();
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { data } = await userServices.signup(
        formData.get("email") as string,
        formData.get("name") as string,
        formData.get("password") as string
      );

      login(data.token)
      router.push("/dashboard")
      toast.success("Cadastro realizado com sucesso");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message =
        e?.response?.data?.error || e?.message || "Erro inesperado";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="grid w-full grid-cols-2 gap-4"
    >
      <div className="flex flex-col gap-2 col-span-2">
        <Label className="text-accent-foreground/50">Email De Trabalho</Label>
        <Input name="email" placeholder="exemplo: email@gmail.com" />
      </div>
      <div className="flex flex-col gap-2 ">
        <Label className="text-accent-foreground/50">Nome</Label>
        <Input name="name" placeholder="exemplo: Arthur" />
      </div>
      <div className="flex flex-col gap-2 ">
        <Label className="text-accent-foreground/50">Senha</Label>
        <Input name="password" placeholder="Yui298*" type="password" />
      </div>

      <div className="flex items-center gap-2 col-span-2">
        <Input className="w-3" type="checkbox" />
        <Label className="text-accent-foreground/50">
          eu concordo com todos os termos de uso.
        </Label>
      </div>

      <div className="col-span-2">
        <Button onClick={() => {}} className="w-full bg-violet-600 text-accent-foreground/80 hover:bg-violet-500">
          Começar
        </Button>
      </div>
    </form>
  );
}
