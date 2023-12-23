import { NextResponse } from 'next/server';

type PerYear = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: { year: number; value: number }[];
    }[];
  };
};

/**
 * 型チェック
 * @param obj
 */
function isPerYear(obj: unknown): obj is PerYear {
  if (typeof obj === 'object' && obj !== null) {
    const safeObj = obj as PerYear;
    return (
      (typeof safeObj.message === 'string' || safeObj.message === null) &&
      typeof safeObj.result === 'object' &&
      typeof safeObj.result.boundaryYear === 'number' &&
      Array.isArray(safeObj.result.data) &&
      safeObj.result.data.every(
        (item) =>
          typeof item.label === 'string' &&
          Array.isArray(item.data) &&
          item.data.every(
            (subItem) =>
              typeof subItem.year === 'number' &&
              typeof subItem.value === 'number',
          ),
      )
    );
  }
  return false;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefCode = searchParams.get('prefCode');

  // クエリパラメータチェック
  if (!prefCode) {
    return NextResponse.json({ message: 'Bad Request.' }, { status: 400 });
  }

  try {
    const queryString = new URLSearchParams({ prefCode }).toString();
    const res = await fetch(
      `${process.env.RESAS_API_URL}/api/v1/population/composition/perYear?${queryString}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = (await res.json()) as unknown;

    // 型チェック
    if (isPerYear(data)) {
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'Not Found' }, { status: 404 });
}
