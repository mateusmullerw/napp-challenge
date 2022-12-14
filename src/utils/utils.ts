export const numberToBrl = (number: number) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      let formattedString = formatter.format(number)
      
      return formattedString.slice(3)
}

export const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
};