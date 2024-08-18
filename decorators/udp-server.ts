type Informations = {
  address: string;
  port: number;
};

export default function UDPServer(informations: Informations) {
  return function (target: any) {
    Reflect.defineMetadata("udp-server-informations", informations, target);
  };
}
