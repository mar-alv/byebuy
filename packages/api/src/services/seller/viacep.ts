import to from "await-to-js";
import axios, { AxiosResponse } from "axios";

interface GetLocationRequest {
  zipCode: string;
}

interface GetLocationResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export async function getLocation({
  zipCode,
}: GetLocationRequest): Promise<
  [Error | null, GetLocationResponse | undefined]
> {
  const [error, data] = await to<AxiosResponse<GetLocationResponse>>(
    axios.get<GetLocationResponse>(`https://viacep.com.br/ws/${zipCode}/json/`),
  );

  return [error, data?.data];
}
