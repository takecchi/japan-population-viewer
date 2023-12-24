function generateColors() {
  const colors = [];
  const hueStep = 360 / 47; // 色相のステップ
  for (let i = 0; i < 47; i++) {
    const hue = i * hueStep;
    colors.push(`hsl(${hue}, 90%, 50%)`); // 彩度と明度は固定
  }
  return colors;
}

const colors = generateColors();

export function getColor(prefCode: number) {
  return colors[(prefCode - 1) % colors.length];
}
