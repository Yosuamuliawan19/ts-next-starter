interface Props {
  className?: string;
  flex?: string;
  children?: any;
}
export default function BaseLayout(props: Props) {
  return (
    <div className={'max-w-screen-xl m-auto overflow-x-visible   px-4 md:px-0'}>
      {props.children}
    </div>
  );
}
