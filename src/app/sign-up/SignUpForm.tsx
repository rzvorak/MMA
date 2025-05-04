"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { LetterText, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { signUpAction } from "@/actions/users";
import { useTranslations } from "next-intl";
import LogoByTheme from "../../components/LogoByTheme";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import DarkModeToggle from "../../components/DarkModeToggle";

const SignUpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("SignUpForm");

  const [confirming, setConfirming] = useState(false);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;

      let errorMessage =
        confirmPassword === password
          ? (await signUpAction(email, password, firstName, lastName))
              .errorMessage
          : "Passwords don't match";

      if (!errorMessage) {
        setConfirming(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        router.replace("/");
      } else {
        toast("Error", {
          description: errorMessage,
        });
      }
    });
  };

  return confirming ? (
    <>
      <div className="w-3xs md:block md:w-1/2 md:max-w-xl md:min-w-sm">
        <LogoByTheme />
      </div>

      <div className="flex flex-col items-center md:items-start">
        <div className="text-primary mb-1 text-xl font-semibold md:text-2xl">
          {t("welcome")}
        </div>
        <div className="text-primary text-md flex items-center font-normal text-wrap md:text-lg">
          {t("confirmation")}
        </div>
      </div>

      <div className="absolute bottom-0 flex h-20 w-full items-center justify-center gap-4">
        <div className="mb-1">{t("redirection")}</div>
        <Loader2 className="animate-spin" />
      </div>
    </>
  ) : (
    <>
      <form action={handleSubmit} className="w-4/5 max-w-md md:mr-10">
        <Card className="bg-background w-full max-w-3xl border-none">
          <CardContent className="grid w-full items-center gap-4">
            <div>
              <Label htmlFor="firstName" className="mb-3">
                {t("firstName")}
              </Label>
              <Input
                id="firstName" // for pairing with htmlFor
                name="firstName" // for retrieving form data
                placeholder={t("firstName-placeholder")}
                type="text" // for special browser recognition
                required
                disabled={isPending}
              ></Input>
            </div>
            <div>
              <Label htmlFor="lastName" className="mb-3">
                {t("lastName")}
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={t("lastName-placeholder")}
                type="text"
                required
                disabled={isPending}
              ></Input>
            </div>
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
            <div>
              <Label htmlFor="confirmPassword" className="mb-3">
                {t("confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t("password-placeholder")}
                type="password"
                required
                disabled={isPending}
              ></Input>
            </div>
          </CardContent>
          <CardFooter className="mt-4 flex flex-col gap-6">
            <Button className="w-full cursor-pointer">
              {isPending ? <Loader2 className="animate-spin" /> : t("signup")}
            </Button>
            <p className="text-xs">
              {!isPending ? t("login-phrase") : ""}
              <Link
                href="/"
                className={`ml-1 text-blue-500 underline ${isPending ? "pointer-events-none opacity-5" : ""}`}
              >
                {t("login")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>

      <div className="absolute bottom-0 flex h-20 w-full items-center justify-center">
        <p className="mr-2 text-xs select-none">Mighy Minds Africa © 2025</p>
        <LanguageSwitcher></LanguageSwitcher>
        <DarkModeToggle></DarkModeToggle>
      </div>
    </>
  );
};

export default SignUpForm;
