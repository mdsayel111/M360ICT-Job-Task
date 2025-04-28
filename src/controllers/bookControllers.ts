import { Request, Response } from "express";
import client from "../DB";

export const getAllBooks = async (req: Request, res: Response) => {
  const authors = await client.query("SELECT * FROM authors");
  res.json(authors.rows);
};
