import { useRef, useState } from "react";

export const useTemporaryMessage = (timeout: number = 3000): [string, (value: string) => void] => {
  const [innerMessage, setInnerMessage] = useState("");
  const messageHideTimeout = useRef<number | null>(null);
  const setMessage = (message: string) => {
    if (messageHideTimeout.current != null) {
      clearTimeout(messageHideTimeout.current);
    }
    setInnerMessage(message);
    messageHideTimeout.current = setTimeout(() => {
      setInnerMessage("");
    }, timeout);
  };
  return [innerMessage, setMessage];
};
