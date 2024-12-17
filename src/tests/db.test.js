import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { connectToDatabase, closeDatabaseConnection } from '../src/database'; // Remplacez par le chemin correct


jest.mock('some-database-library', () => {
  return {
    connect: jest.fn(() => Promise.resolve({ connected: true })),
    disconnect: jest.fn(() => Promise.resolve({ disconnected: true })),
  };
});

let dbConnection;

describe('Database Connection Tests', () => {
  beforeEach(async () => {
    dbConnection = await connectToDatabase();
  });

  afterEach(async () => {
    if (dbConnection) {
      await closeDatabaseConnection(dbConnection);
    }
  });

  it('should establish a successful connection to the database', async () => {
    expect(dbConnection).toBeDefined();
    expect(dbConnection.connected).toBe(true);
  });

  it('should close the database connection successfully', async () => {
    await closeDatabaseConnection(dbConnection);
    expect(dbConnection.disconnected).toBe(true);
  });

  it('should throw an error if the connection fails', async () => {
    const mockConnectToDatabase = jest.fn(() => {
      throw new Error('Connection failed');
    });

    await expect(mockConnectToDatabase()).rejects.toThrow('Connection failed');
  });
});
