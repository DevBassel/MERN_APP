
export default function Input({ val, fun, type, id, name, lable, Icone,accept }) {

  
  return (
    <div className="fg">
      <input
        onChange={fun}
        type={type}
        id={id}
        name={name}
        value={val}
        accept={accept}
        required
      />
      <label htmlFor={id}>
      {Icone}
        {lable || name}
      </label>
    </div>
  );
}
