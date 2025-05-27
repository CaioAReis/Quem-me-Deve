import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const convertToCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const convertDateToBR = (date: Date) => {
  return format(date, "dd/MM/yyyy", { locale: ptBR });
};

export const dateMask = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1/$2");

export const phoneMask = (e: string) => {
  let result = e.replace(/\D/g, "");

  if (result?.length === 13 || result?.length === 12) {
    result = result.slice(2, result?.length);
  }

  return parseInt(result.replace(/\D/g, ""), 10)
    .toString()
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{1})/, "($1) $2")
    .replace(/(\d{5})(\d{1})/, "$1-$2")
    .replace(/(\d{4})/, "$1");
};
