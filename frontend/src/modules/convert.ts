/* 글자 원하는 개수만큼 자르기 */
export const stringSlice = (text: string, num: number) => {
  return text.length >= num ? `${text.slice(0, num)}...` : text
}

/* 숫자 3자리마다 콤마 찍기 */
export const moneyComma = (num: number | string) => {
  return !!parseInt(num.toString())
    ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : num.toString()
}
