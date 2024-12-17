import prisma from '@/lib/prisma';
import {AGE_GROUP, NEW_YORK_BOROUGH} from '@prisma/client';
import { NextResponse } from 'next/server';

// Utility function for formatting age group
function formatAgeGroup(age_group: string): AGE_GROUP {
  switch (age_group) {
    case '<18':
      return AGE_GROUP.LESS_THAN_18;
    case '18-24':
      return AGE_GROUP.AGE_18_TO_24;
    case '25-44':
      return AGE_GROUP.AGE_25_TO_44;
    case '45-64':
      return AGE_GROUP.AGE_45_TO_64;
    case '65+':
      return AGE_GROUP.AGE_65_PLUS;
    default:
      return AGE_GROUP.UNKNOWN;
  }
}

// Utility function for formatting borough
function formatBorough(borough: string): NEW_YORK_BOROUGH {
  switch (borough) {
    case 'MANHATTAN':
      return NEW_YORK_BOROUGH.MANHATTAN;
    case 'BRONX':
      return NEW_YORK_BOROUGH.BRONX;
    case 'BROOKLYN':
      return NEW_YORK_BOROUGH.BROOKLYN;
    case 'QUEENS':
      return NEW_YORK_BOROUGH.QUEENS;
    case 'STATEN ISLAND':
      return NEW_YORK_BOROUGH.STATEN_ISLAND;
    default:
      return NEW_YORK_BOROUGH.NEW_YORK;
  }
}

// GET: Retrieve all crimes from the database
export async function GET() {
  try {
    const crimes = await prisma.crime.findMany();
    return NextResponse.json(crimes);
  } catch (error) {
    console.error('Error retrieving crimes:', error);
    return NextResponse.json({ error: 'Failed to fetch crimes' }, { status: 500 });
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
    return NextResponse.json({ error: 'Failed to create crime' }, { status: 500 });
  }
}

// PUT: Update an existing crime by ID
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
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
    return NextResponse.json({ error: 'Failed to update crime', details: (error as any).message }, { status: 500 });
  }
}

// DELETE: Remove a crime by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
    }

    await prisma.crime.delete({
      where: { id: id }, // Utilisez l'ID tel quel si c'est une chaîne UUID
    });

    return NextResponse.json({ message: `Crime with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting crime:', error);
    return NextResponse.json({ error: 'Failed to delete crime', details: (error as any).message }, { status: 500 });
  }
}
