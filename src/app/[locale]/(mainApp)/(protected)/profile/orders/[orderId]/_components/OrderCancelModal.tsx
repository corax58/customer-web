"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import { cancelOrder } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/navigation";
import { CancelOrderSchema } from "@/lib/schemas/profile.schema";
interface OrderCancelModalProps {
  orderId: number;
}

const OrderCancelModal = ({ orderId }: OrderCancelModalProps) => {
  const t = useTranslations("profile.orders.order_detail.order_cancel_modal");
  const router = useRouter();
  const form = useForm<z.infer<typeof CancelOrderSchema>>({
    resolver: zodResolver(CancelOrderSchema),
  });

  async function onSubmit(data: z.infer<typeof CancelOrderSchema>) {
    const { success, error } = await cancelOrder(orderId, data.reason);

    if (success) {
      router.push("/profile/orders");
      toast.success(t("messages.success"));
    } else if (error) {
      toast.error(t("messages.error"));
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary w-full py-3 text-lg font-semibold text-white hover:bg-orange-600">
          {t("trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reason")}</FormLabel>
                  <FormControl>
                    <Textarea className="w-full resize-none" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t("cancel")}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderCancelModal;
