/**
 * OffsetDateTime 문자열을 'YYYY.MM.DD HH:mm' 형식으로 변환
 * @param dateString - OffsetDateTime 형식의 날짜 문자열
 * @returns 포맷된 날짜 문자열 또는 '-'
 */
export const formatDateTime = (dateString: string): string => {
  if (!dateString) {
    return '-'
  }

  try {
    const date = new Date(dateString)

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return dateString
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}.${month}.${day} ${hours}:${minutes}`

  } catch {
    return dateString
  }
}

/**
 * Date 객체를 'yyyyMMddHHmmss+09:00' 형식으로 변환
 * @param date - Date 객체
 * @returns 포맷된 날짜 문자열 (timezone offset 포함)
 */
export const formatDateToCompactWithOffset = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // timezone offset 계산 (분 단위)
  const offset = -date.getTimezoneOffset()
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0')
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0')
  const offsetSign = offset >= 0 ? '+' : '-'

  return `${year}${month}${day}${hours}${minutes}${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`
}
