export const Input = ({
  icon,
  title,
  type,
  placeholder,
  value,
  onChange

}) => {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">
        {title}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
