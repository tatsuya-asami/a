import { useFormContext, useWatch } from "react-hook-form";
import { FormValues } from "./Form";

type Props = {
  editingUid: number | null;
};

export const Descriptions = ({ editingUid }: Props) => {
  const { register, control } = useFormContext<FormValues>();

  const userList = useWatch({ control, name: "userList" });
  const index = userList.findIndex((user) => user.uid === editingUid);

  return (
    <div>
      <span>{editingUid}</span>
      <input {...register(`userList.${index}.description`)} />
    </div>
  );
};
