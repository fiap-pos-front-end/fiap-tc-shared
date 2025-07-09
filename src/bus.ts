import mitt, { Handler } from "mitt";

export type Events = Record<string, any>;
const emitter = mitt<Events>();

export const emit = (event: keyof Events, payload?: any) =>
  emitter.emit(event, payload);

export const on = (event: keyof Events, handler: Handler) =>
  emitter.on(event, handler);

export const off = (event: keyof Events, handler: Handler) =>
  emitter.off(event, handler);
