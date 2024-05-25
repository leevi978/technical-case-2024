import express, { Request } from "express";
import { db } from "./database";
import { body, validationResult } from "express-validator";
import { DataQuery, DataResponse, ValidationErrorResponse } from "./types";

const app = express();
const port = 8000;

app.use(express.json());

app.post(
  "/data",

  // startTime and endTime is a valid Date
  body(["startTime", "endTime"])
    .if((v) => v != null)
    .escape()
    .custom((v) => !isNaN(Date.parse(v)))
    .withMessage("Invalid date"),

  // userIDs and activityIds are arrays of integers
  body(["userIds", "activityIds"])
    .if((v) => v != null)
    .escape()
    .isArray()
    .custom((v: any[]) => v.map(Number).every(Number.isInteger))
    .withMessage("Id is not an integer"),

  (
    req: Request<{}, DataResponse | ValidationErrorResponse, DataQuery>,
    res
  ) => {
    const valRes = validationResult(req);
    if (valRes.isEmpty()) {
      const data = db.getData(req.body);
      res.status(200).json(data);
    } else res.status(400).send({ errors: valRes.array() });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
