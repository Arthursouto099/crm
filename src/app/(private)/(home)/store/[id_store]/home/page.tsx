"use client";
import useAuthContext from "@/hooks/use-auth";
import { redirect, useParams } from "next/navigation";

export default function StorePage() {
  const { user } = useAuthContext();
  const params = useParams<{ id_store: string }>();

  const storeId = params.id_store;

  


  redirect(`/store/${storeId}/stockDashboard`)
}
