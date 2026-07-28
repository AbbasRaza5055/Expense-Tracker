import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Health", "Education", "Entertainment", "Other"];

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "", amount: "", category: "Food",
    date: new Date().toISOString().split("T")[0], description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title || !form.amount || !form.date) return alert("Title, Amount aur Date zaroor bharo!");
    setLoading(true);
    await onAdd({ ...form, amount: parseFloat(form.amount) });
    setForm({ title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0], description: "" });
    setLoading(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-white font-semibold text-lg mb-4">➕ Add Expense</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange}
            placeholder="e.g. Lunch"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1">Amount (PKR)</label>
          <input name="amount" type="number" value={form.amount} onChange={handleChange}
            placeholder="e.g. 500"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400">
            {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1">Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1">Description (Optional)</label>
          <input name="description" value={form.description} onChange={handleChange}
            placeholder="Extra details..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400" />
        </div>
      </div>
      <button onClick={handleSubmit} disabled={loading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </div>
  );
}