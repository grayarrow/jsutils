/**
 * Returns an HTML #FFFFFF color that is the percent between the start and end colors provided.
 * @param startColor The starting color for the gradient in HTML #FFFFFF format (# optional).
 * @param endColor The ending color for the gradient in HTML #FFFFFF format (# optional).
 * @param percent The percentage of the gradient scale you want returned.
 * @returns An HTML #FFFFFF formatted color that is the middle color of the percent between the start and end colors.
 */
export function interpolateColor(startColor: string, endColor: string, percent: number) {
  percent = percent / 100

  if (startColor.startsWith('#')) {
    startColor = startColor.substring(1)
  }
  if (endColor.startsWith('#')) {
    endColor = endColor.substring(1)
  }

  const n0 = startColor.match(/.{1,2}/g)!.map((oct) => parseInt(oct, 16) * (1 - percent))
  const n1 = endColor.match(/.{1,2}/g)!.map((oct) => parseInt(oct, 16) * percent)

  const ci = [0, 1, 2].map((i) => Math.min(Math.round(n0[i] + n1[i]), 255))

  return (
    '#' +
    ci
      .reduce((a, v) => (a << 8) + v, 0)
      .toString(16)
      .padStart(6, '0')
  )
}
