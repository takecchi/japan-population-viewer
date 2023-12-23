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
 * @throws Error
 */
function validatePerYear(obj: unknown): obj is PerYear {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid object.');
  }

  const safeObj = obj as PerYear;

  if (typeof safeObj.message !== 'string' && safeObj.message !== null) {
    throw new Error('Invalid message.');
  }

  if (typeof safeObj.result !== 'object') {
    throw new Error('Invalid result.');
  }

  if (typeof safeObj.result.boundaryYear !== 'number') {
    throw new Error('Invalid boundaryYear.');
  }

  if (!Array.isArray(safeObj.result.data)) {
    throw new Error('Invalid data array.');
  }

  for (const item of safeObj.result.data) {
    if (typeof item.label !== 'string') {
      throw new Error('Invalid label.');
    }

    if (!Array.isArray(item.data)) {
      throw new Error('Invalid data in item.');
    }

    for (const subItem of item.data) {
      if (typeof subItem.year !== 'number') {
        throw new Error('Invalid year.');
      }

      if (typeof subItem.value !== 'number') {
        throw new Error('Invalid value.');
      }
    }
  }

  return true;
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
    if (validatePerYear(data)) {
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
