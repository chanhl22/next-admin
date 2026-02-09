export const parsePhoneNum = (phoneNumber: string): string => {
  if (phoneNumber.startsWith('+82')) {
    return '0' + phoneNumber.slice(3)
  }
  return phoneNumber
}
