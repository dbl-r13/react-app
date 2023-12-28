import React, { FormEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  age: z
    .number({ invalid_type_error: "Age field is required." })
    .min(18, { message: "Age must be at least 18." }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  //   console.log(form);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

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

  /* Would be needed if we were not using package 'zod'
    interface FormData {
        name: string;
        age: number;
    }
    */

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

          {...register("name")} //Removed this because we are using 'zod' package, { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
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
          {...register("age", { valueAsNumber: true })} //Removed this because we are using 'zod' package, { required: true, minLength: 1 })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
