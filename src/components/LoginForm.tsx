"use client";

import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LetterText, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { loginAction } from "@/actions/users";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("LoginForm");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage = (await loginAction(email, password)).errorMessage;

      if (!errorMessage) {
        toast("Logged in", {
          description: "You have been successfully logged in",
        });
        router.replace("/home");
      } else {
        toast("Error", {
          description: errorMessage,
        });
      }
    });
  };

  return (
    <form action={handleSubmit} className="w-4/5 max-w-md md:mr-10">
      <Card className="bg-background w-full max-w-3xl border-none">
        <CardContent className="grid w-full items-center gap-4">
          <div>
            <Label htmlFor="email" className="mb-3">
              {t("email")}
            </Label>
            <Input
              id="email"
              name="email"
              placeholder={t("email-placeholder")}
              type="email"
              required
              disabled={isPending}
            ></Input>
          </div>
          <div>
            <Label htmlFor="password" className="mb-3">
              {t("password")}
            </Label>
            <Input
              id="password"
              name="password"
              placeholder={t("password-placeholder")}
              type="password"
              required
              disabled={isPending}
            ></Input>
          </div>
        </CardContent>
        <CardFooter className="mt-4 flex flex-col gap-6">
          <Button className="w-full cursor-pointer">
            {isPending ? <Loader2 className="animate-spin" /> : t("login")}
          </Button>
          <p className="text-xs">
            {t("signup-phrase")}
            <Link
              href="/sign-up"
              className={`ml-1 text-blue-500 underline ${isPending ? "pointer-events-none opacity-5" : ""}`}
            >
              {t("signup")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
