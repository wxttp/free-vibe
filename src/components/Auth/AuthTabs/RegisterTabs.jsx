"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterTabs = ({ handleRegisterChange, register, setRegister }) => {
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (register.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    if (register.password != register.confirmPassword) {
      toast.error("Passwords do not match!");
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
          confirmPassword: register.confirmPassword,
          redirect: false,
        });
        if (result.error) {
          toast.error(result.error);
        } else {
          router.push("/home/library");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(data.error);
    }
  };
  return (
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
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
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
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            value={register.confirmPassword}
            onChange={handleRegisterChange}
            placeholder="Enter your confirm password"
            required
          />
        </div>
        <Button className="w-full">Register</Button>
      </form>
    </TabsContent>
  );
};
export default RegisterTabs;
