"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import RegisterTabs from "@/components/Auth/AuthTabs/RegisterTabs";
import LoginTabs from "@/components/Auth/AuthTabs/LoginTabs";

const CardAuth = () => {
  // State
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [login, setLogin] = useState({ email: "", password: "" });

  // Handler for login input change
  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  // Handler for register input change
  const handleRegisterChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <Card className=" w-full  max-w-2xl bg-white rounded-md flex items-center min-h-[540px]">
      <CardHeader className="w-full text-center  ">
        <div className="w-fit bg-[var(--primary-color)] rounded-full p-5 mx-auto ">
          <Music className="text-white" />
        </div>
        <div className="space-y-5">
          <CardTitle className="font-extrabold text-3xl text-[#7a3cdd]">
            FREE-VIBE
          </CardTitle>
          <CardDescription>
            Your personal music library and playlist manager
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="w-full max-w-xl flex-col gap-6 ">
        <Tabs className="" defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <LoginTabs
            handleLoginChange={handleLoginChange}
            login={login}
            setLogin={setLogin}
          />
          <RegisterTabs
            handleRegisterChange={handleRegisterChange}
            register={register}
            setRegister={setRegister}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CardAuth;
