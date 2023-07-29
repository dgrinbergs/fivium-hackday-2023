import { handleEvent } from "@/types/events";
import { ReactNode, useContext, useEffect } from "react";
import { AppContext } from "./context";

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_EVENTS_URL;
    if (!url) {
      throw new Error("Missing NEXT_PUBLIC_EVENTS_URL environment variable");
    }
    const source = new EventSource(url);
    source.onmessage = (e) => handleEvent(dispatch, e);

    return () => source.close();
  }, []);

  return <>{children}</>;
}
