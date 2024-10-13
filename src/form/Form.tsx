import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { useState } from "react";
import { Descriptions } from "./Descriptions";

export const Form = () => {
  const [editingUid, setEditingUid] = useState<number | null>(null);
  const methods = useForm<FormValues>({
    defaultValues,
  });
  const { control, handleSubmit, getValues, setValue } = methods;
  const { fields, remove } = useFieldArray({
    control,
    name: "userList",
  });
  const watchedMyList = useWatch({ control, name: "userList" });
  console.log(watchedMyList);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data.userList);
        })}
      >
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <span>
                {field.uid}: {field.name}
              </span>
              <button type="button" onClick={() => remove(index)}>
                remove
              </button>
              <button
                type="button"
                onClick={() => {
                  setValue(
                    "userList",
                    getValues("userList").filter((_, i) => i !== index)
                  );
                }}
              >
                remove by setValue
              </button>
              <button onClick={() => setEditingUid(field.uid)}>edit</button>
            </div>
          );
        })}
        <div>
          <button type="submit">Submit</button>
        </div>
        {editingUid && <Descriptions editingUid={editingUid} />}
      </form>
    </FormProvider>
  );
};

type UserParams = { uid: number; name: string; description?: string };

export type FormValues = {
  userList: UserParams[];
};

const userList: UserParams[] = [
  { uid: 1, name: "user1" },
  { uid: 2, name: "user2" },
  { uid: 3, name: "user3" },
];

const defaultValues: FormValues = {
  userList,
};
