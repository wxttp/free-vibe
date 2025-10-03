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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
const SettingPage = ({ userData }) => {
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  return (
    <Card className="w-full max-w-md p-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Setting</CardTitle>
        <CardDescription className="text-gray-500 space-y-2">
          Change your password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action="">
          <div className="mb-4">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </Label>
            <Input
              value={name}      
              onChange={handleNameChange}
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              value={email}
              onChange={handleEmailChange}
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </Label>
            <Input
              placeholder="Enter current password"
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </Label>
            <Input
              placeholder="Enter new password"
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </Label>
            <Input
              placeholder="Confirm new password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full bg-[var(--primary-color)] text-white py-2 rounded-md"
        >
          Confirm Changes
        </Button>
      </CardFooter>
      {/* <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full bg-blue-500 text-white py-2 rounded"> */}
      {/* Logout */}
      {/* </button> */}
    </Card>
  );
};

export default SettingPage;
