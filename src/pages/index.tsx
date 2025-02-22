import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import React, { useState } from "react";


const Login = () => {
  const [email,setEmail] =  useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if(email === "demouser" && password === "demopass"){
      router.push("/dashboard")
    }else {
      setError("invalid credentials, Try Again");
    }
  }
  return <div className="flex justify-center items-center min-h-screen bg-red-400">
       <Card className="p-6 shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
          />
          <Input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
          />
          <Button onClick={handleLogin} className="w-full">Login</Button>
       </Card>
  </div>;
};

export default Login;
