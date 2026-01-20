"use client";
import userServices from "@/src/api/services/auth.services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { EyeOffIcon, Store, Text, User2Icon, UserSquare } from "lucide-react";

export interface UserSignup {
  name: string;
  email: string;
  password: string;
  store_name: string;
  store_bio: string;
}

export default function Signup() {
  const [stage, setStage] = useState<"user" | "store">("user");
  const [stageBar, setStageBar] = useState<number>(50);
  const [signupArgs, setSignupArgs] = useState<UserSignup>({
    email: "",
    name: "",
    password: "",
    store_bio: "",
    store_name: "",
  });

  const onSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await userServices.signup(signupArgs);
      toast.success("Signup realizado com sucesso");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e?.response?.data?.error

      toast.error(message);
    }
  };

  return (
    <main className="relative w-screen h-screen flex justify-center items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/auth.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo */}
      <div className="relative bg-accent/90  p-10 rounded-xl z-10 w-full m-10 md:w-1/4 min-h-[40%] max-h-full">
        <div className="w-full text-center flex flex-col gap-2">
          <h1 className="text-5xl font-semibold">
            SIMPLI<span className="text-violet-400">FICA</span>
          </h1>
          <h2 className="text-accent-foreground/70">
            O controle total da sua loja, do seu jeito.
          </h2>
        </div>

        <div className="mt-7 flex flex-col justify-center">
          <div className="py-5">
            <div className="flex items-center gap-3">
              <span className="text-xl font-medium text-violet-400">
                {stage === "user" ? "1/2" : "2/2"}
              </span>

              <h2 className="text-xl font-semibold text-foreground">
                {stage === "user" ? "Criando conta" : "Criando seu negócio"}
              </h2>
            </div>
            <Progress className="mt-5 " value={stageBar} />
          </div>

          {stage === "user" && (
            <SignupModal
              onUserSuccess={(data) => {
                setSignupArgs({
                  ...data,
                  store_bio: "",
                  store_name: "",
                });
                setStageBar(100);
                setStage("store");
              }}
            />
          )}

          {stage === "store" && (
            <SignupModalStore
              onSubmitSuccess={(e) => onSubmitSignup(e)}
              onStoreSuccess={(data) => {
                setSignupArgs((prev) => {
                  return {
                    ...prev,
                    store_bio: data.store_bio,
                    store_name: data.store_name,
                  };
                });
              }}
            />
          )}

          <div className="mt-4 text-sm text-foreground/60 text-center">
            <h1>
              Caso você já possua uma conta, faça login em{" "}
              <Link className="text-violet-400" href={"/auth"}>
                sign
              </Link>
              .
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

interface SignupModalProps {
  onUserSuccess: (data: {
    email: string;
    name: string;
    password: string;
  }) => void;
}

function SignupModal({ onUserSuccess }: SignupModalProps) {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    onUserSuccess({
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="grid w-full grid-cols-2 gap-4"
    >
      <div className="flex flex-col gap-2 col-span-2">
        <Label className="text-accent-foreground/50"><UserSquare size={16}/> Email De Trabalho</Label>
        <Input name="email" placeholder="exemplo: email@gmail.com" />
      </div>
      <div className="flex flex-col gap-2 ">
        <Label className="text-accent-foreground/50"> <User2Icon size={16}/> Nome</Label>
        <Input name="name" placeholder="exemplo: Arthur" />
      </div>
      <div className="flex flex-col gap-2 ">
        <Label className="text-accent-foreground/50"><EyeOffIcon size={16}/> Senha</Label>
        <Input name="password" placeholder="Yui298*" type="password" />
      </div>

      <div className="flex items-center gap-2 col-span-2">
        <Input className="w-3" type="checkbox" />
        <Label className="text-accent-foreground/50">
          eu concordo com todos os termos de uso.
        </Label>
      </div>

      <div className="col-span-2">
        <Button
          onClick={() => {}}
          className="w-full bg-violet-600 text-accent-foreground/80 hover:bg-violet-500"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
}

interface SignupModalStoreProps {
  onStoreSuccess: (data: { store_name: string; store_bio: string }) => void;
  onSubmitSuccess: (e: FormEvent<HTMLFormElement>) => void;
}

function SignupModalStore({
  onStoreSuccess,
  onSubmitSuccess,
}: SignupModalStoreProps) {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    onStoreSuccess({
      store_name: formData.get("store_name") as string,
      store_bio: formData.get("store_bio") as string,
    });

    onSubmitSuccess(e);
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="grid w-full grid-cols-2 gap-4"
    >
      <div className="flex flex-col gap-2 col-span-2">
        <Label className="text-accent-foreground/50"><Store size={16}/> Nome do Negócio</Label>
        <Input name="store_name" placeholder="Minha Loja" />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <Label className="text-accent-foreground/50"><Text size={16}/> Descição do Negócio</Label>
        <Textarea
          name="store_bio"
          className="max-h-20"
          placeholder="Descreva seu negócio de forma simples e objetiva."
        />
      </div>

      <div className="flex items-center gap-2 col-span-2">
        <Input className="w-3" type="checkbox" />
        <Label className="text-accent-foreground/50">
          eu concordo com todos os termos de uso.
        </Label>
      </div>

      <div className="col-span-2">
        <Button className="w-full bg-violet-600 text-accent-foreground/80 hover:bg-violet-500">
          Começar
        </Button>
      </div>
    </form>
  );
}
