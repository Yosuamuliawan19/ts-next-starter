interface Props {
  className?: string;
  flex?: string;
  children?: any;
}
export default function BaseLayout(props: Props) {
  return (
    <div
      className={
        'max-w-screen-xl m-auto overflow-x-hidden dark:text-white  px-8 md:px-0'
      }
    >
      {props.children}
    </div>
  );
}
