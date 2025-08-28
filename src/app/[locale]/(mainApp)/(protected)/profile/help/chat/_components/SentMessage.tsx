import React from "react";

interface SentMessageProps {
  message: string;
}
const SentMessage = ({ message }: SentMessageProps) => {
  return (
    <div className="flex w-full justify-end">
      <div className="bg-primary dark:bg-primary/80 flex w-fit max-w-3/5 flex-wrap rounded-3xl rounded-br-none px-4 py-3 text-white max-sm:max-w-4/5">
        <div>{message}</div>
        <div className="ml-2 flex flex-1 items-center justify-end text-sm">
          {/* 07:13 PM */}
        </div>
      </div>
    </div>
  );
};

export default SentMessage;
