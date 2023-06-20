export const categories = ['Groceries', 'Utilities', 'Entertainment'] as const

export const categoryOptions = categories.map(cat => 
   <option key={cat} value={cat}>{cat}</option>
)