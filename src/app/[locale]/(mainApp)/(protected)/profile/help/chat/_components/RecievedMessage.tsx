import React from "react";

interface RecievedMessageProps {
  message: string;
}
const RecievedMessage = ({ message }: RecievedMessageProps) => {
  return (
    <div className="flex w-full justify-start">
      <div className="bg-secondary dark:bg-secondary/80 flex w-fit max-w-3/5 flex-wrap rounded-3xl rounded-es-none border px-4 py-3 max-sm:max-w-4/5">
        <div>{message}</div>
        <div className="ms-2 flex flex-1 items-center justify-end text-sm">
          {/* 07:13 PM */}
        </div>
      </div>
    </div>
  );
};

export default RecievedMessage;
