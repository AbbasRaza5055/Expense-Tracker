const COLORS = {
  Food: "bg-orange-500", Transport: "bg-blue-500", Bills: "bg-red-500",
  Shopping: "bg-pink-500", Health: "bg-green-500", Education: "bg-purple-500",
  Entertainment: "bg-yellow-500", Other: "bg-gray-500"
};

export default function Summary({ summary }) {
  if (!summary) return null;
  const max = Math.max(...Object.values(summary.by_category || {}), 1);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-white font-semibold text-lg mb-4">📊 Summary</h2>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">Total Spent</p>
          <p className="text-white text-2xl font-bold">PKR {summary.total?.toLocaleString()}</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
          <p className="text-purple-300 text-xs uppercase tracking-wide mb-1">Transactions</p>
          <p className="text-white text-2xl font-bold">{summary.count}</p>
        </div>
      </div>
      <div className="space-y-2">
        {Object.entries(summary.by_category || {}).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => (
          <div key={cat}>
            <div className="flex justify-between text-xs text-white/60 mb-1">
              <span>{cat}</span>
              <span>PKR {amt.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${COLORS[cat] || "bg-gray-500"}`}
                style={{ width: `${(amt / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}