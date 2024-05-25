"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Activity, User, UserActivity } from "@/lib/api-client";

export default function DataGraph({
  userActivities,
  users,
  activities,
}: {
  userActivities: UserActivity[];
  users: User[];
  activities: Activity[];
}) {
  return (
    <div className="flex rounded dark:bg-zinc-200">
      <LineChart
        xAxis={[
          {
            data: userActivities.map((ua) => new Date(ua.timestamp)),
            scaleType: "utc",
            valueFormatter: (value: Date) => value.toDateString(),
            tickInterval: userActivities.map((ua) => new Date(ua.timestamp)),
          },
        ]}
        series={users.map((user) => {
          return {
            data: userActivities.map((ua) =>
              ua.userId === user.id
                ? activities.find((a) => a.id === ua.activityId)?.points || 0
                : 0
            ),
            label: user.name,
          };
        })}
        height={300}
        grid={{ vertical: true }}
      />
    </div>
  );
}
