import { useRouter } from "next/router";
import React from "react";
import { Button } from "./ui/button";

type Props = {};

const Navbar = (props: Props) => {
    const router = useRouter();
    const handleLogout = () => {
        router.push("/");
    }
  return <nav className="flex justify-between bg-gray-800 text-white p-4 ">
    <h1 className="font-bold text-lg">Lesson Planner</h1>
    <Button onClick={handleLogout} className="bg-red-500">Logout</Button>
  </nav>;
};

export default Navbar;
