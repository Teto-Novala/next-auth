export default function InputAuth({ placeholder, type, ...props }) {
  return (
    <input
      {...props}
      type={type}
      className="border outline-none p-1 outline-1 focus:outline-blue-500 w-full"
      placeholder={placeholder}
    />
  );
}
