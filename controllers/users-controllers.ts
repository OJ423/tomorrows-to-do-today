import { Request, Response, NextFunction } from "express";
import { createUser } from "../models/user-models";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password)
    res.status(201).send({msg: "User successfully created", newUser})
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