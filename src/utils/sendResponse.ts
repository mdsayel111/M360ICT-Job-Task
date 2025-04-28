import { Response } from "express";
import { TResData } from "../types/TResData";

// HOF for send response
const sendResponse = (res: Response, data: TResData) => {
  res.status(200).send(data);
};

export default sendResponse;
