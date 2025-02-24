const Button = ({ variant, size, children }) => {
  const baseClasses =
    "flex justify-center items-center px-6 py-5 text-xl font-bold leading-none rounded-lg border-2 border-solid transition-all duration-200";

  const variantClasses =
    variant === "primary"
      ? "text-white bg-[#7096D1]  cursor-pointer hover:bg-gray-700 hover:text-white"
      : "text-black cursor-pointer";

  const sizeClasses =
  size === "large"
  ? "px-6 py-5 text-2xl"
  : size === "small"
  ? "!px-3 !py-2 !text-sm !text-white"  // Forcefully small size apply hoga
  : "px-4 py-3 text-base";// Default medium size

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses}`}>
      {variant === "secondary" && (
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/17ba274e19cd4bcb7be48309a26f57a29da3aa2d34da60d4985094d331fd5e86?placeholderIfAbsent=true&apiKey=acdba41aa2944c3882a28ccbc21fcf8a"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square mr-4"
        />
      )}
      <span className="self-stretch px-4 my-auto">{children}</span>
    </button>
  );
};

export default Button;
