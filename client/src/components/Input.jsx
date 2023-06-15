export default function Input(props) {
  return (
    <div className="fg">
      <input {...props} />
      <label htmlFor={props.id}>
        {props.Icone}
        {props.lable || props.name}
      </label>
    </div>
  );
}
