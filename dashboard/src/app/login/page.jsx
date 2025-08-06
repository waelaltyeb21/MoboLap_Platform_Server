"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import MoboButton from "@/components/ui/MoboButton";
import { RequestController } from "@/lib/RequestController";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const { control, register, handleSubmit } = useForm();

  const HandleLogin = async (user) => {
    const response = await RequestController("/auth/login", "POST", user);
    console.log(response);
    if (response?.status === 200) {
      console.log("LogedIn");
      router.push("/dashboard");
    }
  };
  return (
    <section className="min-h-dvh flex justify-center">
      <Card className="max-h-fit w-full sm:max-w-2/6 mt-20">
        <CardHeader>
          <CardTitle>تسجيل الدخول الى حسابك على منصة موبولاب</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(HandleLogin)}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الالكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "البريد الالكتروني مطلوب",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "ادخل بريد الكتروني صحيح",
                  },
                })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link
                  href="#"
                  className="mr-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  هل نسيت كلمة المرور ؟
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "كلمة المرور مطلوبة",
                  minLength: 8,
                })}
              />
            </div>
            <MoboButton type="submit" className="w-full cursor-pointer">
              تسجيل الدخول
            </MoboButton>
          </form>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2">
          <MoboButton className="w-full cursor-pointer" handler={HandleLogin}>
            تسجيل الدخول
          </MoboButton>
        </CardFooter> */}
      </Card>
    </section>
  );
}
