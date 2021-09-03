export default function BaseLayout(props: React.PropsWithChildren<any>) {
  return (
    <div
      className={
        '  bg-white dark:bg-gray-900 w-full transition-colors duration-200 ease-in-out ' +
        props.className
      }
      style={props?.style}
    >
      {props.children}
    </div>
  );
}
