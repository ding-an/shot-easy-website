const Radio = ({ items, value, onChange }) => {
  return (
    <ul className="inline-flex gap-1">
      {items.map((item) => {
        const { key, label } = item
        const actived = value === key
        const onClick = () => {
          if (actived) return
          onChange(key)
        }
        return (
          <li
            key={key}
            className={`h-8 rounded-xl border px-3 text-sm font-light leading-8 text-black/80 xl:cursor-pointer ${actived ? 'border-[#6723FF] bg-[#6723FF]/10' : 'border-transparent'}`}
            onClick={onClick}
          >
            {label}
          </li>
        )
      })}
    </ul>
  )
}

export default Radio
