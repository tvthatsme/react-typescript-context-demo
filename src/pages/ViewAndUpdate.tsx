import * as React from 'react';

import PageIndex from '../components/PageIndex';
import { Page } from '../contexts/CurrentPage';

// Define the name for this page
const pageName = Page.VIEW_AND_UPDATE;

const ViewAndUpdate: React.FC = () => (
  <PageIndex pageName={pageName}>
    <h1>View and Update</h1>
  </PageIndex>
);

export default ViewAndUpdate;
