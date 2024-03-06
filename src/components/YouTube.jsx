import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 1;
export const YouTube = () => {
  renderCount++;
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      username: "Minal",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumber: ["", ""],
      phNumber: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode: "all",
  });
  const onSubmit = (data) => {
    console.log("form submission", data);
  };
  // const onError = (errors: ) => {
  //   console.log("form submission error", errors);
  // };
  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful });
  // console.log({ dirtyFields, touchedFields, isDirty, isValid });
  const { fields, append, remove } = useFieldArray({
    name: "phNumber",
    control,
  });
  const handleGetValues = () => {
    console.log("get values", getValues(["username", "channel"]));
  };
  const handleSetValues = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const watchUserName = watch("username");
  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>
      {/* <h2>Watched value: {watchUserName}</h2> */}
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
            // emailAvailabe: asyn (fieldValue)=>{
            // return(
            //   const response = await fetch (`https://jsonplaceholder.typicode.com/users?email={fieldValue}`)
            //   const data = response.JSON()
            // )
            // }
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
        <input
          type="text"
          id="twitter"
          {...register("social.twitter", {
            disabled: watch("channel") === "",
            required: "enter the twitter account",
          })}
        />
        <br />
        <label htmlFor="facebook">Facebook :</label> <br />
        <input type="text" id="facebook" {...register("social.facebook")} />
        <br />
        <label htmlFor="primary-phone">Primary phone number :</label> <br />
        <input type="text" id="primary-phone" {...register("phoneNumber[0]")} />
        <br />
        <label htmlFor="secondary-phone">Secondary phone number :</label> <br />
        <input
          type="text"
          id="secondary-phone"
          {...register("phoneNumber[1]")}
        />
        <br />
        <br />
        <div>
          <label>List of Phone Number</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumber.${index}.number`)}
                  />
                  <br />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <br />
            <button type="button" onClick={() => append({ number: "" })}>
              Add Phone Number
            </button>
          </div>
          <br />
        </div>
        <br />
        <label htmlFor="age">Age :</label> <br />
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Please enter a Age",
            },
          })}
        />
        <p>{errors.age?.message}</p>
        <b></b>
        <label htmlFor="age">Date of Birth :</label> <br />
        <input
          type="date"
          id="dob"
          {...register("dob", {
            validate: true,
            required: {
              value: true,
              message: "Please enter a dob",
            },
          })}
        />
        <p>{errors.dob?.message}</p>
        <br />
        <br />
        <button>Submit</button>
        <button onClick={() => reset()}>Reset</button>
        <br />
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <br />
        <button type="button" onClick={handleSetValues}>
          Set Values
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
