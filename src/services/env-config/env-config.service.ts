import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvConfigService {
  
  constructor(private readonly config: ConfigService) {}

  public getDatabaseConnectionString = (): string => {
    const databaseConnectionString = this.config.get<string>('DatabaseConnectionString');
    
    if (!databaseConnectionString) {
      throw new Error('No database connection string specified');
    }
    
    return databaseConnectionString;
  };
}