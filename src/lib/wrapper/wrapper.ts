import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

interface Handler {
  (req: Request): Promise<any>;
}

export const wrapper =
  (handler: Handler) =>
  async (req: Request): Promise<NextResponse> => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('Error handling request:', error);
      return NextResponse.json(
        { error: `Internal Server Error: ${error}` },
        { status: StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  };
