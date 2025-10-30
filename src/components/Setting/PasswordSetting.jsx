import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { updateUserPassword } from "@/lib/user/user";
import { Button } from "@/components/ui/button";
const PasswordSetting = ({ userData }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    
    const payload = {};
    e.preventDefault();
    if (form.oldPassword.trim() === "") {
      toast.error("Current password is required");
      return;
    }
    if (form.newPassword.trim() === "") {
      toast.error("New password is required");
      return;
    }
    if (form.confirmPassword.trim() === "") {
      toast.error("Confirm password is required");
      return;
    }
    if (form.oldPassword.length < 8) {
      toast.error("Current password must be at least 8 characters long");
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }
    if (form.confirmPassword.length < 8) {
      toast.error("Confirm password must be at least 8 characters long");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    payload.oldPassword = form.oldPassword;
    payload.newPassword = form.newPassword;
    try {
      const updatedUser = await updateUserPassword(userData.id, payload);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Card className="w-full min-w-sm p-5">
      {/* <CardHeader>
        <CardTitle className="text-2xl font-bold">Setting</CardTitle>
        <CardDescription className="text-gray-500 space-y-2">
          Change your password
        </CardDescription>
      </CardHeader> */}
      <form action="">
        <div className="mb-4">
          <Label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </Label>
          <Input
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            type="password"
            id="currentPassword"
            name="oldPassword"
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
            value={form.newPassword}
            onChange={handleChange}
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
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
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

export default PasswordSetting;
