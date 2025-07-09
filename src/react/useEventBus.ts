import { useEffect } from "react";
import { on, off } from "../bus";

export function useEventBus(event: string, handler: any) {
  useEffect(() => {
    on(event, handler);
    return () => off(event, handler);
  }, [event, handler]);
}
