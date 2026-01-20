"use client";
import userServices from "@/src/api/services/auth.services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EyeOff, UserSquare2 } from "lucide-react";

export default function Sign() {
  return (
    <main className="relative w-screen h-screen flex justify-center items-center">
      {/* Background */}
      <div
        className="
        absolute inset-0
        bg-[url('/auth.jpg')]
        bg-cover bg-center bg-no-repeat
      "
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Card */}
      <div className="relative w-full m-10 bg-accent/90 backdrop-blur-md p-10 rounded-xl md:w-1/4 min-h-[40%] max-h-[60%]">
        <div className="w-full text-center flex flex-col gap-2">
          <h1 className="text-5xl font-semibold">
            SIMPLI<span className="text-violet-400">FICA</span>
          </h1>
          <h2 className="text-accent-foreground/70">
            O controle total da sua loja, do seu jeito.
          </h2>
        </div>

        <div className="mt-7 flex flex-col justify-center">
          <SignModal />

          <div className="mt-4 text-sm text-foreground/60 text-center">
            <p>
              Caso não possua uma conta, cadastre-se em{" "}
              <Link className="text-violet-400 hover:underline" href="/signup">
                signup
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function SignModal() {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
       await userServices.sign(
        formData.get("email") as string,
        formData.get("password") as string
      );


      router.replace("/stores")
      toast.success("Login realizado com sucesso");
      

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
        <Label className="text-accent-foreground/50 flex items-center gap-2"> <UserSquare2 size={16}/>Email de Trabalho</Label>
        <Input name="email" placeholder="exemplo: email@gmail.com" />
      </div>
      <div className="flex flex-col gap-2 col-span-2 ">
        <Label className="text-accent-foreground/50 flex items-center gap-2"> <EyeOff size={16}/>Senha</Label>
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
