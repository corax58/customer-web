"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { changePassword } from "@/actions/profile.actions";
import CustomLink from "@/components/CustomLink";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { changePasswordSchema } from "@/lib/schemas/profile.schema";
import { cn } from "@/lib/utils";

interface ChangePasswordFormProps {
  className?: string;
}
const ChangePasswordForm = ({ className }: ChangePasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { password: "", confirm_password: "" },
  });

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    setIsLoading(true);
    const result = await changePassword({ User: values });
    if (result.error) {
      toast.error("Error", { description: result.error });
    }
    if (result.success) {
      toast.success("Successfully changed password");
      router.push("/home");
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            <CustomLink href="/" className="mb-4">
              <Logo className="h-9 w-24" />
            </CustomLink>

            <h1 className="text-xl font-bold">Change Password</h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                        <button
                          className="-m-6 cursor-pointer"
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                        <button
                          className="-m-6 cursor-pointer"
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Change password"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
