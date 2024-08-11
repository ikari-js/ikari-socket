import { SocketServer } from "./socker-server";
import type { Socket, TCPSocketListener } from "bun";

export abstract class TCPServer extends SocketServer<TCPSocketListener> {
  constructor(protected address: string, protected port: number) {
    super();
  }

  protected start() {
    this.server = Bun.listen({
      hostname: this.address,
      port: this.port,
      socket: {
        data: this.onDeviceConnected.bind(this),
        open: this.onServerStarted.bind(this),
        close: this.onServerClosed.bind(this),
        error: this.handleExceptions.bind(this),
      },
    });
  }

  public close() {
    this.server.stop(true);
    this.server.unref();
  }

  protected abstract onServerStarted(): void;
  protected abstract onDeviceConnected(
    socket: Socket,
    data?: Buffer
  ): void | Promise<void>;
  protected abstract onServerClosed(): void;
  protected abstract handleExceptions(socket: Socket, error: Error): void;
}
