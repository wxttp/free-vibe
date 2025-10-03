// "use server"
import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/user/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import SettingPage from "@/components/Setting/SettingPage";

export default async function Setting() {
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session);


  return (
    session && (
      <div className="w-full flex justify-center items-center h-[100vh]">
        <SettingPage
          userData={userData}
        />
      </div>
    )
  );
}
