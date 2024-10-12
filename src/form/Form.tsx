import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { SubValue } from "./SubValue";
import { useState } from "react";

export const Form = () => {
  const [openSubValueIndex, setOpenSubValueIndex] = useState<number | null>(
    null
  );
  const methods = useForm<FormValues>({
    defaultValues,
  });
  const { register, control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "myList",
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <input {...register(`myList.${index}.main`)} />
              <button type="button" onClick={() => remove(index)}>
                remove
              </button>
              <button onClick={() => setOpenSubValueIndex(index)}>
                open sub input
              </button>
              {openSubValueIndex === index && <SubValue index={index} />}
            </div>
          );
        })}
        <div>
          <button type="button" onClick={() => append(defaultMyList)}>
            append
          </button>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </FormProvider>
  );
};

const defaultMyList = { main: "" };
const defaultValues: FormValues = {
  myList: [defaultMyList],
};
export type FormValues = {
  myList: { main: string; sub?: string }[];
};
