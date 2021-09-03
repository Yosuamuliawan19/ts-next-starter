interface Props {
  className?: string;
  flex?: string;
}
export default function BaseLayout(props: Props) {
  let { className, flex, style } = props;
  if (!flex) {
    flex = ' flex-col  ';
  }
  return (
    <div
      className={
        flex +
        ' max-w-screen-xl m-auto flex overflow-x-hidden dark:text-white ' +
        className
      }
      style={style}
    >
      {props.children}
    </div>
  );
}
