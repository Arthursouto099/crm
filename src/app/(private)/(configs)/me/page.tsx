'use client'
import { ModeToggle } from "@/components/toggle-theme";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateUserForm from "@/components/users/update-user";
import useAuthContext from "@/hooks/use-auth";
import { UserModel } from "@/src/api/types/user.types";

export default function MyConfigs () {
    const {user} = useAuthContext()

    if(!user) return


    return (
        <section className="w-full h-full flex justify-center py-10">
            <div className="w-3xl  flex flex-col gap-5">
                <MyConfigsCard user={user}/>
                <MyPreferencesCard/>
            </div>
        </section>
    )


}


const MyConfigsCard = ({user}: {user: UserModel}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações públicas.</CardTitle>
                <CardDescription>Essas Informações serão exibidas de formas públicas.</CardDescription>
            </CardHeader>
            <CardContent>
                <UpdateUserForm preview={user}/>
            </CardContent>

            <CardFooter>
                    <h1 className="text-foreground/40 text-sm cursor-pointer">Gostaria de mudar a senha?</h1>
            </CardFooter>
        </Card>
    )
}

const MyPreferencesCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Suas Preferencias.</CardTitle>
                <CardDescription>Informações referente as suas preferencias..</CardDescription>
            </CardHeader>


            <CardContent>
                <div className="flex flex-col gap-2 text-sm text-foreground">
                    <h1>Mudar o tema</h1>
                    <ModeToggle/>
                </div>
            </CardContent>

            <CardFooter>

            </CardFooter>
        </Card>
    )
}



