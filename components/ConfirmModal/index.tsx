export default function ConfirmModal() {
  return (
    <div className="fixed bg-gray-400 bg-opacity-50 h-screen w-screen z-max flex flex-col justify-center items-center">
      <div className="flex-col flex  bg-white z-max font-display w-auto  p-4 justify-center items-center rounded-lg">
        <div className="text-lg">
          Allow app to find, connect to and determine the relative position of
          nearby devices ?
        </div>
        <button className="bg-black text-white  px-4 py-2 mx-auto rounded-md">
          Confirm
        </button>
        <button className="text-black   px-4 py-2  mx-auto  rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
const classes = {
  btn: {
    red: 'rounded-xl shadow-sm px-4 py-2 font-bold font-display text-red-600 bg-red-100 hover:bg-red-200 duration-300 ease-in-out',
    blue: 'rounded-xl shadow-sm px-4 py-2 font-bold font-display  text-blue-600 bg-blue-100 hover:bg-blue-200 duration-300 ease-in-out',
    green:
      'rounded-xl shadow-sm px-4 py-2 font-bold font-display text-green-600 bg-green-100 hover:bg-green-200 duration-300 ease-in-out',
    yellow:
      'rounded-xl shadow-sm px-4 py-2 font-bold font-display text-yellow-600 bg-yellow-100 hover:bg-yellow-200 duration-300 ease-in-out',
  },
  linkContainer: 'flex-col flex dark:text-white ',
  linkHeader: 'text-sm p-2 font-bold',
  link: 'text-gray-600 items-center flex text-sm p-2 rounded-md hover:bg-link-hover duration-300 ease-in-out dark:text-white dark:hover:bg-gray-700 cursor-pointer font-display',
};
