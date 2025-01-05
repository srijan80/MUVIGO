function Button({ children, onClick, className = '' }) {
    return (
      <button
        onClick={onClick}
        className={`group bg-white text-purple-600 px-2 py-2 rounded-full font-semibold text-lg shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center space-x-2 ${className}`}
      >
        {children}
      </button>
    );
  }
  export default Button;