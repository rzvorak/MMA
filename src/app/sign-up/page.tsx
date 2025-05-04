import { useTranslations } from "next-intl";
import SignUpForm from "@/app/sign-up/SignUpForm";

export default function SignUpPage() {
  const t = useTranslations("SignUpPage");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <SignUpForm></SignUpForm>
    </div>
  );
}
