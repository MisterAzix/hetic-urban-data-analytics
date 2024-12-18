import { NextResponse } from 'next/server';
import HttpStatusCode from '../HttpStatusCode';

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
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
      );
    }
  };
