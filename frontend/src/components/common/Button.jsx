import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | outline | danger
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: "bg-violet-500 hover:bg-violet-600 text-white shadow-lg shadow-violet-500/20",
    secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10",
    outline: "border border-white/20 text-gray-300 hover:border-violet-500/50 hover:text-white hover:bg-white/5",
    danger: "border border-red-500/30 text-red-400 hover:bg-red-500/10",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
