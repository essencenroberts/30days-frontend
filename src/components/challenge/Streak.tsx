// shows users current streak day and best day they've had being consistent

interface StreakProps {
  current: number;
  best: number;
}

// streak function
function Streak({ current, best }: StreakProps) {
  return (
    <div className="inline-flex items-center hap-2 rounded-full bg-brand-light px-3 py-1.5 text-sm">
      <span aria-hidden='true'>🔥</span>
      <span className="font-bold text-orange-600">{current}-day streak</span>
      <span className="text-orange-300"> best {best}</span>
    </div>
  )
}

export default Streak;