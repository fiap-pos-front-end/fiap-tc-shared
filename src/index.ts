import { EventBus, IEventBus } from "./EventBus";

const BUS_KEY = Symbol.for("@minhaorg/shared-event-bus");

function getGlobalBus(): IEventBus<Record<string, any>> {
  const g = globalThis as any;
  if (!g[BUS_KEY]) {
    g[BUS_KEY] = new EventBus();
  }
  return g[BUS_KEY];
}

const defaultBus = getGlobalBus();

export const emitEvent = defaultBus.emit.bind(defaultBus);
export const onEvent = defaultBus.on.bind(defaultBus);
export const offEvent = defaultBus.off.bind(defaultBus);
export const getLastEvent = defaultBus.getLast.bind(defaultBus);
