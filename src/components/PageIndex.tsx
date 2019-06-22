import * as React from 'react';

import {
  Page,
  useCurrentPage,
  useSetCurrentPage
} from '../contexts/CurrentPage';

type PageProps = {
  children: React.ReactNode;
  pageName: Page;
};

const PageIndex = ({ children, pageName }: PageProps) => {
  const currentPage = useCurrentPage();
  const setPage = useSetCurrentPage();

  // Create an array of the other pages of the app for a navigation
  const otherPages: Page[] = Object.values(Page).filter(
    page => page !== pageName
  );

  // Handle navigation to another page
  const handleLinkClick = (e: React.MouseEvent, page: Page) => {
    e.preventDefault();
    setPage(page);
  };

  // Show the page if the current page matches, otherwise hide this page
  return currentPage === pageName ? (
    <div>
      {otherPages.map(page => (
        <a
          key={page}
          href={page}
          onClick={(event: React.MouseEvent) => {
            handleLinkClick(event, page);
          }}
        >
          {page}
        </a>
      ))}
      {children}
    </div>
  ) : null;
};

export default PageIndex;
