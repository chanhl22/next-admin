import { NextResponse } from "next/server";

const MOCK_POSTS =
    {
      code: 0,
      message: "success",
      data: [
        {
          id: 1,
          author: {
            name: "test User",
          },
          createdAt: "10분전",
        },
        {
          id: 2,
          author: {
            name: "test User2",
          },
          createdAt: "20분전",
        },
        // 나머지 데이터...
      ]
    }
;

export async function GET() {
  try {
    return NextResponse.json(MOCK_POSTS);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
