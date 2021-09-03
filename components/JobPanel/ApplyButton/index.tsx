import { Button, useToast } from '@chakra-ui/react';
import { createApplication } from 'api/applications';
import AuthContext, { USER_ROLES } from '@context/Auth';
import { useContext } from 'react';

import { useState } from 'react';
import { showErrorMsg } from '@helpers';
const ApplyButton = ({ job_id, callback, disabled }) => {
  const toast = useToast();
  const { userDetails } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const onApplyJob = async () => {
    if (!userDetails.resume || userDetails.resume?.length < 1) {
      showErrorMsg('You need to upload resume first before applying');
      return;
    }
    setLoading(true);
    try {
      const res = await createApplication(job_id);
      if (callback) callback();
    } catch (e) {
      showErrorMsg(e.message);
    }
    setLoading(false);
  };

  if (userDetails?.role !== USER_ROLES.USER) {
    return null;
  }
  return (
    <Button
      disabled={disabled}
      colorScheme="red"
      size="sm"
      onClick={onApplyJob}
      isLoading={loading}
    >
      Apply Now
    </Button>
  );
};
export default ApplyButton;
