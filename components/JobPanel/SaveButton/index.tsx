import { saveJob } from '@api/jobs';
import { useToast } from '@chakra-ui/react';
import AuthContext, { USER_ROLES } from '@context/Auth';
import { useContext } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const SaveButton = ({ saved, onSuccess, id }) => {
  const toast = useToast();
  const { userDetails } = useContext(AuthContext);

  const onSaveJobs = async (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    try {
      const res = await saveJob(id);
      toast({
        title: `Successfully ${saved ? 'unsaved' : 'saved'} job`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      onSuccess();
    } catch (e) {
      toast({
        title: 'Error encountered',
        description: e.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };
  if (userDetails?.role !== USER_ROLES.USER) {
    return null;
  }

  return (
    <div onClick={onSaveJobs}>
      {saved ? (
        <AiFillHeart
          className={
            'bounce-in ml-2 text-xl fill-current text-red-500 cursor-pointer'
          }
        />
      ) : (
        <AiOutlineHeart className={'bounce-in ml-2 text-xl cursor-pointer'} />
      )}
    </div>
  );
};
export default SaveButton;
