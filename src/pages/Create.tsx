import * as React from 'react';

import PageIndex from '../components/PageIndex';
import AudienceForm from '../components/AudienceForm';
import { Page } from '../contexts/CurrentPage';

// Define the name for this page
const pageName = Page.CREATE;

const Create: React.FC = () => {
  return (
    <PageIndex pageName={pageName}>
      <h1 className="header">Create</h1>
      <div className="page-content page-content--reverse">
        <div className="form-area form-area--left">
          <AudienceForm />
        </div>
        <div />
      </div>
    </PageIndex>
  );
};

export default Create;
