import { useFieldArray, useForm } from "react-hook-form";

export const Form = () => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "myList",
  });

  return (
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
  );
};

const defaultMyList = { main: "", sub: "" };
const defaultValues = {
  myList: [defaultMyList],
};
type FormValues = typeof defaultValues;
