import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import HStack from "@/components/layout/h-stack";
import VStack from "@/components/layout/v-stack";
import ObjBlock from "@/components/obj-block";
import type { UseFormParams } from "./type";

type Props = {
  useFormParam: UseFormParams;
};

export default function MyForm({ useFormParam }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    clearErrors,
    getValues,
    formState: {
      dirtyFields,
      disabled,
      errors,
      isDirty,
      isLoading,
      isReady,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValid,
      isValidating,
      submitCount,
      touchedFields,
      validatingFields,
      defaultValues,
    },
  } = useForm(useFormParam);

  return (
    <div>
      <HStack className="items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">ユーザフォーム</h2>
        {/* <p>再レンダリング回数：{renderCount}</p> */}
      </HStack>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <HStack className="gap-8 grid grid-cols-3">
          <VStack className="col-span-1 gap-2">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "必須項目です",
                maxLength: {
                  value: 6,
                  message: "6文字以内で入力してください",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="名前"
                  type="text"
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="email"
              rules={{
                required: "必須項目です",
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="メールアドレス"
                  required
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Button
              variant="contained"
              type="submit"
              onClick={() =>
                handleSubmit((data) => alert(JSON.stringify(data, null, 2)))()
              }
              sx={{ textTransform: "none" }}
            >
              送信
            </Button>
            <Button
              variant="outlined"
              onClick={() => reset()}
              sx={{ textTransform: "none" }}
            >
              reset()
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                reset({
                  name: "名前を指定してリセット",
                })
              }
              sx={{ textTransform: "none" }}
            >
              {'reset( {name: "名前を指定してリセット"} )'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setValue("name", String(Math.random() * 10))}
              sx={{ textTransform: "none" }}
            >
              {'setValue("name", String(Math.random() * 10))'}
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setValue("name", String(Math.random() * 10), {
                  shouldValidate: true,
                })
              }
              sx={{ textTransform: "none" }}
            >
              {`
              setValue("name", String(Math.random() * 10), {
                shouldValidate: true,
              })
            `}
            </Button>
            <Button
              variant="outlined"
              onClick={() => clearErrors(["name"])}
              sx={{ textTransform: "none" }}
            >
              {`clearErrors(["name"])`}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setValue("name", "更新");
                const values = getValues();
                alert(JSON.stringify(values, null, 2));
              }}
              sx={{ textTransform: "none" }}
            >
              {`alert(getValues())`}
            </Button>
          </VStack>
          <VStack className="grid grid-cols-2 col-span-2 gap-2">
            <div className="col-span1">
              <ObjBlock title="watch()" obj={watch()} />
              <ObjBlock
                title="formState"
                obj={{
                  dirtyFields,
                  disabled,
                  errors,
                  isDirty,
                  isLoading,
                  isReady,
                  isSubmitSuccessful,
                  isSubmitted,
                  isSubmitting,
                  isValid,
                  isValidating,
                  submitCount,
                  touchedFields,
                  validatingFields,
                  defaultValues,
                }}
              />
            </div>
            <div className="col-span1">
              <ObjBlock title="useFormの引数" obj={useFormParam} />
              <ObjBlock title="getValues()" obj={getValues()} />
            </div>
          </VStack>
        </HStack>
      </form>
    </div>
  );
}
