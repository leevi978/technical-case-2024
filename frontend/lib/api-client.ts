export function getData(query?: DataQuery) {
  return fetch(`${process.env.API_URL || "http://localhost:8000"}/data`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query || {}),
    cache: "no-store",
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw Error(res.statusText);
    })
    .catch((e) => {
      // TODO: Error handling
      console.error(e);
    });
}

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
  userIds?: number[];
  activityIds: number[];
};

export type DataResponse = {
  startTime?: string;
  endTime?: string;
  users: User[];
  activities: Activity[];
  userActivities: UserActivity[];
};
