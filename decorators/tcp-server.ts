type Informations = {
  address: string;
  port: number;
};

export default function TCPServer(informations: Informations) {
  return function (target: any) {
    Reflect.defineMetadata("tcp-server-informations", informations, target);
  };
}
