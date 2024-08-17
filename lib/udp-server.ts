import type { udp } from "bun";
import { SocketServer } from "./socket-server";

export abstract class UDPServer extends SocketServer<udp.Socket<"buffer">> {
  constructor() {
    super();
  }

  async start() {
    this.onServerWillStart();

    this.server = await Bun.udpSocket({
      socket: {
        data: this.onMessageReceived.bind(this),
        error: this.handleExceptions.bind(this),
        drain: this.onDrain.bind(this),
      },
    });

    this.onServerStarted();
  }

  close() {
    this.onServerWillClose();
    this.server.close();
    this.server.unref();
    this.onServerClosed();
  }

  protected abstract onMessageReceived(
    socket: udp.Socket<"buffer">,
    data?: Buffer,
    port?: number,
    address?: string
  ): void;
  protected abstract handleExceptions(
    socket: udp.Socket<"buffer">,
    error: Error
  ): void;
  protected abstract onDrain(socket: udp.Socket<"buffer">): void;
}
