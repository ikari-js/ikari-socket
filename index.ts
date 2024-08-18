import type { Socket, udp } from "bun";
import TCPServer from "./decorators/tcp-server";
import { BaseTCPServer } from "./lib/tcp-server";
import "reflect-metadata";
import UDPServer from "./decorators/udp-server";
import { BaseUDPServer } from "./lib/udp-server";

@TCPServer({ address: "localhost", port: 3000 })
class SampleTCP extends BaseTCPServer {
  protected onMessageReceived(socket: Socket, data?: Buffer): void {
    console.log("test");
  }

  protected onServerWillStart(): void {
    console.log("test");
  }
  protected onServerWillClose(): void {
    console.log("test");
  }
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

@TCPServer({ address: "localhost", port: 3001 })
class SampleTCP1 extends BaseTCPServer {
  protected onMessageReceived(socket: Socket, data?: Buffer): void {
    console.log("test");
  }

  protected onServerWillStart(): void {
    console.log("test");
  }

  protected onServerWillClose(): void {
    console.log("test");
  }
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

@UDPServer({ address: "localhost", port: 3002 })
class SampleUDP extends BaseUDPServer {
  protected onServerWillStart(): void {
    console.log("Server will start!");
  }
  protected onServerStarted(): void {
    console.log("Server started!");
  }
  protected onServerWillClose(): void {
    console.log("Server will start!");
  }
  protected onServerClosed(): void {
    console.log("Server will start!");
  }
  protected onMessageReceived(
    socket: udp.Socket<"buffer">,
    data?: Buffer,
    port?: number,
    address?: string
  ): void {
    console.log(data?.toString());
  }

  protected handleExceptions(socket: udp.Socket<"buffer">, error: Error): void {
    console.log("test");
  }

  protected onDrain(socket: udp.Socket<"buffer">): void {
    console.log("test");
  }
}

const servers = {
  tcpServers: [SampleTCP, SampleTCP1],
  udpServers: [SampleUDP],
};

function main() {
  const openedServers: string[] = [];
  servers.tcpServers.forEach((server) => {
    const informations = Reflect.getMetadata("tcp-server-informations", server);

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

  servers.udpServers.forEach((server) => {
    const informations = Reflect.getMetadata("udp-server-informations", server);

    const address = informations.address + ":" + informations.port;

    if (openedServers.includes(address)) {
      throw new Error("Address already in use!");
    }

    openedServers.push(address);

    Reflect.defineProperty(server.prototype, "_address", {
      value:
        informations.address === "localhost"
          ? "127.0.0.1"
          : informations.address,
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
