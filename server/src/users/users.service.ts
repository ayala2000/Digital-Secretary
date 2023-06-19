import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class UsersService {
  private client: MongoClient;
  private db:Db;

  constructor() {
    this.connectToDatabase();
  }

 
async connectToDatabase(): Promise<MongoClient> {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017/Users');
    this.db = client.db('Users');
    console.log('Connected to MongoDB');
    console.log('Connected to MongoDB');

    return client;
  }
  

  async findByEmail(email: string): Promise<User | undefined> {
    return this.db.collection<User>('User').findOne({ email });
  }
  
  async getAll(): Promise<User[] | undefined> {
    let arr;
    arr= this.db.collection<User>('User').find().toArray();
    return arr;
  }

  async create(email: string, password: string,id:number,name:string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    console.log(password);
    const user = { id,name,email, password: hashedPassword };
    await this.db.collection<User>('User').insertOne(user);
 return user;
  }

  async validatePassword(
    id:number,
    email: string,
    password: string,
    name:string,
  ): Promise<User | undefined> {
    const user = await this. findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  }
}
