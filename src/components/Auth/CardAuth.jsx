import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music, Upload, ListMusic, HeartPlus, Play, icons } from "lucide-react";

const CardAuth = () => {
  return (
    <Card className=" w-full  max-w-2xl bg-white rounded-md flex items-center min-h-[540px]">
      <CardHeader className="w-full text-center  ">
        <div className="w-fit bg-[var(--primary-color)] rounded-full p-5 mx-auto ">
          <Music className="text-white" />
        </div>
        <div className="space-y-5">
          <CardTitle className='font-extrabold text-3xl text-[#7a3cdd]'>FREE-VIBE</CardTitle>
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
          <TabsContent
            value="login"
            className="animate-in fade-in zoom-in duration-1200 ease-in-out fill-mode-forwards"
          >
            <form action="" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="font-bold">Email</label>
                <Input
                  type="email"
                  className=""
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="font-bold">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button className="w-full">Login</Button>
            </form>
          </TabsContent>
          <TabsContent
            value="register"
            className="animate-in fade-in zoom-in duration-1200 ease-in-out fill-mode-forwards"
          >
            <form action="" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="font-bold">Email</label>
                <Input
                  type="email"
                  className=""
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="font-bold">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="font-bold">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
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
