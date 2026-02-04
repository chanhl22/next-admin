export const diffFromNow = (targetTime: string): number => {
  const d = targetTime.replace('Z', '')

  const year = Number(d.slice(0, 4))
  const month = Number(d.slice(4, 6)) - 1 // Date는 0-based
  const day = Number(d.slice(6, 8))
  const hour = Number(d.slice(8, 10))
  const minute = Number(d.slice(10, 12))
  const second = Number(d.slice(12, 14))

  const targetDate = new Date(Date.UTC(year, month, day, hour, minute, second))

  return targetDate.getTime() - Date.now()
}
