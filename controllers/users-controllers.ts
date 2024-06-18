import { Request, Response, NextFunction } from "express";
import { activateUser, createUser, loginUserCheck } from "../models/user-models";
import jwt from "jsonwebtoken"
import { sendVerificationEmail } from "./utils";

const JWT_SECRET: string = process.env.JWT_SECRET as string

interface DecodedToken {
  email: string;
  [key: string]: any;
}


export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password);
    const verificationToken = await jwt.sign({email:newUser.email}, JWT_SECRET, {expiresIn:'1h'});
    sendVerificationEmail(email, verificationToken)
    res.status(201).send({message: "Successfully registered. Please check email to validate your account", newUser, token: verificationToken})
  }
  catch(error:any) {
    if(error.code === 'P2002') {
      res.status(400).send({message: "Email already exists. Please sign in."})
    } else {
      res.status(500).send({
        message: "Internal Server Error",
      })
    }
  }
}

export async function verifyAccount(req: Request, res: Response ) {
  try {
    const token = req.query.token as string;
    const decodedToken = await new Promise<DecodedToken>((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject({ status: 400, msg: `Error verifying user: ${err}` });
        }
        resolve(decoded as DecodedToken);
      })
    });
    const email = decodedToken.email 
    const user = await activateUser(email)
    const verificationToken = await jwt.sign({email:user.email}, JWT_SECRET, {expiresIn:'1h'});
    res.status(200).send({message: "User activated", user, token:verificationToken })
  }
  catch(error:any) {
    console.log(error.message)
  }
}

export async function loginUser(req: Request, res: Response ) {
  try {
    const {email, password} = req.body;
    const loggedInUser = await loginUserCheck(email, password)
    const verificationToken = await jwt.sign({email:loggedInUser?.email}, JWT_SECRET, {expiresIn:'1h'});
    if (loggedInUser) {
      res.status(200).send({user:loggedInUser, token: verificationToken})
    }
    else {
      res.status(404).send({message: "User cannot be found"})
    }
  }
  catch(error:any) {
    console.log(error.code)

      res.status(500).send({
        message: "Internal Server Error",
      })
  }
}