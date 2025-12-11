export type UserModel = {
    id_user: string;
    name: string;
    role: 'ADMIN' | 'MEMBER' | 'VIEWER';
    profile_image: string
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}