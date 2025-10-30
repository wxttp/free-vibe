"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserData } from "@/lib/user/user";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DetailSetting = ({ userData }) => {
  const [form, setForm] = useState({email: userData.email});
  const [password,setPassword] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    const payload = {};
    e.preventDefault();
    if (form.email !== userData.email && form.email.trim() !== "") {
      if (form.email.trim() === "") {
        toast.error("Email is required");
        return;
      }
      payload.email = form.email;
    }

    if (Object.keys(payload).length === 0) {
      toast.error("No changes made");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    payload.password = password;
    try {
      const updatedUser = await updateUserData(userData.id, payload, password);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Card className="w-full min-w-sm p-5">
      <form action="">
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </form>
      <CardFooter className={"px-0"}>
        <Button
          type="submit"
          className="w-full bg-[var(--primary-color)] text-white py-2 rounded-md"
          onClick={handleSubmit}
        >
          Confirm Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetailSetting;
