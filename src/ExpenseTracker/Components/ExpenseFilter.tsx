import { categoryOptions } from '../categories';

interface Props {
    onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory}: Props) => {
  return (
    <select className="form-select mb-3" onChange={(event) => onSelectCategory(event.target.value)}>
        <option value="">All Categories</option>
           {categoryOptions}
    </select>
  )
}

export default ExpenseFilter