import { useState } from 'react'
import './App.css'
import ExpenseList from './ExpenseTracker/Components/ExpenseList'
import ExpenseFilter from './ExpenseTracker/Components/ExpenseFilter'
import ExpenseForm from './ExpenseTracker/Components/ExpenseForm'

function App() {
 const [selectedCategory, setSelectedCategory] = useState('')

 const [expenses, setExpenses] = useState([
  {id: 1, description: 'Electricity', amount: 75, category: 'Utilities'},
  {id: 2, description: 'Trader Joe\'s', amount: 100, category: 'Groceries'},
  {id: 3, description: 'Movies', amount: 18, category: 'Entertainment'}, 
  {id: 4, description: 'Cable Internet', amount: 85, category: 'Utilities'},
  {id: 5, description: 'Whole Foods', amount: 80, category: 'Groceries'},
 ])

 const visibleExpenses = selectedCategory ? expenses.filter(e => e.category == selectedCategory) : expenses


  return (
      <div> 
      <h1> Expense Tracker </h1>
      <ExpenseForm onSubmit={expense => setExpenses([...expenses, {...expense, id: expenses.length+1 }]) }  />
      <ExpenseFilter onSelectCategory={category => setSelectedCategory(category)} />
      <ExpenseList expenses={visibleExpenses} 
       onDelete={(id) => setExpenses(expenses.filter(e => e.id !== id))} />
      </div>
  )
}

export default App
