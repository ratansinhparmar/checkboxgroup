import "./styles.css";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CheckboxGroup } from "./components";
import * as yup from "yup";

const schema = yup.object().shape({
  checkboxGroup: yup
    .array()
    .min(2, "You didnt enter enough")
    .max(3, "Too many")
    .required("Required")
});

const groupOptions = [
  { label: "Trinity", value: "1" },
  { label: "Morpheus", value: "2" },
  { label: "Neo", value: "3" },
  { label: "Tank", value: "4" },
  { label: "Dozer", value: "5" }
];

export default function App() {
  const { control, handleSubmit } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      checkboxGroup: ["1", "2"]
    }
  });

  const config = { label: "label", value: "value" };
  // eslint-disable-next-line no-console
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>React Hook Form</h1>
      <CheckboxGroup
        control={control}
        label="Pick 2-3"
        name="checkboxGroup"
        options={groupOptions}
        row
        config={config}
      />
      <br />
      <input type="submit" />
      <DevTool control={control} />
    </form>
  );
}
