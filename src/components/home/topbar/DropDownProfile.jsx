import React, { useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
const DropDownProfile = ({ open, setOpen }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="absolute inset-0 opacity-0 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={dropdownRef}
        className="w-56"
        align="end"
        side="bottom"
        sideOffset={5}
        forceMount
      >
        <DropdownMenuLabel
          className="cursor-pointer text-red-500"
          onClick={() =>
            signOut({ callbackUrl: "/" }).then(() =>
              toast.success("Logout successfully")
            )
          }
        >
          Logout
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownProfile;
