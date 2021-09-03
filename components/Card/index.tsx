export default function Card(props) {
  return (
    <div
      className={
        'rounded-xl m-4 transform duration-100  p-4 hover:cursor-pointer bg-white dark:text-white  text-sm   dark:bg-gray-700 ' +
        props?.className +
        (props?.hoverable && ' hover:shadow-lg ')
      }
    >
      {props?.children}
    </div>
  );
}
