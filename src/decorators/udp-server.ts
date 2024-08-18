import type { Options } from "../types";

export default function UDPServer(options: Options) {
  return function (target: any) {
    Reflect.defineMetadata("udp-server-options", options, target);
  };
}
