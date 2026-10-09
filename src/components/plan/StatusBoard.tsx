// dashboard that shows sats number of days 

// props board accepts
interface StatusBoardProps {
  label: string;
  value: number | string;
}

// function
function StatusBoard({ label, value }: StatusBoardProps) {
  return (  
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-ink">{value}</p>
    </div>
  );
}

export default StatusBoard;
