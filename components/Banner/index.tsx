export default function Banner(props) {
  return (
    <div className="bg-red-400  text-sm justify-center flex p-2 font-display text-red-200">
      {props.children}
    </div>
  );
}
