/** Normaliza texto para búsquedas: minúsculas y sin tildes. */
export function normalize(value: string): string {
  return value
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

/** Convierte AAAA-MM-DD en DD/MM/AAAA sin depender de la zona horaria. */
export function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return year && month && day ? `${day}/${month}/${year}` : iso;
}
