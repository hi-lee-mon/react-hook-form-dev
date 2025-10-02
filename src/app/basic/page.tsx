"use client";
import { useState } from "react";
import { useUserById } from "../api/users/[id]/useUserById";

export default function Page() {
  const [sleepTime, setSleepTime] = useState(1);
  const { data, isLoading, error } = useUserById("1", String(sleepTime * 1000));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <p>fetchにかかる時間: {sleepTime}秒</p>
      <input
        type="number"
        value={sleepTime}
        onChange={(e) => setSleepTime(Number(e.target.value))}
      />
    </div>
  );
}
