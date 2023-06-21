export default function Input(props) {
  return (
    <div className="fg">
      <input {...props} />
      <label htmlFor={props.id}>
        {props.icone}
        {props.lable || props.name} (Opt)
      </label>
    </div>
  );
}
