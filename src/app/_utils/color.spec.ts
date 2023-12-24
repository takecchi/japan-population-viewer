import { getColor } from './color';

describe('getColor', () => {
  // 色相ステップと配列の長さを再定義
  const hueStep = 360 / 47;
  const arrayLength = 47;

  it('prefCodeに対して正常に色を返却することを確認', () => {
    // 最初の色をテスト
    expect(getColor(1)).toBe(`hsl(0, 90%, 50%)`);

    // 中間の色をテスト
    const midPrefCode = 24;
    const midHue = (midPrefCode - 1) * hueStep;
    expect(getColor(midPrefCode)).toBe(`hsl(${midHue}, 90%, 50%)`);

    // 最後の色をテスト
    const lastHue = (arrayLength - 1) * hueStep;
    expect(getColor(arrayLength)).toBe(`hsl(${lastHue}, 90%, 50%)`);
  });

  it('配列長を超えるprefCodeの確認', () => {
    const overflowPrefCode = arrayLength + 1;
    expect(getColor(overflowPrefCode)).toBe(`hsl(0, 90%, 50%)`);
  });
});
