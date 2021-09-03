import { STATUS_TYPES, APPLICATION_STATUS_TYPES } from '@constants';
export const getStatusColor = (status: string) => {
  if (status === STATUS_TYPES.PUBLISHED) {
    return '#38A169';
  } else if (status === STATUS_TYPES.DRAFT) {
    return '#3182CE';
  } else if (status === STATUS_TYPES.CLOSED) {
    return '#DD6B20';
  } else {
    return '#F56565';
  }
};

export const getApplicationStatusColor = (status: string) => {
  if (status === APPLICATION_STATUS_TYPES.ACCEPTED) {
    return '#38A169';
  } else if (status === APPLICATION_STATUS_TYPES.PENDING) {
    return '#3182CE';
  } else if (status === APPLICATION_STATUS_TYPES.REJECTED) {
    return '#E53E3E';
  } else {
    return '#38A169';
  }
};
