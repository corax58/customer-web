"use client";
import React, { useCallback, useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { getMessages } from "@/actions/profile.actions";
import { Message } from "@/types/profile.types";

import ChatBoard from "./ChatBoard";
import ChatFooter from "./ChatFooter";

const ChatBody = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const t = useTranslations("profile.help.chat");
  const fetchMessages = useCallback(async () => {
    const results = await getMessages();

    if (results.data) {
      setMessages(results.data);
    } else {
      toast.error(t("error.fetch_failed"), { description: results.error });
    }
  }, [t]);

  useEffect(() => {
    const intervalId = setInterval(fetchMessages, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  return (
    <div className="">
      <ChatBoard messages={messages} />
      <ChatFooter fetchMessages={fetchMessages} />
    </div>
  );
};

export default ChatBody;
