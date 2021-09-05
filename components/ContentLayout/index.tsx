interface Props {
  className?: string;
  flex?: string;
}
export default function BaseLayout(props: Props) {
  return (
    <div className={'max-w-screen-lg m-auto overflow-x-hidden dark:text-white'}>
      {props.children}
    </div>
  );
}
