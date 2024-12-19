import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import { BikeService } from './services/bike.service';
import { Cron } from './cron';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const REFRESH_DATA_INTERVAL = 30 * 1000;

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.info(`Client connected! ${socket.id}`);
  });

  const bikeService = new BikeService(process.env.BIKE_API_URL);

  const cron = new Cron(async () => {
    await bikeService.fetchBikeStationsFromApi();
    io.emit('bikes', { message: 'Bike stations updated!' });
  }, REFRESH_DATA_INTERVAL);

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      cron.start();
    });
});
