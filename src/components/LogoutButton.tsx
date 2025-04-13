"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";

const LogOutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast("Logged out", {
        description: "You have been successfully logged out",
      });
      router.push("/");
    } else {
      toast("Error", {
        description: "Error logging out",
      });
    }
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="w-24 cursor-pointer"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
};

export default LogOutButton;
