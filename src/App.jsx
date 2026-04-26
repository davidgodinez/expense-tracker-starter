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
      <div className="geo-shape geo-shape--circle-yellow" aria-hidden="true" />
      <div className="geo-shape geo-shape--triangle-red" aria-hidden="true" />
      <div className="geo-shape geo-shape--bar" aria-hidden="true" />
      <div className="geo-shape geo-shape--ring" aria-hidden="true" />
      <div className="geo-shape geo-shape--square-blue" aria-hidden="true" />

      <header className="masthead">
        <div className="masthead-meta">
          <span className="dot" />
          <span>Bauhaus Ledger</span>
          <span className="pipe" />
          <span className="dot dot--blue" />
          <span>No. 04 / Vol. I</span>
          <span className="pipe" />
          <span className="dot dot--yellow" />
          <span>Apr 25 — 2026</span>
        </div>

        <div className="title-row">
          <h1 className="title">
            FIN<span className="accent-red">ANCE</span>
            <br />
            TRACK<span className="accent-blue">ER</span>
          </h1>
          <div className="title-mark" aria-hidden="true">
            <div className="square" />
            <div className="circle" />
            <div className="tri" />
          </div>
        </div>

        <div className="subtitle">
          <span className="subtitle-key">Form / Function</span>
          <span className="subtitle-text">
            A geometric account of <strong>income</strong> and <strong>expenditure</strong>, composed in primaries.
          </span>
        </div>
      </header>

      <section className="section">
        <span className="section-label">
          <span className="num">01</span>
          <span>At a glance</span>
        </span>
        <Summary transactions={transactions} />
      </section>

      <section className="section">
        <span className="section-label">
          <span className="num">02</span>
          <span>Spending — by category</span>
        </span>
        <SpendingChart transactions={transactions} />
      </section>

      <section className="section">
        <span className="section-label">
          <span className="num">03</span>
          <span>Record an entry</span>
        </span>
        <TransactionForm categories={CATEGORIES} onAdd={addTransaction} />
      </section>

      <section className="section">
        <span className="section-label">
          <span className="num">04</span>
          <span>The ledger</span>
        </span>
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
