import { useState } from 'react'
import './App.css'
import Summary from './components/Summary'
import SpendingChart from './components/SpendingChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

const CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <header className="masthead">
        <div className="dateline">
          <span className="masthead-name">The Ledger</span>
          <span>Vol. I — No. 04</span>
          <span className="masthead-rule" aria-hidden="true" />
          <span>April 25, 2026</span>
        </div>
        <h1 className="title">Finance <em>Tracker</em></h1>
        <p className="subtitle">
          A quiet accounting of <em>income</em> &amp; <em>expenditure</em>, kept by hand.
        </p>
      </header>

      <section className="section">
        <span className="section-label">§ I — At a glance</span>
        <Summary transactions={transactions} />
      </section>

      <section className="section">
        <span className="section-label">§ II — Spending, by category</span>
        <SpendingChart transactions={transactions} />
      </section>

      <section className="section">
        <span className="section-label">§ III — Record an entry</span>
        <TransactionForm categories={CATEGORIES} onAdd={addTransaction} />
      </section>

      <section className="section">
        <span className="section-label">§ IV — The ledger</span>
        <TransactionList
          transactions={transactions}
          categories={CATEGORIES}
          onDelete={deleteTransaction}
        />
      </section>
    </div>
  );
}

export default App
