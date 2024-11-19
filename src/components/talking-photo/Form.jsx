const Form = ({ children, onSubmit }) => (
  <form className="space-y-4 xl:space-y-8" onSubmit={onSubmit}>
    {children}
  </form>
)

export const FormItem = ({ children, label, className }) => (
  <div className={`space-y-2 xl:space-y-3 ${className}`}>
    <label className="text-base font-bold xl:text-[17px]">{label}</label>
    {children}
  </div>
)

export default Form
