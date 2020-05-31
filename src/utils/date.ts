import dfnsParse from "date-fns/parse";
import fnsFormat from "date-fns/format";

export function parse(date) {
  return dfnsParse(date, "dd/MM/yyyy", new Date());
}

export function format(date, dateFormat = "dd/MM/yyyy") {
  return fnsFormat(date, dateFormat);
}

export function parseAndFormat(date: string | Date, dateFormat?: string) {
  if (date instanceof Date) {
    return format(date, dateFormat);
  }

  if (typeof date === "string") {
    const parsed = parse(date);
    return format(parsed, dateFormat);
  }
}
