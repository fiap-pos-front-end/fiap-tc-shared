import mitt, { Handler } from "mitt";

export type Events = Record<string, any>;
const bus = mitt<Events>();

export const emitEvent = (event: keyof Events, payload?: any) =>
  bus.emit(event, payload);
export const onEvent = (event: keyof Events, handler: Handler) =>
  bus.on(event, handler);
export const offEvent = (event: keyof Events, handler: Handler) =>
  bus.off(event, handler);
