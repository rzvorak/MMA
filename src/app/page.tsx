import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <div className="w-3xs md:block md:w-1/2 md:max-w-xl md:min-w-sm">
        <Image
          src="/LogoBW.png"
          height={1080}
          width={1080}
          alt="Mighty Minds Africa black and white logo"
        ></Image>
      </div>

      <LoginForm></LoginForm>

      <div className="absolute bottom-0 flex h-20 w-full items-center justify-center gap-4">
        <p className="text-xs">Mighy Minds Africa © 2025</p>
        <LanguageSwitcher></LanguageSwitcher>
        <DarkModeToggle></DarkModeToggle>
      </div>
    </div>
  );
}
