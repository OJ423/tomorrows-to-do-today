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

export async function activateUser(email:string) {
  const updateUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      validated: true
    }
  })
  return updateUser
}

export async function loginUserCheck(email: string, password:string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (user) {
    const passwordCheck = await bcrypt.compare(password, user?.password)
    if(passwordCheck) {
      return user
    }
    return null
  }    
}