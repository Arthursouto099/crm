"use client";

import userServices from "@/api/services/auth.services";
import { UserModel } from "@/api/types/user.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateUserForm from "@/components/users/update-user";
import useAuthContext from "@/hooks/use-auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Profile() {
  const { user, token } = useAuthContext();
  const [infoByUser, setInfoByUser] = useState<UserModel | null>(null);

  useEffect(() => {
    if (!user || !token) return;
    setUserInfo(setInfoByUser, user.id_user, token);
  }, [user, token]);

  if (!user || !token) return;

  return (
    <section className="w-full h-full flex flex-col gap-10  md:py-20 items-center ">
      <Card className="md:w-3xl bg-accent/20">
        <CardHeader>
          <CardTitle className="border-0 border-b border-b-accent/60 pb-2">
            Informações do perfil
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!infoByUser ? (
            <div>
              <h1>Carregando informações...</h1>
            </div>
          ) : (
            <div>
              <UpdateUserForm
                token={token}
                preview={{
                  email: infoByUser?.email,
                  name: infoByUser?.name,
                  id_user: user?.id_user,
                  profile_image: infoByUser.profile_image
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      

      {/* <Card className="w-3xl bg-accent/20"></Card>

      <Card className="w-3xl bg-accent/20"></Card> */}
    </section>
  );
}

async function setUserInfo(
  set: Dispatch<SetStateAction<UserModel | null>>,
  id_user: string,
  token: string
) {
  if(!id_user || !token) return
  const { data } = await userServices.getUser(token, id_user);
  set(data.user);
}
