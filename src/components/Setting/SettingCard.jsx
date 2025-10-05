"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DetailSetting from "./DetailSetting";
import PasswordSetting from "./PasswordSetting";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
const SettingCard = ({ userData }) => {
  const [form, setForm] = useState({
    name: userData.name,
    email: userData.email,
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });

  return (
    <Tabs defaultValue="profile" className="w-full max-w-2xl min-w-sm p-5">
      <Card className="w-full max-w-2xl min-w-sm p-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Setting</CardTitle>
          <CardDescription className="text-gray-500 space-y-2">
            Change your detail information or password
          </CardDescription>
        </CardHeader>
        <TabsList className="min-w-lg flex self-center items-center justify-center h-[40px]">
          <TabsTrigger value="profile" className="w-fit h-fit">
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="w-fit h-fit">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <DetailSetting userData={userData} />
        </TabsContent>
        <TabsContent value="password">
          <PasswordSetting userData={userData} />
        </TabsContent>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full bg-blue-500 text-white py-2 rounded">
                  Logout
        </button>
      </Card>
    </Tabs>
  );
};

export default SettingCard;
