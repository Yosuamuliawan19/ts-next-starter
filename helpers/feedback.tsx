import { Notification } from '@douyinfe/semi-ui';

export function showSuccessMsg(message: string) {
  Notification.success({ content: message, duration: 3 });
}
export function showErrorMsg(message: string) {
  Notification.warning({ content: message, duration: 3 });
}
