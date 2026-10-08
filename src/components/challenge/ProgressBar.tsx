// progress bar i want gradient with yellow and orange 

interface ProgressBarProps {
  percent: number;
  label: string;
}
// progressbar function
function ProgressBar({ percent, label }: ProgressBarProps) {
  // keep number between 0 and 100
  const keepNumber = Math.min(100, Math.max(0, Math.round(percent)));

  return (
    // progress bar
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={keepNumber}
      aria-valuemin={0}
      aria-valuemax={100}
      className='h-3 w-full overflow-hidden rounded-full bg-yellow-200'
    >
      {/* // inside of progress bar shows  */}
      <div 
        className="h-full rounded-full bg-liinear-to-r from-brand to-accent transition-all"
        style={{ width: `${keepNumber}%` }}
      />
    </div> 
  );
}

export default ProgressBar;