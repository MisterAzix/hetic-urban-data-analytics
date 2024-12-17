import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET: Retrieve all bike stations from the database
export async function GET() {
  try {
    const bikeStations = await prisma.bikeStation.findMany();
    return NextResponse.json(bikeStations);
  } catch (error) {
    console.error('Error retrieving bike stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bike stations' },
      { status: 500 },
    );
  }
}

// POST: Create a new bike station record
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newBikeStation = await prisma.bikeStation.create({
      data: {
        external_id: body.external_id,
        name: body.name,
        latitude: body.latitude,
        longitude: body.longitude,
        timestamp: new Date(body.timestamp),
        free_bikes: body.free_bikes,
        empty_slots: body.empty_slots,
        total_capacity: body.total_capacity,
      },
    });

    return NextResponse.json(newBikeStation, { status: 201 });
  } catch (error) {
    console.error('Error creating bike station:', error);
    return NextResponse.json(
      { error: 'Failed to create bike station' },
      { status: 500 },
    );
  }
}

// PUT: Update an existing bike station by ID
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for update' },
        { status: 400 },
      );
    }

    const updatedBikeStation = await prisma.bikeStation.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(updatedBikeStation);
  } catch (error) {
    console.error('Error updating bike station:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to update bike station',
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}

// DELETE: Remove a bike station by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for deletion' },
        { status: 400 },
      );
    }

    await prisma.bikeStation.delete({
      where: { id: id },
    });

    return NextResponse.json({
      message: `Bike station with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting bike station:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to delete bike station',
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}
