interface Props {
  className?: string;
  flex?: string;
  children?: any;
}
export default function BaseLayout(props: Props) {
  return (
    <div className={'max-w-screen-xl m-auto overflow-x-hidden dark:text-white'}>
      {props.children}
    </div>
  );
}
