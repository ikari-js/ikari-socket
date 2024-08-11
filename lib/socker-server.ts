import type { Socket } from "bun";

export abstract class SocketServer<T> {
  protected server!: T;
  protected address: string | undefined;
  protected port: number | undefined;

  public initServer(): void {
    if (this.address === undefined || this.port === undefined)
      throw new Error("You have to define address and port!");
    this.start();
  }
  public abstract close(): void;

  protected abstract start(): void;
  protected abstract onServerStarted(): void;
  protected abstract onServerClosed(): void;
  protected abstract handleExceptions(socket: Socket, error: Error): void;
}
