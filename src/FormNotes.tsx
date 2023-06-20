// import { FormEvent, useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

/* interface FormData {
  name: string;
  age: number;
} */

const schema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters'}),
    age: z.number({ invalid_type_error: 'Age field is required'}).min(18)
})

type FormData = z.infer<typeof schema>; //typescript type is similar to interface 

const Form = () => {
  /* const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = {
    name: '', age: 0
  } */
  //OR 
  
  /* const [person, setPerson] = useState({
    name: '',
    age: '' 
  }) */

  const {
    register, 
    handleSubmit, 
    formState : {errors}
   } = useForm<FormData>({ resolver: zodResolver(schema)} ); //pass interface to represent shape of form 
  // console.log(register('name'))
  //console.log(formState)
  const onSubmit = (data: FieldValues) => console.log(data)

  /*  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (nameRef.current !== null)
        person.name = nameRef.current.value
    if (ageRef.current !== null)
        person.age = parseInt(ageRef.current.value) 

    console.log(person)
  } */

  return (
   <form onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-3">
         <label htmlFor="name" className="form-label"> Name </label>
         <input id="name" 
          { ...register('name')}
         type="text" className="form-control" />
         {errors.name && (
             <p className='text-danger'> { errors.name.message } </p>
          )}
        
    </div>
    <div className="mb-3">
        <label htmlFor="age" className="form-label"> Age </label>
       <input id="age" type="number" 
        { ...register('age')}
        className="form-control" />
         {errors.age && (
             <p className='text-danger'> { errors.age.message } </p>
          )}
    </div>
    <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  )
}

export default Form