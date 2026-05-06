const RevenueBreakdownCard = ({ title, items, emptyMessage, colorOffset = 0 }) => {
  const colors = ["bg-primary", "bg-pink-500", "bg-purple-500", "bg-blue-500"];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      
      <div className="space-y-6">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.label}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700 transition-colors">
                  {item.label}
                </span>
                <span className="text-gray-900 font-bold">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`${colors[(index + colorOffset) % colors.length]} h-3 rounded-full`} 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                ₹{item.amount.toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
};

export default RevenueBreakdownCard;