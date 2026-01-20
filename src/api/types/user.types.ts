export type UserModel = {
  id_user: string;
  name: string;
  role: "ADMIN" | "MEMBER" | "VIEWER";
  profile_image: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  store: StoreModel[]
};

export type StoreModel = {
  id_owner: string;
  id_store: string;
  store_name: string;
  store_bio: string | null;
  store_image: string | null;
  createdAt: Date;
  updatedAt: Date;
  logo: string | null
};
