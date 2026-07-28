import axios from "axios";

const CATEGORY_COLORS = {
  Food: "text-orange-400", Transport: "text-blue-400", Bills: "text-red-400",
  Shopping: "text-pink-400", Health: "text-green-400", Education: "text-purple-400",
  Entertainment: "text-yellow-400", Other: "text-gray-400"
};

export default function ExpenseList({ expenses, onDelete, onRefresh }) {
  const handleDelete = async (id) => {
    if (!confirm("Do You Want to Delete the Expense?")) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/expenses/${id}`);
    onRefresh();
  };

  if (expenses.length === 0)
    return <div className="text-center text-white/30 py-10">NO Record to Display</div>;

  return (
    <div className="space-y-2">
      {expenses.map(e => (
        <div key={e.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between group hover:border-white/20 transition-all">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-sm truncate">{e.title}</span>
              <span className={`text-xs font-medium ${CATEGORY_COLORS[e.category] || "text-gray-400"}`}>
                {e.category}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-white/40 text-xs">{e.date}</span>
              {e.description && <span className="text-white/30 text-xs truncate">· {e.description}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3 ml-3">
            <span className="text-white font-semibold text-sm">PKR {e.amount.toLocaleString()}</span>
            <button onClick={() => handleDelete(e.id)}
              className="text-white/20 hover:text-red-400 transition-colors text-lg leading-none">
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}