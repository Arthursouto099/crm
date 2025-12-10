"use client";
import userServices from "@/api/services/auth.services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import useAuthContext from "@/hooks/use-auth";
import * as jwt from "jwt-decode";
import { User } from "@/contexts/UserLogged";
import { useRouter } from "next/navigation"

export default function Sign() {
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
          <SignModal />
          <div className="mt-4 text-sm text-foreground/60 text-center">
            <h1>
              Caso não possua uma conta cadastre em{" "}
              <Link className="text-violet-400" href={"/"}>
                signup
              </Link>
              .{" "}
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

function SignModal() {
  const { login } = useAuthContext();
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { data } = await userServices.sign(
        formData.get("email") as string,
        formData.get("password") as string
      );

      login(data.token)

      toast.success("Login realizado com sucesso");
      router.push("/dashboard")

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
      <div className="flex flex-col gap-2 col-span-2 ">
        <Label className="text-accent-foreground/50">Senha</Label>
        <Input name="password" placeholder="Yui298*" type="password" />
      </div>

      <div className="col-span-2">
        <Button className="w-full bg-violet-600 text-accent-foreground/80 hover:bg-violet-500">
          Login
        </Button>
      </div>
    </form>
  );
}
