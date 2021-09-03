import awsmobile from '../aws-exports';

export const S3BucketURL = `https://${awsmobile.aws_user_files_s3_bucket}.s3.${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/public/`;

export const BASE_URL = 'https://www.kerja.vc/v1';

export const STATUS_TYPES = {
  PUBLISHED: 'Published',
  DRAFT: 'Draft',
  CLOSED: 'Closed',
  ARCHIVED: 'Archived',
};
export const EDIT_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const APPLICATION_STATUS_TYPES = {
  REJECTED: 'Rejected',
  ACCEPTED: 'Approved',
  PENDING: 'Pending Review',
  SHORTLISTED: 'Shortlisted',
};

export const DEFAULT_PROFILE_PICTURE =
  'https://res.cloudinary.com/yosuam19/image/upload/v1629472978/kerja/11.-Fuchsia_1_vdivtt.jpg';
