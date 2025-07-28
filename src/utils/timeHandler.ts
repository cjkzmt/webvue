import dayjs from 'dayjs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const timeFormatter = (row: any, column: any, value: string) => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}
