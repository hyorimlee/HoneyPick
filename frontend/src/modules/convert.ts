/* 글자 원하는 개수만큼 자르기 */
export const stringSlice = (text: string, num: number) => {
  return text.length >= num
    ? `${text.split('\n').join(' ').slice(0, num)}...`
    : text
}

/* 숫자 3자리마다 콤마 찍기 */
export const moneyComma = (num: number | string) => {
  try {
    return !!parseInt(num.toString())
      ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : num.toString()
  } catch {
    return num
  }
}

export const recommendCollectionKey = {
  0: '내가 팔로우 중인 유저',
  1: '많은 사람들이 찜한 컬렉션',
  2: '팔로워 수가 많은 유저의 컬렉션',
}
