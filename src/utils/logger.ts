export class Logger {
    static info(message: string): void {
      console.log(`[INFO]: ${message}`);
    }
  
    static error(message: string, error?: any): void {
      console.error(`[ERROR]: ${message}`, error);
    }
  }
  