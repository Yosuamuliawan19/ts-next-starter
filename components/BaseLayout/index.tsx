export default function BaseLayout(props: React.PropsWithChildren<any>) {
  return (
    <div
      className={
        '    w-full transition-colors duration-200 ease-in-out ' +
        props.className
      }
      style={props?.style}
    >
      {props.children}
    </div>
  );
}
