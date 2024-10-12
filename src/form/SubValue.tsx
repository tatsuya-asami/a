import { useFormContext } from "react-hook-form";
import { FormValues } from "./Form";

type Props = {
  index: number;
};

export const SubValue = ({ index }: Props) => {
  const { register } = useFormContext<FormValues>();

  return <input {...register(`myList.${index}.sub`)} />;
};
