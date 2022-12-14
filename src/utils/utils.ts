export const numberToBrl = (number: number) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      let formattedString = formatter.format(number)
      
      return formattedString.slice(3)
}

export const formatPrice = (price: number) => {
  let strPrice = price.toString();
  strPrice = strPrice.replace(/([0-9]{2})$/g, ",$1");
  if (strPrice.length > 6)
    strPrice = strPrice.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  if (strPrice.length > 10)
    strPrice = strPrice.replace(
      /([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
      ".$1.$2,$3"
    );
  return strPrice;
};

export const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
};

