import {
  formatAgeGroup,
  formatBorough,
  GetCrimesParams,
} from '@/lib/crimes.utils';
import prisma from '@/lib/prisma';
import { AGE_GROUP, NEW_YORK_BOROUGH } from '@prisma/client';
import { NextResponse } from 'next/server';

// GET: Retrieve crimes from the database
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const age_group = searchParams.get('age_group');
    const borough = searchParams.get('borough');
    const summons_date = searchParams.get('summons_date');
    const offense_description = searchParams.get('offense_description');

    const where: GetCrimesParams = {};

    if (age_group) {
      where['age_group'] = formatAgeGroup(age_group) as AGE_GROUP;
    }
    if (borough) {
      where['borough'] = formatBorough(borough) as NEW_YORK_BOROUGH;
    }
    if (summons_date) {
      where['summons_date'] = new Date(summons_date);
    }
    if (offense_description) {
      where['offense_description'] = { contains: offense_description };
    }

    const crimes = await prisma.crime.findMany({ where });
    return NextResponse.json(crimes);
  } catch (error) {
    console.error('Error retrieving crimes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crimes' },
      { status: 500 },
    );
  }
}

// POST: Create a new crime record
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const age_group = formatAgeGroup(body.age_group);
    const borough = formatBorough(body.borough);
    const summons_date = new Date(body.summons_date);

    const newCrime = await prisma.crime.create({
      data: {
        external_id: body.external_id,
        latitude: body.latitude,
        longitude: body.longitude,
        age_group: age_group,
        sex: body.sex,
        race: body.race,
        summons_date: summons_date,
        offense_description: body.offense_description,
        borough: borough,
      },
    });

    return NextResponse.json(newCrime, { status: 201 });
  } catch (error) {
    console.error('Error creating crime:', error);
    return NextResponse.json(
      { error: 'Failed to create crime' },
      { status: 500 },
    );
  }
}

// PUT: Update an existing crime by ID
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

    // Optional formatting of fields
    if (updateData.age_group) {
      updateData.age_group = formatAgeGroup(updateData.age_group);
    }
    if (updateData.borough) {
      updateData.borough = formatBorough(updateData.borough);
    }
    if (updateData.summons_date) {
      updateData.summons_date = new Date(updateData.summons_date);
    }

    console.log('Update Data:', updateData);

    const updatedCrime = await prisma.crime.update({
      where: { id: id }, // Use the ID as a string
      data: updateData,
    });

    return NextResponse.json(updatedCrime);
  } catch (error) {
    console.error('Error updating crime:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to delete crime', details: errorMessage },
      { status: 500 },
    );
  }
}

// DELETE: Remove a crime by ID
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

    await prisma.crime.delete({
      where: { id: id }, // Utilisez l'ID tel quel si c'est une chaîne UUID
    });

    return NextResponse.json({
      message: `Crime with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting crime:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to delete crime', details: errorMessage },
      { status: 500 },
    );
  }
}
