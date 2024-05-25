// Dummy database

import { Activity, DataQuery, DataResponse, User, UserActivity } from "./types";

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@doe.com",
  },
  {
    id: 3,
    name: "Alice Brown",
    email: "alice@brown.com",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@brown.com",
  },
];

const activities: Activity[] = [
  {
    id: 1,
    name: "Sale",
    points: 10,
  },
  {
    id: 2,
    name: "Meeting",
    points: 5,
  },
  {
    id: 3,
    name: "Valuation",
    points: 3,
  },
];

const userActivities: UserActivity[] = [
  {
    id: 1,
    userId: 1,
    activityId: 1,
    timestamp: "2021-01-01T00:00:00",
  },
  {
    id: 2,
    userId: 1,
    activityId: 2,
    timestamp: "2021-01-02T00:00:00",
  },
  {
    id: 3,
    userId: 2,
    activityId: 1,
    timestamp: "2021-01-03T00:00:00",
  },
  {
    id: 4,
    userId: 2,
    activityId: 2,
    timestamp: "2021-01-04T00:00:00",
  },
  {
    id: 5,
    userId: 3,
    activityId: 1,
    timestamp: "2021-01-05T00:00:00",
  },
  {
    id: 6,
    userId: 3,
    activityId: 2,
    timestamp: "2021-01-06T00:00:00",
  },
  {
    id: 7,
    userId: 4,
    activityId: 1,
    timestamp: "2021-01-07T00:00:00",
  },
  {
    id: 8,
    userId: 4,
    activityId: 2,
    timestamp: "2021-01-08T00:00:00",
  },
];

class Database {
  public getData(query?: DataQuery): DataResponse {
    const data = userActivities
      .filter((ua) => timeGreaterThanOrEqual(ua.timestamp, query?.startTime))
      .filter((ua) => timeLessThan(ua.timestamp, query?.endTime))
      .filter((ua) => idFilter(ua.userId, query?.userIds))
      .filter((ua) => idFilter(ua.activityId, query?.activityIds));
    return {
      startTime:
        query?.startTime ||
        data
          .map((ua) => new Date(ua.timestamp))
          .reduce(function (a, b) {
            return a < b ? a : b;
          })
          .toDateString(),
      endTime:
        query?.endTime ||
        data
          .map((ua) => {
            const max = new Date(ua.timestamp);
            max.setDate(max.getDate() + 1);
            return max;
          })
          .reduce(function (a, b) {
            return a > b ? a : b;
          })
          .toDateString(),
      users: users.filter((u) => userTimeRangeFilter(u, query)),
      activities: activities.filter((a) => activityTimeRangeFilter(a, query)),
      userActivities: data,
    };
  }
}

const timeGreaterThanOrEqual = (timestamp: string, minTimestamp?: string) =>
  minTimestamp == null || new Date(timestamp) >= new Date(minTimestamp);

const timeLessThan = (timestamp: string, maxTimestamp?: string) =>
  maxTimestamp == null || new Date(timestamp) < new Date(maxTimestamp);

const userTimeRangeFilter = (user: User, query?: DataQuery) =>
  userActivities.find(
    (ua) =>
      ua.userId === user.id &&
      timeGreaterThanOrEqual(ua.timestamp, query?.startTime) &&
      timeLessThan(ua.timestamp, query?.endTime)
  ) != null;

const activityTimeRangeFilter = (activity: Activity, query?: DataQuery) =>
  userActivities.find(
    (ua) =>
      ua.activityId === activity.id &&
      timeGreaterThanOrEqual(ua.timestamp, query?.startTime) &&
      timeLessThan(ua.timestamp, query?.endTime)
  ) != null;

const idFilter = (id: number, idArray?: string[]) =>
  idArray == null || idArray.map(Number).includes(id);

export const db = new Database();
