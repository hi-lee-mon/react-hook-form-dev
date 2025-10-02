import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import HStack from "@/components/layout/h-stack";
import VStack from "@/components/layout/v-stack";
import type { User } from "@/app/api/users/[id]/type";
import ObjBlock from "@/components/obj-block";

type UseFormParams = Parameters<typeof useForm>[0];

export default function MyForm({ user }: { user?: User }) {
  const v = {
    name: user?.name || "John Doe",
    email: user?.email || "test@example.com",
  };
  const useFormParam = {
    // defaultValues: v,
    values: v,
    // resetOptions: {
    //   keepDirty: true,
    //   keepValues: true,
    //   keepErrors: true,
    // },
  } satisfies UseFormParams;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
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
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <h1>My Form</h1>
      <HStack className="gap-8 grid grid-cols-3">
        <VStack className="col-span-1 gap-2">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="text"
                required
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} />
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
        </VStack>
        <VStack className="grid grid-cols-2 col-span-2 gap-2">
          <div className="col-span1">
            <ObjBlock title="初期値にわたる値" obj={v} />
            <ObjBlock title="watchのキャッシュ" obj={watch()} />
          </div>
          <div className="col-span1">
            <ObjBlock title="useFormの引数" obj={useFormParam} />
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
        </VStack>
      </HStack>
    </form>
  );
}
