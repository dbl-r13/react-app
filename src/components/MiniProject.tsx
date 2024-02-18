import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." }),
  amount: z.number({ invalid_type_error: "Amount is required." }),
});

type MPFormData = z.infer<typeof schema>;

const MiniProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MPFormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={() => console.log("Clicked")}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {/* {errors.name && <p className="text-danger">{errors.name.message}</p>} */}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount")}
          id="amount"
          type="text"
          className="form-control"
        />
        {/* {errors.name && <p className="text-danger">{errors.name.message}</p>} */}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select className="custom-select" id="category">
          <option selected></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <button disabled={!isValid} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default MiniProject;
