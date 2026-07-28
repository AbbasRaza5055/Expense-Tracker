import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

const API = import.meta.env.VITE_API_URL;
const CATEGORIES = ["All", "Food", "Transport", "Bills", "Shopping", "Health", "Education", "Entertainment", "Other"];

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

 const fetchData = async () => {
  setLoading(true);
  try {
    const params = category !== "All" ? { category } : {};
    const [expRes, sumRes] = await Promise.all([
      axios.get(`${API}/expenses/`, { params }),
      axios.get(`${API}/expenses/summary`)
    ]);
    setExpenses(Array.isArray(expRes.data) ? expRes.data : []);
    setSummary(sumRes.data);
  } catch (err) { 
    console.error("API error", err);
    setExpenses([]);
  }
  setLoading(false);
};

  useEffect(() => { fetchData(); }, [category]);

  const handleAdd = async (data) => {
    await axios.post(`${API}/expenses/`, data);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💸 Expense Tracker</h1>
          <p className="text-purple-300 text-sm">FastAPI + MySQL + React · Built by Abbas Raza</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left */}
          <div className="lg:col-span-1 space-y-4">
            <ExpenseForm onAdd={handleAdd} />
            <Summary summary={summary} />
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">📋 Expenses</h2>
                <span className="text-white/40 text-xs">{expenses.length} records</span>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      category === c
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-white/50 hover:bg-white/20"
                    }`}>
                    {c}
                  </button>
                ))}
              </div>

              {loading
                ? <div className="text-center text-white/30 py-10">Loading...</div>
                : <ExpenseList expenses={expenses} onDelete={fetchData} onRefresh={fetchData} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}