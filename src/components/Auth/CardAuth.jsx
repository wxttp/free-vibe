"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const CardAuth = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [login, setLogin] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleRegisterChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (register.password != register.confirmPassword) {
      toast.error("password not same!");
      return;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    });
    const data = await res.json();
    if (data.status === 200) {
      setRegister({ name: "", email: "", password: "", confirmPassword: "" });
      toast.success("Registeration successfull!");
      try {
        const result = await signIn("credentials", {
          email: register.email,
          password: register.password,
          redirect: false,
        });
        if (result.error) {
          console.log(result.error);
        } else {
          router.push("/home/library");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email: login.email,
        password: login.password,
        redirect: false,
      });
      if (result.error) {
        console.error(result.error);
      } else {
        toast.success("Login successfull!");
        router.push("/home/library");
      }
    } catch (error) {
      console.log("error", error);
    }
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
          <TabsContent value="login" className="">
            <form action="" onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="font-bold">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={login.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button className="w-full">Login</Button>
            </form>
          </TabsContent>
          <TabsContent value="register" className="">
            <form action="" onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={register.email}
                  onChange={handleRegisterChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="font-bold">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={register.password}
                  onChange={handleRegisterChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="font-bold">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={register.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Enter your confirm password"
                  required
                />
              </div>
              <Button className="w-full">Register</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CardAuth;
