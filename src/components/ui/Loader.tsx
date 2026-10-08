// loader will be a spiinning circle while data loads

interface LoaderProps {
  label?: string;
}

// loader function
function Loader({ label = 'Loading...' }: LoaderProps) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16"> 
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-light border-t-brand"
      />
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );

}

export default Loader;