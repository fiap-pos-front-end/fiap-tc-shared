import { Injectable } from "@angular/core";
import { emit, on, off } from "../bus";

@Injectable({ providedIn: "root" })
export class EventBusService {
  emit = emit;
  on = on;
  off = off;
}
