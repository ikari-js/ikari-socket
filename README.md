# Ikari Socket

**Ikari Socket** is a class-based socket programming library for Bun, designed to be simple and easy to use. Whether you're building a real-time application or need to manage network connections, Ikari Socket provides a straightforward API for handling socket communications efficiently.

## Table of Contents

- [Ikari Socket](#ikari-socket)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Reference](#api-reference)
    - [Classes](#classes)
    - [Methods](#methods)
    - [Decorators](#decorators)
  - [Contributing](#contributing)
  - [Contributors](#contributors)

## Installation

To use Ikari Socket, you need [Bun](https://bun.sh). If you haven't installed Bun yet, follow the instructions on their [official website](https://bun.sh).

Install Ikari Socket with the following command:

```bash
bun add ikari-socket
```

## Usage

Here's a simple example of how to create a server and client using Ikari Socket:

```typescript
// server.ts
import type { Socket, udp } from "bun";
import { init, BaseTCPServer, BaseUDPServer  } from "ikari-socket";
import { TCPServer, UDPServer } from "ikari-socket/decorators";

@TCPServer({ address: "localhost", port: 3000 })
class SampleTCP extends BaseTCPServer {
  protected onMessageReceived(socket: Socket, data?: Buffer): void {
    throw new Error("Method not implemented.");
  }

  protected onServerWillStart(): void {
    throw new Error("Method not implemented.");
  }

  protected onServerWillClose(): void {
    throw new Error("Method not implemented.");
  }

  protected onServerStarted() {
    throw new Error("Method not implemented.");
  }

  protected onDeviceConnected(socket: Socket, data?: Buffer) {
    throw new Error("Method not implemented.");
  }

  protected onServerClosed() {
    throw new Error("Method not implemented.");
  }

  protected handleExceptions(socket: Socket, error: Error) {
   throw new Error("Method not implemented.");
  }
}

@UDPServer({ address: "localhost", port: 3002 })
class SampleUDP extends BaseUDPServer {
  protected onServerWillStart(): void {
    throw new Error("Method not implemented.");
  }
  protected onServerStarted(): void {
    throw new Error("Method not implemented.");
  }
  protected onServerWillClose(): void {
    throw new Error("Method not implemented.");
  }
  protected onServerClosed(): void {
    throw new Error("Method not implemented.");
  }
  protected onMessageReceived(
    socket: udp.Socket<"buffer">,
    data?: Buffer,
    port?: number,
    address?: string
  ): void {
    throw new Error("Method not implemented.");
  }

  protected handleExceptions(socket: udp.Socket<"buffer">, error: Error): void {
    throw new Error("Method not implemented.");
  }

  protected onDrain(socket: udp.Socket<"buffer">): void {
    throw new Error("Method not implemented.");
  }
}

init({
    tcpServers: [SampleTCP],
    udpServers: [SampleUDP],
});

```

## API Reference

The following are the classes and methods available in Ikari Socket:

### Classes

- `BaseTCPServer`: The base class for creating a TCP server.
- `BaseUDPServer`: The base class for creating a UDP server.

### Methods

- `init(options: InitOptions)`: Initializes the server with the specified options.

### Decorators

- `TCPServer(options: TCPServerOptions)`: Decorator for creating a TCP server.
- `UDPServer(options: UDPServerOptions)`: Decorator for creating a UDP server.

## Contributing

If you'd like to contribute to Ikari Socket, please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## Contributors

<a href = "https://github.com/ikari-js/ikari/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=ikari-js/ikari-socket"/>
</a>
