
export function getRandomPort(): number {

  const min = 4000
  const max = 9000

  return Math.floor(Math.random() * (max - min) + min)

}
