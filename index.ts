import { BaseTCPServer } from "./src/lib/tcp-server";
import "reflect-metadata";
import { BaseUDPServer } from "./src/lib/udp-server";

export type InitOptions = {
  tcpServers: (new () => BaseTCPServer)[];
  udpServers: (new () => BaseUDPServer)[];
};

export function init(servers: InitOptions) {
  const openedServers: string[] = [];

  servers.tcpServers.forEach((server) => {
    const options = Reflect.getMetadata("tcp-server-options", server);

    const address = options.address + ":" + options.port;

    if (openedServers.includes(address)) {
      throw new Error("Address already in use!");
    }

    openedServers.push(address);

    Reflect.defineProperty(server.prototype, "_address", {
      value: options.address,
      writable: false,
    });

    Reflect.defineProperty(server.prototype, "_port", {
      value: options.port,
      writable: false,
    });

    server.prototype.initServer();
  });

  servers.udpServers.forEach((server) => {
    const options = Reflect.getMetadata("udp-server-options", server);

    const address = options.address + ":" + options.port;

    if (openedServers.includes(address)) {
      throw new Error("Address already in use!");
    }

    openedServers.push(address);

    Reflect.defineProperty(server.prototype, "_address", {
      value: options.address === "localhost" ? "127.0.0.1" : options.address,
      writable: false,
    });

    Reflect.defineProperty(server.prototype, "_port", {
      value: options.port,
      writable: false,
    });

    server.prototype.initServer();
  });
}
