import { SharedService } from './lib/shared.service';

export * from './lib/shared.service';

export function getHello(): string {
  return new SharedService().getHello();
}
