"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { updatePasswordAction } from "@/actions/users";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("ResetPasswordForm");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        toast("Error", {
          description: "Passwords don't match.",
        });
      } else {
        let errorMessage = (await updatePasswordAction(password)).errorMessage;

        if (!errorMessage) {
          toast("Password reset successfully", {
            description: "Log in with your new password.",
          });
          router.replace("/");
        } else {
          toast("Error", {
            description: errorMessage,
          });
        }
      }
    });
  };

  return (
    <>
      <form action={handleSubmit} className="w-4/5 max-w-md md:mr-10">
        <Card className="bg-background w-full max-w-3xl border-none">
          <CardContent className="grid w-full items-center gap-4">
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
                {t("retypePassword")}
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
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                t("confirmPassword")
              )}
            </Button>
            <Link
              href="/"
              className={`mr-8 text-xs text-blue-500 underline ${isPending ? "pointer-events-none opacity-5" : ""}`}
            >
              {t("back")}
            </Link>
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

export default ResetPasswordForm;
