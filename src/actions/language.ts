"use server";
import { cookies } from "next/headers";

export default async function setLanguage(value: string) {
  const cookieStore = await cookies();
  cookieStore.set("language", value);
}
