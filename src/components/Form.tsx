import React, { FormEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  const form = useForm<FormData>();
  //   console.log(form);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log(errors);

  const onSubmit = (data: FieldValues) => console.log(data);
  /* Below code was written to show how to use the 'useRef'. This is not the most effective way of doing it.
  I will be refactoring code to use  below. 
  const ageRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };
  */

  /*  This is only needed if you are not using package 'react-hook-form'
    const [person, setPerson] = useState({
     name: "",
     age: "",
   });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    */

  /* if (nameRef.current !== null) {
    //   person.name = nameRef.current.value;
    // }
    // if (ageRef.current !== null) {
    //   person.age = parseInt(ageRef.current.value);
       }
     */
  // console.log(person);

  //   };

  interface FormData {
    name: string;
    age: number;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          /* This is how you can do things without using the 'react-hook-form' package.
            onChange={(event) =>
               setPerson({ ...person, name: event.target.value })
             }
            value={person.name}
          */

          {...register("name", { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name?.type === "required" && (
          <p className="text-danger">The name field is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">
            The name field must be 3 or more characters long
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          /* This is how you can do things without using the 'react-hook-form' package.
          
          onChange={(event) =>
            setPerson({ ...person, age: parseInt(event.target.value) })
        }
        value={person.age}
        */
          {...register("age", { required: true, minLength: 1 })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age?.type === "required" && (
          <p className="text-danger">The age field is required</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
