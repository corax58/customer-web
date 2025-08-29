"use client";
import { FormEvent, useState } from "react";

import { SendHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { sendMessage } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface ChatFooterProps {
  fetchMessages: () => void;
}

const ChatFooter = ({ fetchMessages }: ChatFooterProps) => {
  const [message, setMessage] = useState("");
  const t = useTranslations("profile.help.chat");
  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    if (!user) return;
    if (message.trim() == "") return;
    e.preventDefault();
    const results = await sendMessage({
      fromId: user.id,
      fromName: user.full_name,
      toId: 0,
      toName: "Support",
      message,
      createdOn: new Date().toString(),
      isRead: false,
      stateId: 0,
      fromUserProfileFile: user.profile_file,
      toUserProfileFile: "",
      typeId: 0,
      sendOn: new Date().toString(),
    });

    if (results.success) {
      setMessage("");
      fetchMessages();
      return;
    } else {
      toast.error(results.error);
    }
  };
  return (
    <form
      className="relative flex w-full items-center border-t p-4"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder={t("placeholder")}
        className="h-12 w-full rounded-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        size={"icon"}
        type="submit"
        className="absolute end-6 flex items-center justify-center rounded-full"
        disabled={!user}
      >
        <SendHorizontal />
      </Button>
    </form>
  );
};

export default ChatFooter;
