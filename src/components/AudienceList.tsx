import * as React from 'react';

import { AudienceMember } from '../contexts/AudienceList';

interface AudienceListProps {
  audience: AudienceMember[];
  handleSelection: (member: AudienceMember) => void;
}

// Define a function to sort a list by first name
const sortByFirstName = (a: AudienceMember, b: AudienceMember): number => {
  const aName = a.firstName.toLowerCase();
  const bName = b.firstName.toLowerCase();
  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
};

const AudienceList = ({ audience, handleSelection }: AudienceListProps) => {
  const sortedByFirstName: AudienceMember[] = audience.sort(sortByFirstName);

  if (sortedByFirstName.length > 0) {
    return (
      <div className="audience-list">
        <ul className="list">
          {sortedByFirstName.map(member => {
            return (
              <li key={member.id} className="audience-member">
                <div onClick={() => handleSelection(member)}>
                  <p className="audience-name">{member.firstName}</p>
                  <p className="audience-name">{member.lastName}</p>
                  <p className="audience-email">{member.email}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="audience-list">
        <p>There is nobody in your audience yet.</p>
      </div>
    );
  }
};

export default AudienceList;
