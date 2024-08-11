type Informations = {
  address: string;
  port: number;
};

export default function Server(informations: Informations) {
  return function (target: any) {
    Reflect.defineMetadata("server-informations", informations, target);
  };
}
