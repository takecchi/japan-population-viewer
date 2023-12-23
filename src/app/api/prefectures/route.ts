import { NextResponse } from 'next/server';

type Prefectures = {
  message: string | null;
  result: { prefCode: number; prefName: string }[];
};

/**
 * 型チェック
 * @param obj
 */
function isPrefectures(obj: unknown): obj is Prefectures {
  const safeObj = obj as Prefectures;
  return (
    (typeof safeObj.message === 'string' || safeObj.message === null) &&
    Array.isArray(safeObj.result) &&
    safeObj.result.every(
      (item) =>
        typeof item.prefCode === 'number' && typeof item.prefName === 'string',
    )
  );
}

export async function GET() {
  try {
    const res = await fetch(process.env.RESAS_API_URL + '/api/v1/prefectures', {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY,
      },
    });
    const data = (await res.json()) as unknown;
    if (isPrefectures(data)) {
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error occurred while fetching data from RESAS API' },
      { status: 500 },
    );
  }
}
