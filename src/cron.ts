export class Cron {
  private readonly interval: number = 1000;
  private readonly handler: (() => void) | null = null;
  private isRunning = false;
  private timer: NodeJS.Timeout | null = null;

  constructor(handler: () => void, timeout?: number) {
    this.handler = handler;
    if (timeout) {
      this.interval = timeout;
    }
  }

  public start(): void {
    if (this.isRunning) {
      return;
    }
    this.log('Starting job...');
    this.isRunning = true;
    this.timer = setInterval(() => {
      this.run();
    }, this.interval);
  }

  public stop(): void {
    if (!this.isRunning) {
      return;
    }
    this.log('Stopping job...');
    this.isRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private run(): void {
    this.log('Running job...');
    this.handler?.();
  }

  private log(message: string): void {
    const timestamp = new Date().toISOString();
    console.info(`[${timestamp}] ${message}`);
  }
}
