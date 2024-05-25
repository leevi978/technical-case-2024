"use client";
import { Activity, DataResponse, User } from "@/lib/api-client";
import MultipleSelectPlaceholder from "./selector/multiple-select-placeholder";
import { useEffect, useState } from "react";
import DateSelector from "./selector/date-selector";
import dayjs, { Dayjs } from "dayjs";
import DataGraph from "./data-graph";

export default function Dashboard({
  initialData,
}: {
  initialData: DataResponse;
}) {
  const [data, setData] = useState<DataResponse>(initialData);
  const [selectedUsers, setSelectedUsers] = useState<User[]>(initialData.users);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>(
    initialData.activities
  );
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | undefined>(
    initialData.startTime ? dayjs(initialData.startTime) : undefined
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | undefined>(
    initialData.endTime ? dayjs(initialData.endTime) : undefined
  );

  useEffect(() => {
    fetch("/api/data", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userIds: selectedUsers.map((u) => u.id),
        activityIds: selectedActivities.map((u) => u.id),
        startTime: selectedStartTime?.toISOString(),
        endTime: selectedEndTime?.toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((body) => setData(body))
      .catch((e) => {
        // TODO: Error handling
        console.error(e);
      });
  }, [selectedUsers, selectedActivities, selectedStartTime, selectedEndTime]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-8 flex-wrap">
        <MultipleSelectPlaceholder
          onChange={(value) =>
            setSelectedUsers(
              value.length === 0
                ? data.users
                : data.users.filter((u) => value.includes(u.name))
            )
          }
          label="Filter by users"
          items={data.users.map((user) => {
            return {
              label: user.name,
              value: user.id,
            };
          })}
        />
        <MultipleSelectPlaceholder
          onChange={(value) => {
            setSelectedActivities(
              value.length === 0
                ? data.activities
                : data.activities.filter((u) => value.includes(u.name))
            );
          }}
          label="Filter by activity"
          items={data.activities.map((activity) => {
            return {
              label: activity.name,
              value: activity.id,
            };
          })}
        />
        <DateSelector
          onChange={(v) => setSelectedStartTime(v || undefined)}
          minDate={
            initialData.startTime ? dayjs(initialData.startTime) : undefined
          }
          maxDate={initialData.endTime ? dayjs(initialData.endTime) : undefined}
          label="Start date"
        />
        <DateSelector
          onChange={(v) => setSelectedEndTime(v || undefined)}
          minDate={
            initialData.startTime ? dayjs(initialData.startTime) : undefined
          }
          maxDate={initialData.endTime ? dayjs(initialData.endTime) : undefined}
          label="End date"
        />
      </div>
      <DataGraph
        users={selectedUsers}
        activities={selectedActivities}
        userActivities={data.userActivities}
      />
    </div>
  );
}
