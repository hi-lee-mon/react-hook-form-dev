"use client";
import {
  Button,
  Checkbox,
  type CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useReducer, useState } from "react";
import { useDebounce } from "use-debounce";
import VStack from "@/components/layout/v-stack";
import { cn } from "@/lib/utils";
import { useUserById } from "../api/users/[id]/useUserById";
import MyForm from "./_components/my-form";
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
    {
      keepPreviousData: true,
    },
  );

  const [formStateMethod, setFormStateMethod] = useState<
    "defaultValues" | "values"
  >("defaultValues");

  const [keepDirty, toggleKeepDirty] = useReducer((prev) => !prev, false);
  const [keepValues, toggleKeepValues] = useReducer((prev) => !prev, false);
  const [keepErrors, toggleKeepErrors] = useReducer((prev) => !prev, false);

  const formValues = {
    name: data?.name,
    email: data?.email,
  };

  const useFormParam = {
    ...(formStateMethod === "defaultValues"
      ? { defaultValues: formValues }
      : { values: formValues }),
    resetOptions: {
      ...(keepDirty && { keepDirty: true }),
      ...(keepValues && { keepValues: true }),
      ...(keepErrors && { keepErrors: true }),
    },
  } satisfies UseFormParams;

  return (
    <VStack className="gap-6">
      <p className={cn("font-bold", isLoading && "text-red-500")}>
        ユーザデータ取得状態：{isLoading ? "取得中・・・" : "完了"}
      </p>
      <FormControl>
        <FormLabel id="fetch-user-data-settings" sx={{ mb: 1 }}>
          ユーザデータ取得方法の設定
        </FormLabel>
        <FormGroup aria-labelledby="fetch-user-data-settings">
          <TextField
            size="small"
            label="取得にかける秒数"
            type="number"
            value={sleepTime}
            onChange={(e) => setSleepTime(Number(e.target.value))}
          />
          <span className="mb-4" />
          <TextField
            size="small"
            label="取得するユーザIDを変更する"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </FormGroup>
      </FormControl>
      <VStack>
        <FormControl>
          <FormLabel id="form-state-radio-group">
            フォーム状態管理方法
          </FormLabel>
          <RadioGroup
            aria-labelledby="form-state-radio-group"
            value={formStateMethod}
            sx={{ pl: 2 }}
          >
            <FormControlLabel
              value={"defaultValues"}
              control={<Radio />}
              label="defaultValues"
              onClick={() => setFormStateMethod("defaultValues")}
            />
            <FormControlLabel
              value={"values"}
              control={<Radio />}
              label="values"
              onClick={() => setFormStateMethod("values")}
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={changeKey}>
          フォームをアンマウントしてマウントする
        </Button>
      </VStack>
      <FormControl>
        <FormLabel id="form-state-settings">フォーム設定</FormLabel>
        <FormGroup
          sx={{ alignSelf: "flex-start" }}
          aria-labelledby="form-state-settings"
        >
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
      </FormControl>
      <span className="mb-4" />
      <MyForm useFormParam={useFormParam} key={key} />
    </VStack>
  );
}

function CustomCheckBox({
  checked,
  onChange,
  label,
  sx,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  sx?: CheckboxProps["sx"];
}) {
  return (
    <FormControlLabel
      label={label}
      control={<Checkbox checked={checked} onChange={onChange} sx={sx} />}
    />
  );
}
