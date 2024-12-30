import {MongoClient, ServerApiVersion} from "mongodb";
import {EnvConfigService} from "./../env-config/env-config.service";
import {DatabaseNamesEnum} from "./data/database-names.enum";
import {Injectable} from "@nestjs/common";
import {CollectionNamesEnum} from "./data/collection-names.enum";
const uri = "mongodb+srv://lkads90:fxzlyUg7MkGK8aCZ@cluster0.ky8mbos.mongodb.net/?retryWrites=true&w=majority";

@Injectable()
export class DatabaseService {
    private client: MongoClient | null = null;

    constructor(private readonly envConfig: EnvConfigService) {
       this.init().then(() => {
           console.log('Database connection was successful!');
       })
    }
    
    private init = async () => {
        this.client = new MongoClient(this.envConfig.getDatabaseConnectionString(), {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: false,
                deprecationErrors: true,
            },
            connectTimeoutMS: 10000
        });
        try {
            await this.client.connect();
        } catch (e) {
            console.error('There was a problem connecting to the database', e);
        }
    };
    
    public getDB = (databaseName: DatabaseNamesEnum) => {
        return this.client.db(databaseName);
    };
    
    public resetConnectionIfClosed = async () => {
        return await this.client.connect();
    };
    
    public getCollection = async (databaseName: DatabaseNamesEnum, collectionName: CollectionNamesEnum) => {
        await this.resetConnectionIfClosed();
        const db = await this.client.db(databaseName);
        return db.collection(collectionName);
    };
}
