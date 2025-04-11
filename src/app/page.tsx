import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <div className="w-3xs md:block md:w-1/2 md:max-w-xl md:min-w-lg">
        <Image
          src="/LogoBW.png"
          height={1080}
          width={1080}
          alt="Mighty Minds Africa black and white logo"
        ></Image>
      </div>

      <LoginForm></LoginForm>
    </div>
  );
}
