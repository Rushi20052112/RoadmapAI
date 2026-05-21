export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-[#0a1628] border border-[#1e2d4a] rounded-3xl p-5 hover:border-[#29476f] transition-all">
      <p className="text-[#8899aa] text-sm mb-3">{title}</p>

      <h3 className="text-4xl font-black text-white mb-2">
        {value}
      </h3>

      <p className="text-[#3b82f6] text-sm">{subtitle}</p>
    </div>
  );
}