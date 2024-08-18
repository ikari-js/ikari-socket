import { SocketServer } from "./socket-server";
import type { Socket, TCPSocketListener } from "bun";

export abstract class BaseTCPServer extends SocketServer<TCPSocketListener> {
  constructor() {
    super();
  }

  protected start() {
    this.onServerWillStart();

    this.server = Bun.listen({
      hostname: this.address,
      port: this.port,
      socket: {
        data: this.onMessageReceived.bind(this),
        open: this.onDeviceConnected.bind(this),
        close: this.onServerClosed.bind(this),
        error: this.handleExceptions.bind(this),
      },
    });

    this.onServerStarted();
  }

  public close() {
    this.onServerWillClose();

    this.server.stop(true);
    this.server.unref();

    this.onServerClosed();
  }

  protected abstract onDeviceConnected(
    socket: Socket,
    data?: Buffer
  ): void | Promise<void>;
  protected abstract onMessageReceived(socket: Socket, data?: Buffer): void;
  protected abstract handleExceptions(socket: Socket, error: Error): void;
}
