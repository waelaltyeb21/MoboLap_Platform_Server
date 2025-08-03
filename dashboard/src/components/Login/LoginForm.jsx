"use client";
import React from "react";
import { Button } from "@/components/ui/button";
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

export default function LoginForm({ HandleLogin }) {
  return (
    <Card className="max-h-fit w-full max-w-2/6 mt-20">
      <CardHeader>
        <CardTitle>تسجيل الدخول الى حسابك على منصة موبولاب</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={HandleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الالكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
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
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          تسجيل الدخول
        </Button>
      </CardFooter>
    </Card>
  );
}
