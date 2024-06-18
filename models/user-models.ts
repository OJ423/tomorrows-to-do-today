import bcrypt from 'bcryptjs'
import prisma from '../client';

export async function createUser (username: string, email:string, password: string) {
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  })
  return newUser
}