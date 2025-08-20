"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .minUppercase(1)
    .min(6),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const link = "https://sapiddock-us.backendless.app/api/users/register";
        await axios.post(link, {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        alert("Register success");
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your data below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* NAME */}
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />

                {!!formik.touched.name && !!formik.errors.name && (
                  <p className="text-xs text-red-500">{formik.errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />

                {!!formik.touched.email && !!formik.errors.email && (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />

                {!!formik.touched.password && !!formik.errors.password && (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoading ? "Loading" : "Register"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
