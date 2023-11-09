import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { User } from './User.inteface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { error, log } from 'console';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  private client: MongoClient;
  private db:Db;

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const m=this.userModel.findOne({ email });
    console.log("(await m).email");
    return m;
  }
  
  async getAll(): Promise<User[] | undefined> {
    const arr= this.userModel.find().exec();
    return arr;
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
   const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    return createdUser.save();
  } 

  async validatePassword( email: string,password: string ): Promise<User | undefined> {
    const user = await this.findByEmail(email);
    if (!user)
    throw new Error('no exist');
    console.log(user.name,user.password)
    if (user && (await bcrypt.compare(password.toString(), user.password.toString()))) {
      log(password.toString())
      log( user.password.toString())
      return user;
    

    }
    else throw new Error('invalidPassword');
  }}