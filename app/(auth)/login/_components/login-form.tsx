"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoging, setIsLoging] = useState(false);

  async function handleLogin(data: z.infer<typeof formSchema>) {
    setIsLoging(true);
    setLoginError("");

    setTimeout(() => {
      if (data.username === "admin" && data.password === "password") {
        router.push("/");
      } else {
        setLoginError("Invalid username or password");
      }
      setIsLoging(false);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login with your admin credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(handleLogin)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="username"
                    aria-invalid={fieldState.invalid}
                  >
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => {
                const [showPassword, setShowPassword] = useState(false);

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="password"
                      aria-invalid={fieldState.invalid}
                    >
                      Password
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="inline-end">
                        {showPassword ? (
                          <EyeIcon
                            className="cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <EyeOffIcon
                            className="cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="login-form" className="cursor-pointer">
            {isLoging ? "Logging in..." : "Login"}
          </Button>
          {loginError && (
            <FieldError className="text-center">{loginError}</FieldError>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
}
