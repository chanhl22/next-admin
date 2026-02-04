type Format =
  | 'YYYY-MM-DD HH:MM:SS'
  | 'YYYY-MM-DD HH:MM'
  | 'YY-MM-DD HH:MM'
  | 'MM-DD HH:MM'
  | 'MM-DD'

export const parseUtcZ = (input: string, format: Format): string => {
  const d = input.replace('Z', '')

  const y = d.slice(0, 4)
  const m = d.slice(4, 6)
  const day = d.slice(6, 8)
  const h = d.slice(8, 10) || '00'
  const min = d.slice(10, 12) || '00'
  const s = d.slice(12, 14) || '00'

  switch (format) {
    case 'YYYY-MM-DD HH:MM:SS':
      return `${y}-${m}-${day} ${h}:${min}:${s}`
    case 'YYYY-MM-DD HH:MM':
      return `${y}-${m}-${day} ${h}:${min}`
    case 'YY-MM-DD HH:MM':
      return `${y.slice(2)}-${m}-${day} ${h}:${min}`
    case 'MM-DD HH:MM':
      return `${m}-${day} ${h}:${min}`
    case 'MM-DD':
      return `${m}-${day}`
  }
}
