import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { categoryOptions, categories } from '../categories' 

const schema = z.object({
  description: z.string().min(3).max(50),
  amount: z.number({invalid_type_error: 'Amount is required'}).min(0.01).max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({message: 'Category is required.'})
  })
})

type ExpenseFormData = z.infer<typeof schema>

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const Expenses = ( {onSubmit}: Props) => {

  const {register, handleSubmit, reset, formState: {errors} } = useForm<ExpenseFormData>({ resolver: zodResolver(schema)})

  return (
    <div className="mb-5">
    <form onSubmit={handleSubmit( data => {
      onSubmit(data)
      reset()
    })}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label"> Description </label>
          <input type="text" {...register('description')} id="description" className="form-control" />
          {errors.description && <p className="text-danger">{errors.description.message} </p>}
        </div>

       <div className="myFlex">
        <div className="mb-3 flexItem">
          <label htmlFor="amount" className="form-label"> Amount </label>
          <input type="number" {...register('amount', {valueAsNumber: true})} id="amount" className="form-control" />
          {errors.amount && <p className="text-danger">{errors.amount.message} </p>}
        </div>

        <div className="mb-3 flexItem">
          <label htmlFor="category" className="form-label"> Category </label>
          <select id="category" {...register('category')} className="form-select" >
           {categoryOptions}
           </select> 
           {errors.category && <p className="text-danger">{errors.category.message} </p>}
        </div>
        </div>

        <button className="subBtn btn btn-primary" type="submit"> Add Expense </button>
    </form>
    </div>
  )
}

export default Expenses