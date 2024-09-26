const Button = ({ onClick, className, children, ...props }) => {
  const defaultPadding = !className?.includes('p-') ? 'px-4 py-2' : '';

  return (
    <button
      className={`rounded text-base font-bold hover:opacity-95 ${defaultPadding} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
