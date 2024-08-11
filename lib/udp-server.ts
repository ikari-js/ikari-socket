import { SocketServer } from "./socket-server";
import type { Socket, udp } from "bun";

export abstract class UDPServer extends SocketServer<udp.Socket<"buffer">> {
  constructor(protected address: string, protected port: number) {
    super();
  }

  protected async start() {
    this.server = await Bun.udpSocket({
      hostname: this.address,
      port: this.port,
      socket: {
        data(socket, buf, port, addr) {
          console.log(`message from ${addr}:${port}:`);
          console.log(buf.toString());
        },
        drain: this.onDrain.bind(this),
        error(socket, error) {
          this.handleExceptions(socket, error);
        },
      },
    });
  }

  public close() {
    this.server.close();
  }

  protected abstract onData(socket: Socket, data: Buffer): void | Promise<void>;

  protected abstract onServerStarted(): void;
  protected abstract onServerClosed(): void;
  protected abstract onDrain(socket: Socket): void | Promise<void>;
  protected abstract handleExceptions(socket: Socket, error: Error): void;
}
