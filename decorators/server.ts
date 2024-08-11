type Informations = {
  address: string;
  port: number;
};

export default function Server(informations: Informations): ClassDecorator {
  return function (target: any) {
    Reflect.defineProperty(target.prototype, "_address", {
      value: informations.address,
      writable: false,
    });

    Reflect.defineProperty(target.prototype, "_port", {
      value: informations.port,
      writable: false,
    });

    target.prototype.initServer();
  };
}
