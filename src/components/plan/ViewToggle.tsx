// viewToggle row of buttons with one sselcted for different views grid, lists, etc


interface ViewToggleOptions<T extends string> {
  value: T;
  label: string;
}

interface ViewToggleProps<T extends string> {
  label: string; 
  options: ViewToggleOptions<T>[];
  value: T;
  onChange: (value: T) => void;
}

function ViewToggle<T extends string>({ label, options, value, onChange }: ViewToggleProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full bg-gray-100 p-1">
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={[
              'min-h-10 rounded-full px-4 text-sm font-semibold transition',
              isSelected ? 'bg-white text-ink shadow-sm' : 'text-gray-600 hover:text-ink',
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default ViewToggle;