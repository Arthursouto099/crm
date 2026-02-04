"use client";
import { EmptyStore } from "@/components/empyts/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuthContext from "@/hooks/use-auth";
import useStores from "@/hooks/use-stores";
import { storeServices } from "@/src/api/services/store.services";
import { StoreModel } from "@/src/api/types/user.types";
import { upload } from "@/utils/uploads";
import {
  ArrowRightCircle,
  FileText,
  ImageIcon,
  ImagesIcon,
  LucideSearch,
  PlusSquare,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [targetFilter, setTargetFilter] = useState<string>("");
  const { storeList, setStoreList } = useStores();
  const { user } = useAuthContext();

  const dataList = filterDataList(storeList, "store_name", targetFilter);

  return (
    <section className="w-full h-full flex justify-center">
      <div className="w-full max-w-7xl px-6 py-3 mt-10">
        {/* Top bar */}
        <div className="w-full flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => {
                setTargetFilter(e.target.value);
              }}
              placeholder="Digite alguma referência..."
              className="pl-9 w-full"
            />
          </div>

          <CreateStoreModal
            id_user={user?.id_user as string}
            onSuccess={(data) => {
              setStoreList((prev) => [...prev, data]);
            }}
          />
        </div>

        {/* Grid */}

        {dataList.length < 1 && <EmptyStore />}
        <div className="grid overflow-auto  max-h-full gap-3 mt-10 md:grid-cols-3">
          <StoreItem data={dataList} />
        </div>
      </div>
    </section>
  );
}

const filterDataList = (
  data: StoreModel[],
  key: "store_name",
  target: string,
) => {
  if (target.trim() === "") return data;
  return data.filter((store) =>
    store[key].toUpperCase().includes(target.toUpperCase()),
  );
};

interface createStoreModalProps {
  onSuccess: (data: StoreModel) => void;
  id_user: string;
}

const CreateStoreModal = ({ onSuccess, id_user }: createStoreModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [logoPreview, setLogoPreview] = useState<string>();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
  };

  const handleChangeLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    setLogo(file);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!file && !logo) {
      try {
        const { data } = await storeServices.createStore({
          store_name: formData.get("store_name") as string,
          store_bio: formData.get("store_bio") as string,
        });
        toast.success("Loja criada com sucesso");
        onSuccess(data.store);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        toast.error(e?.response?.data?.error);
      }
      return;
    }

    if (file && logo) {
      try {
        const banner = await upload(file, id_user, "stores");
        const logo_data = await upload(logo, id_user, "logos");

        const { data } = await storeServices.createStore({
          store_name: formData.get("store_name") as string,
          store_bio: formData.get("store_bio") as string,
          store_image: banner.publicUrl,
          logo: logo_data.publicUrl,
        });

        toast.success("Loja criada com sucesso");
        onSuccess(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        toast.error(e?.response?.data?.error || e.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="flex items-center gap-2">
          <PlusSquare /> Criar Nova
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="space-y-1">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-5 text-foreground/70">
          {/* Nome */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Store className="h-4 w-4 text-muted-foreground" />
              Nome da loja
            </Label>
            <Input name="store_name" placeholder="Ex: Minha Loja Digital" />
            <p className="text-foreground/40 text-xs">
              Use o nome da sua loja real. Ou crie um nome criativo que chame
              atenção dos seus clientes.
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Descrição
            </Label>
            <Textarea
              name="store_bio"
              placeholder="Fale brevemente sobre sua loja..."
              rows={3}
            />
            <p className="text-foreground/40 text-xs">
              Coloque uma breve descrição da sua loja, valores, diferenciais e
              etc.
            </p>
          </div>

          {/* Banner */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              Imagem da loja
            </Label>
            <Input
              onChange={handleChangeImage}
              type="file"
              className="text-foreground/60 text-sm "
              accept="image/*"
            />
            <p className="text-foreground/40 text-xs">
              Banner da sua loja, coloque informações cruciais ou promoções.
            </p>

            {preview && (
              <div className="relative w-full aspect-video overflow-hidden rounded-lg border shadow-sm">
                <Image
                  src={preview}
                  alt="Pré-visualização do banner"
                  fill
                  className="object-cover transition-transform duration-200 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
              </div>
            )}
          </div>

          {/* Logo */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <ImagesIcon className="h-4 w-4 text-muted-foreground" />
              Logo da loja
            </Label>
            <Input
              onChange={handleChangeLogo}
              className="text-foreground/60 text-sm "
              type="file"
              accept="image/*"
            />
            <p className="text-foreground/40 text-xs">
              Escolha algo que represente sua identidade visual.
            </p>

            {logoPreview && (
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-background shadow-sm">
                  <Image
                    src={logoPreview}
                    alt="Pré-visualização da logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Preview da logo
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit">Criar loja</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const StoreItem = ({ data }: { data: StoreModel[] }) => {
  return data.map((store) => (
    <Link key={store.id_store} href={`/store/${store.id_store}/home`}>
      <Card className="overflow-hidden hover:bg-card/70 cursor-pointer transition-colors">
        {/* Banner */}
        <CardContent className="p-0">
          {store.store_image ? (
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={store.store_image}
                alt="Banner da loja"
                fill
                className="object-cover transition-transform duration-300 ease-out hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-transparent" />

              {/* Logo + nome sobre o banner */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                {store.logo && (
                  <div className="rounded-md bg-black/40 p-1 backdrop-blur-sm border border-white/10">
                    <div className="relative h-9 w-9 overflow-hidden rounded">
                      <Image
                        src={store.logo}
                        alt="Logo da loja"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="text-white">
                  <div className="text-sm font-semibold leading-none">
                    {store.store_name}
                  </div>
                </div>
              </div>

              {/* Ação */}
            </div>
          ) : (
            <div className="relative w-full aspect-video border-b border-dashed bg-muted/40 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImageIcon className="h-6 w-6" />
                <span className="text-sm">O banner da loja ficará aqui</span>
                <span className="text-xs opacity-80">
                  Adicione uma imagem para personalizar
                </span>
              </div>
            </div>
          )}
        </CardContent>

        {/* Info */}
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="truncate">{store.store_name}</CardTitle>
              {store.store_bio && (
                <CardDescription className="line-clamp-2">
                  {store.store_bio}
                </CardDescription>
              )}
            </div>

            <CardAction className="mt-1">
              <ArrowRightCircle className="text-foreground/60 hover:scale-110 transition-transform" />
            </CardAction>
          </div>
        </CardHeader>
      </Card>
    </Link>
  ));
};
