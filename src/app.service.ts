import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
}

const FILE_PATH = path.join(process.cwd(), 'users.json');

@Injectable()
export class AppService {
  private readFile(): any[] {
    try {
      const data = fs.readFileSync(FILE_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private writeFile(data: any[]): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  }

  create(userData: {
    name: string;
    email: string;
    password: string;
    age: number;
  }) {
    const users = this.readFile();
    users.push(userData);
    this.writeFile(users);
    return { message: 'User saved successfully', user: userData };
  }
  findAll() {
    return this.readFile();
  }
  findByEmail(email: string) {
    const users = this.readFile();
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
  update(email: string, updateData) {
    const users = this.readFile();
    const index = users.findIndex((user) => user.email === email);

    if (index === -1) {
      throw new Error('User not found');
    }

    users[index] = { ...users[index], ...updateData };
    this.writeFile(users);

    return { message: 'User updated successfully', user: users[index] };
  }
  remove(email: string) {
    let users = this.readFile();
    const initialLength = users.length;
    users = users.filter((user) => user.email !== email);

    if (users.length === initialLength) {
      throw new Error('User not found');
    }

    this.writeFile(users);
    return { message: 'User deleted successfully' };
  }
}
