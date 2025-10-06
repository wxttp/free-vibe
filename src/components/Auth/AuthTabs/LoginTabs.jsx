import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleSignIn from "@/components/Auth/Button/GoogleSignIn";

const LoginTabs = ({ handleLoginChange, login, setLogin }) => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (login.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      const result = await signIn("credentials", {
        email: login.email,
        password: login.password,
        redirect: false,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successfull!");
        router.push("/home/library");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
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
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            value={login.password}
            onChange={handleLoginChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <Button className="w-full">Login</Button>
      </form>
      <br />
      <GoogleSignIn
        onClick={() => signIn("google", { callbackUrl: "/home/library" })}
      />
    </TabsContent>
  );
};

export default LoginTabs;
