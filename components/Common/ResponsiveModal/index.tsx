import { Modal, SideSheet } from '@douyinfe/semi-ui';
import useIsMobile from '@hooks/useCheckMobileScreen';
import React from 'react';
function ResponsiveModal({
  children,
  isModal = false,
  visible,
  setVisible,
  title,
}) {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <SideSheet
          title={title}
          visible={visible}
          onCancel={() => setVisible(false)}
          placement={'bottom'}
          disableScroll={false}
        >
          {children}
        </SideSheet>
      ) : (
        <Modal
          width={720}
          title={title}
          visible={visible}
          okButtonProps={{ theme: 'solid', className: 'bg-black' }}
          onOk={() => setVisible(false)}
          // afterClose={this.handleAfterClose} // >= 1.16.0
          onCancel={() => setVisible(false)}
          footer={null}
        >
          {children}
        </Modal>
      )}
    </>
  );
}

export default ResponsiveModal;
