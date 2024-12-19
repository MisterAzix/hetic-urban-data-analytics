import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

type HandlerWithContext = (
  req: Request, 
  context: { params: Record<string, string> }
) => Promise<NextResponse>;

type HandlerWithoutContext = (
  req: Request
) => Promise<NextResponse>;

export const wrapperWithContext = 
  (handler: HandlerWithContext) =>
  async (
    req: Request,
    context: { params: Record<string, string> }
  ): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error('Error handling request:', error);
      return NextResponse.json(
        { error: `Internal Server Error: ${error}` },
        { status: StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  };

export const wrapperWithoutContext = 
  (handler: HandlerWithoutContext) =>
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
