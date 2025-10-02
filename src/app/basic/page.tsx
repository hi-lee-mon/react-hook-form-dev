"use client";
import { useReducer, useState } from "react";
import { useUserById } from "../api/users/[id]/useUserById";
import TextField from "@mui/material/TextField";
import VStack from "@/components/layout/v-stack";
import MyForm from "./_components/my-form";
import { useDebounce } from "use-debounce";
import { Button } from "@mui/material";

export default function Page() {
  const [sleepTime, setSleepTime] = useState(1);
  const [userId, setUserId] = useState("1");
  const [debouncedSleepTime] = useDebounce(sleepTime, 1000);
  const [debouncedUserId] = useDebounce(userId, 1000);
  const [key, changeKey] = useReducer(() => Math.random(), 1);
  const { data, isLoading } = useUserById(
    debouncedUserId,
    String(debouncedSleepTime * 1000),
  );

  return (
    <VStack className="gap-2">
      {isLoading && <p className="font-bold">ユーザ情報読み込み中...</p>}
      <TextField
        size="small"
        label="fetchにかける秒数"
        type="number"
        value={sleepTime}
        onChange={(e) => setSleepTime(Number(e.target.value))}
      />
      <TextField
        size="small"
        label="取得するユーザ情報を変更する"
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Button variant="contained" onClick={changeKey}>
        フォームを再描画
      </Button>
      <span className="mb-2"></span>
      <MyForm user={data} key={key} />
    </VStack>
  );
}
