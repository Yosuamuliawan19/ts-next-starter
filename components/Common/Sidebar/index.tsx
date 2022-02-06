import { Popover } from '@douyinfe/semi-ui';
import useIsMobile from '@hooks/useCheckMobileScreen';
import { AiOutlineArrowUp } from 'react-icons/ai';
export default function Sidebar() {
  const isMobile = useIsMobile();
  return (
    <>
      <div
        className={
          ' z-max fixed left-0  top-0 flex flex-col justify-center w-auto h-screen items-end  bg-none'
        }
      >
        <Popover
          content={
            <div>
              <div
                data-tf-widget="IW2msBzM"
                data-tf-hide-headers
                data-tf-iframe-props="title=Feedback"
                data-tf-medium="snippet"
                style={{ width: 400, height: 400 }}
              ></div>
            </div>
          }
          position={isMobile ? 'topRight' : 'right'}
        >
          <div
            className="bg-gray-200 py-2 px-4 md:py-4 md:px-2 m-0 rounded-md text-black text-sm bold cursor-pointer border-2 border-white fixed md:block bottom-0 left-2"
            style={
              !isMobile
                ? { writingMode: 'vertical-rl', textOrientation: 'mixed' }
                : {}
            }
          >
            Feedback
          </div>
        </Popover>
      </div>
      <div className="fixed md:bottom-8  md:right-8 bottom-1 right-2 z-max  ">
        <a href="#top">
          <div className="bold bg-black text-white border-2 border-white font-display   my-2 hover:opacity-80 shadow-md w-min rounded-full p-4 text-lg">
            <AiOutlineArrowUp />
          </div>
        </a>
      </div>
    </>
  );
}
