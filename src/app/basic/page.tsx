"use client";
import { useReducer, useState } from "react";
import { useUserById } from "../api/users/[id]/useUserById";
import TextField from "@mui/material/TextField";
import VStack from "@/components/layout/v-stack";
import MyForm from "./_components/my-form";
import { useDebounce } from "use-debounce";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import type { UseFormParams } from "./_components/type";

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

  const [isDefaultValues, toggleDefaultValues] = useReducer(
    (prev) => !prev,
    true,
  );
  const [keepDirty, toggleKeepDirty] = useReducer((prev) => !prev, false);
  const [keepValues, toggleKeepValues] = useReducer((prev) => !prev, false);
  const [keepErrors, toggleKeepErrors] = useReducer((prev) => !prev, false);

  const formValues = {
    name: data?.name,
    email: data?.email,
  };

  const useFormParam = {
    ...(isDefaultValues
      ? { defaultValues: formValues }
      : { values: formValues }),
    resetOptions: {
      ...(keepDirty && { keepDirty: true }),
      ...(keepValues && { keepValues: true }),
      ...(keepErrors && { keepErrors: true }),
    },
  } satisfies UseFormParams;

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
      <FormControlLabel
        control={
          <Switch checked={isDefaultValues} onChange={toggleDefaultValues} />
        }
        label="off:values, on:defaultValues"
      />
      <FormGroup>
        <CustomCheckBox
          label="keepDirty"
          checked={keepDirty}
          onChange={toggleKeepDirty}
        />
        <CustomCheckBox
          label="keepValues"
          checked={keepValues}
          onChange={toggleKeepValues}
        />
        <CustomCheckBox
          label="keepErrors"
          checked={keepErrors}
          onChange={toggleKeepErrors}
        />
      </FormGroup>
      <Button variant="contained" onClick={changeKey}>
        フォームをアンマウントしてマウントする
      </Button>
      <span className="mb-2"></span>
      <MyForm useFormParam={useFormParam} key={key} />
    </VStack>
  );
}

function CustomCheckBox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <FormControlLabel
      label={label}
      control={<Checkbox checked={checked} onChange={onChange} />}
    />
  );
}
