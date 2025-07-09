import { EventBus, IEventBus } from "./EventBus";

export type Events = Record<string, any>;

const defaultBus: IEventBus<Events> = new EventBus<Events>();

export const emitEvent = defaultBus.emit.bind(defaultBus);
export const onEvent = defaultBus.on.bind(defaultBus);
export const offEvent = defaultBus.off.bind(defaultBus);
export const getLastEvent = defaultBus.getLast.bind(defaultBus);
