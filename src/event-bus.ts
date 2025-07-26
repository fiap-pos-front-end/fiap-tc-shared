import mitt, { Handler, Emitter } from "mitt";

export interface IEventBus<E extends Record<string, any>> {
  emit<K extends keyof E>(event: K, payload: E[K]): void;
  on<K extends keyof E>(
    event: K,
    handler: (payload: E[K]) => void,
    replayLast?: boolean
  ): void;
  off<K extends keyof E>(event: K, handler: (payload: E[K]) => void): void;
  getLast<K extends keyof E>(event: K): E[K] | undefined;
}

export class EventBus<E extends Record<string, any>> implements IEventBus<E> {
  private readonly bus: Emitter<E>;
  private readonly lastEvents: Partial<E> = {};

  constructor() {
    this.bus = mitt<E>();
  }

  public emit<K extends keyof E>(event: K, payload: E[K]): void {
    this.lastEvents[event] = payload;
    this.bus.emit(event, payload);
  }

  public on<K extends keyof E>(
    event: K,
    handler: (payload: E[K]) => void,
    replayLast = true
  ): void {
    if (replayLast && event in this.lastEvents) {
      handler(this.lastEvents[event] as E[K]);
    }
    this.bus.on(event, handler as Handler<E[K]>);
  }

  public off<K extends keyof E>(
    event: K,
    handler: (payload: E[K]) => void
  ): void {
    this.bus.off(event, handler as Handler<E[K]>);
  }

  public getLast<K extends keyof E>(event: K): E[K] | undefined {
    return this.lastEvents[event];
  }
}
