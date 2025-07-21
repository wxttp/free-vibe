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

const CardAuth = () => {
  return (
    <Card className=" w-full max-w-2xl bg-white rounded-md flex justify-center items-center sm:h-[400px] md:h-[600px]">
      <CardHeader className="w-full text-center">
        svg
        <CardTitle>FREE-VIBE</CardTitle>
        <CardDescription>
          Your personal music library and playlist manager
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full max-w-xl flex-col gap-6 ">
        <Tabs className="" defaultValue='login'>
          <TabsList className="grid w-full grid-cols-2" >
            <TabsTrigger value='login'>Login</TabsTrigger>
            <TabsTrigger value='register'>Register</TabsTrigger>
          </TabsList>
          <TabsContent value='login' className="animate-in fade-in zoom-in duration-1200 ease-in-out fill-mode-forwards">
            <form action="" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  className=""
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button className="w-full">Login</Button>
            </form>
          </TabsContent>
          <TabsContent value='register' className='animate-in fade-in zoom-in duration-1200 ease-in-out fill-mode-forwards'>
            <form action="" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  className=""
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Confirm Password</label>
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
