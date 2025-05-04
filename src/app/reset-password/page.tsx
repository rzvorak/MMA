import { useTranslations } from "next-intl";
import ResetPasswordForm from "@/app/reset-password/ResetPasswordForm";

export default function ResetPasswordPage() {
  const t = useTranslations("ResetPasswordPage");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <ResetPasswordForm></ResetPasswordForm>
    </div>
  );
}
