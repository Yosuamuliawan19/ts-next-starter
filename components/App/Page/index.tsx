import { usePageData } from '@api';
import React from 'react';
import Element from './Element';
import { usePage } from 'state/Page';
import FloatingPanel from '../Panels/FloatingPanel';
import { useUI } from 'state/UI';
import { useRouter } from 'next/router';
import { Spin } from '@douyinfe/semi-ui';
import { useHotkeys } from 'react-hotkeys-hook';

export default function Page() {
  const router = useRouter();
  const { page_url } = router.query;
  const {
    background,
    initializePage,
    elements,
    deselectAllElements,
    xAlignments,
    yAlignments,
    pasteSelectedElement,
    copySelectedElement,
    deleteSelectedElement,
    savePage,
  } = usePage((state) => ({
    background: state.background,
    initializePage: state.initializePage,
    elements: state.elements,
    deselectAllElements: state.deselectAllElements,
    xAlignments: Array.from(state.xAlignments.keys()),
    yAlignments: Array.from(state.yAlignments.keys()),
    copySelectedElement: state.copySelectedElement,
    pasteSelectedElement: state.pasteSelectedElement,
    deleteSelectedElement: state.deleteSelectedElement,
    savePage: state.savePage,
  }));
  const { isScrolling, setIsScrolling } = useUI((state) => ({
    isScrolling: state.isScrolling,
    setIsScrolling: state.setIsScrolling,
  }));
  React.useEffect(() => {
    window.onscroll = () => setIsScrolling(true);

    const interval = setInterval(() => {
      if (isScrolling) {
        setIsScrolling(false);
        clearInterval(interval);
      }
    }, 10);

    return () => {
      window.onscroll = null;
    };
  }, [isScrolling]);

  const { data, isValidating } = usePageData(page_url);

  useHotkeys('cmd + c', copySelectedElement, [copySelectedElement]);
  useHotkeys('cmd + v', pasteSelectedElement, [pasteSelectedElement]);
  useHotkeys('backspace', deleteSelectedElement, [deleteSelectedElement]);
  useHotkeys('cmd + s', savePage, [savePage]);

  React.useEffect(() => {
    initializePage(data?.page);
  }, [data]);

  if (!page_url) {
    return <div className="p-4">Please select page to edit</div>;
  }

  if (!data || isValidating) {
    return <Spin tip="Loading page..." spinning={isValidating} />;
  }
  // console.log('elements', elements);
  // console.log(xAlignments);

  return (
    <div
      style={{ background: background, backgroundSize: 'cover' }}
      className="w-full min-h-screen z-0 relative"
    >
      <div
        style={{
          position: 'absolute',
          left: 'calc(50vw )',
        }}
        className="w-full min-h-screen "
        // onClick={() => deselectAllElements()}
      >
        <div className="relative z-1">
          <FloatingPanel />
        </div>
        <div className="relative z-0">
          {elements?.map((data) => {
            return <Element elementKey={data.key} />;
          })}
          {/* <AlignmentGuideDebug
            xAlignments={xAlignments}
            yAlignments={yAlignments}
          /> */}
        </div>
      </div>
    </div>
  );
}

function AlignmentGuideDebug({ xAlignments, yAlignments }) {
  return (
    <>
      {xAlignments.map((data, idx) => {
        return (
          <div
            key={idx}
            className=" w-0 h-screen z-max absolute opacity-20"
            style={{
              border: '1px solid red',
              transform: `translate(${data}px, ${0}px)`,
            }}
          ></div>
        );
      })}
      {yAlignments.map((data, idx) => {
        return (
          <div
            key={idx}
            className=" w-screen h-0 z-max absolute opacity-20"
            style={{
              border: '1px solid yellow',
              transform: `translate(-50vw, ${data}px)`,
            }}
          ></div>
        );
      })}
    </>
  );
}
