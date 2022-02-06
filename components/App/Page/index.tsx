import { usePageData } from '@api';
import React from 'react';
import Element from './Element';
import { usePage } from 'state/Page';
export default function Page() {
  const { background, initializePage, elements } = usePage((state) => ({
    background: state.background,
    initializePage: state.initializePage,
    elements: state.elements,
  }));
  const { data } = usePageData();
  console.log(data);

  React.useEffect(() => {
    initializePage(data?.page);
  }, [data]);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <div
      style={{ background: background, backgroundSize: 'cover' }}
      className="w-full h-full"
    >
      {elements?.map((data) => {
        return <Element elementKey={data.key} />;
      })}
    </div>
  );
}
