const Button = ({ title, onClick, className }) => {
  return (
    <button
      className={`rounded px-4 py-2 text-base font-bold hover:opacity-95 ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
