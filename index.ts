import type { Socket } from "bun";
import Server from "./decorators/server";
import { TCPServer } from "./lib/tcp-server";
import "reflect-metadata";

@Server({ address: "localhost", port: 3000 })
class SampleTCP extends TCPServer {
  protected onServerStarted() {
    console.log("Server started!");
  }

  protected onDeviceConnected(socket: Socket, data?: Buffer) {
    console.log("Device connected! Data:", data?.toString());
  }

  protected onServerClosed() {
    console.log("Server closed!");
  }

  protected handleExceptions(socket: Socket, error: Error) {
    console.log("Error occurred!");
  }
}

@Server({ address: "localhost", port: 3001 })
class SampleTCP1 extends TCPServer {
  protected onServerStarted() {
    console.log("Server started!");
  }

  protected onDeviceConnected(socket: Socket, data?: Buffer) {
    console.log("Device connected! Data:", data?.toString());
  }

  protected onServerClosed() {
    console.log("Server closed!");
  }

  protected handleExceptions(socket: Socket, error: Error) {
    console.log("Error occurred!");
  }
}

const servers = [SampleTCP, SampleTCP1];

function main() {
  const openedServers: string[] = [];
  servers.forEach((server) => {
    const informations = Reflect.getMetadata("server-informations", server);

    const address = informations.address + ":" + informations.port;

    if (openedServers.includes(address)) {
      throw new Error("Address already in use!");
    }

    openedServers.push(address);

    Reflect.defineProperty(server.prototype, "_address", {
      value: informations.address,
      writable: false,
    });
    Reflect.defineProperty(server.prototype, "_port", {
      value: informations.port,
      writable: false,
    });

    server.prototype.initServer();
  });
}

main();
