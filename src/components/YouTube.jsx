import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 1;
export const YouTube = () => {
  renderCount++;
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "Mnal",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumber: ["", ""],
    },
  });
  const onSubmit = (data) => {
    console.log("form submission", data);
  };
  const { errors } = formState;
  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username :</label>
        <br />
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username must",
            },
          })}
        />
        <p>{errors.username?.message}</p>
        <br />
        <label htmlFor="email">Email :</label>
        <br />
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email Format",
            },
            validate: (fieldValue) => {
              return (
                fieldValue !== "admin@example.com" ||
                "Enter a valid email address"
              );
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <br />
        <label htmlFor="youtube">Youtube :</label> <br />
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "Please enter a Channel",
            },
          })}
        />
        <p>{errors.channel?.message}</p>
        <br />
        <label htmlFor="twitter">Twitter :</label> <br />
        <input type="text" id="twitter" {...register("social.twitter")} />
        <br />
        <label htmlFor="facebook">Facebook :</label> <br />
        <input type="text" id="facebook" {...register("social.facebook")} />
        <br />
        <label htmlFor="primary-phone">Primary phone number :</label> <br />
        <input type="text" id="primary-phone" {...register("phoneNumber[0]")} />
        <br />
        <label htmlFor="secondary-phone">Secondary phone number :</label> <br />
        <input type="text" id="secondary-phone" {...register("phoneNumber[1]")} />
        <br />
        <br />
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
