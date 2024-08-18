import type { Options } from "../types";

export default function TCPServer(options: Options) {
  return function (target: any) {
    Reflect.defineMetadata("tcp-server-options", options, target);
  };
}
