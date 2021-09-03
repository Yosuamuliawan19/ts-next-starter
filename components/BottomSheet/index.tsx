interface Props {
  show: boolean;
  children: any;
}
export default function BottomSheet(props: Props) {
  const { show } = props;
  if (!show) return null;
  return <div className="fixed bottom-0 z-max">{props.children}</div>;
}
