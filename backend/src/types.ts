import { ValidationError } from "express-validator";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Activity = {
  id: number;
  name: string;
  points: number;
};

export type UserActivity = {
  id: number;
  userId: number;
  activityId: number;
  timestamp: string;
};

export type DataQuery = {
  startTime?: string;
  endTime?: string;
  userIds?: string[];
  activityIds: string[];
};

export type DataResponse = {
  startTime?: string;
  endTime?: string;
  users: User[];
  activities: Activity[];
  userActivities: UserActivity[];
};

export type ValidationErrorResponse = {
  errors: ValidationError[];
};
