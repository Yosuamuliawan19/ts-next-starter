import React from 'react';
import JobEditComponent from '../JobEditComponent';

interface Props {
  id: string;
}
const EditJobView = ({ company, id, onUpdate }: Props) => {
  return (
    <div className="text-pop-up-top bg-white ">
      <JobEditComponent
        company={company}
        mode={'edit'}
        id={id}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default EditJobView;
