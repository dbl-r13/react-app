import React, { FormEvent, useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";

const Form = () => {
  const form = useForm();
  console.log(form);

  const { register, handleSubmit } = form;
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

          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
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
          {...register("age")}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
