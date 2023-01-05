export class DatabaseDevCredentials {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  constructor() {
    this.host = 'localhost';
    this.port = 3306;
    this.username = 'test';
    this.password = 'test';
    this.database = 'test';
  }
}
