"use client";

import { Card, Separator } from "@heroui/react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";  // ✅ redirect এর বদলে
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();  // ✅ add করুন

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      
      console.log("Login error:", error);
      toast.error(error?.message || "Login failed. Check your credentials.");
      return;
    }

    if (data) {
      toast.success("Login successful!");
      router.push("/");      
      router.refresh();      
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Start your adventure with DocAppoint</p>
      </div>
      <Card className="border rounded-none">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="password"
            type="password"
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2">
            <Button className={"rounded-none w-full bg-cyan-500"} type="submit">
              Login
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-3">
          <Separator />
          <div className="whitespace-nowrap"> Or sign in with </div>
          <Separator />
        </div>
        <div>
          <Button
            onClick={handleGoogleSignin}
            variant="outline"
            className={"w-full rounded-none"}
          >
            <FcGoogle /> Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;