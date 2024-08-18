export abstract class SocketServer<T> {
  protected server!: T;
  private _address: string | undefined;
  private _port: number | undefined;

  protected get address(): string {
    return this._address!;
  }

  protected get port(): number {
    return this._port!;
  }

  public initServer(): void {
    if (this._address === undefined || this._port === undefined)
      throw new Error("You have to define address and port!");
    this.start();
  }
  public abstract close(): void;

  protected abstract start(): void;
  protected abstract onServerWillStart(): void;
  protected abstract onServerStarted(): void;
  protected abstract onServerWillClose(): void;
  protected abstract onServerClosed(): void;
}
