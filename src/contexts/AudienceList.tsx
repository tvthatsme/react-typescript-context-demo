import * as React from 'react';

import uuid from '../utilities/uuid';

// Define the action types that can be done on the audience list
export enum ActionTypes {
  ADD_MEMBER = 'ADD_MEMBER',
  EDIT_MEMBER = 'EDIT_MEMBER',
  DELETE_MEMBER = 'DELETE_MEMBER'
}

// Define the schema for an audience member
export type AudienceMember = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
};

// Define the state parts that the audience list context will track
type State = {
  audience: AudienceMember[];
};

// Define the actions that can be done on the audience list
export type Action =
  | {
      type: ActionTypes.ADD_MEMBER;
      member: AudienceMember;
    }
  | {
      type: ActionTypes.EDIT_MEMBER;
      member: AudienceMember;
    }
  | {
      type: ActionTypes.DELETE_MEMBER;
      member: AudienceMember;
    };

// Define the dispatch function for the context reducer
type Dispatch = (action: Action) => void;

type AudienceListProviderProps = {
  children: React.ReactNode;
};

const AudienceListContext = React.createContext<State | undefined>(undefined);
const AudienceListDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const audienceReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_MEMBER: {
      const member: AudienceMember = {
        ...action.member,
        id: uuid()
      };
      return {
        ...state,
        audience: [...state.audience, member]
      };
    }
    case ActionTypes.EDIT_MEMBER: {
      const otherMembers = state.audience.filter(
        (member: AudienceMember) => member.id !== action.member.id
      );
      return {
        ...state,
        audience: [...otherMembers, action.member]
      };
    }
    case ActionTypes.DELETE_MEMBER: {
      const otherMembers = state.audience.filter(
        (member: AudienceMember) => member.id !== action.member.id
      );
      return {
        ...state,
        audience: [...otherMembers]
      };
    }
    default:
      return state;
  }
};

const AudienceListProvider = ({ children }: AudienceListProviderProps) => {
  // Define the initial state
  const initialState: State = {
    audience: []
  };

  // Use a reducer as an interface for updating the audience list
  const [audience, updateAudience] = React.useReducer(
    audienceReducer,
    initialState
  );

  return (
    <AudienceListContext.Provider value={audience}>
      <AudienceListDispatchContext.Provider value={updateAudience}>
        {children}
      </AudienceListDispatchContext.Provider>
    </AudienceListContext.Provider>
  );
};

// Provide a method for consuming the audience list context
const useAudienceList = () => {
  const context = React.useContext(AudienceListContext);
  if (context === undefined) {
    throw new Error(
      'useAudienceList must be used within a AudienceListProvider'
    );
  }
  return context.audience;
};

// Provide a method for consuming the audience list reducer context
const useAudienceListReducer = () => {
  const context = React.useContext(AudienceListDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useAudienceListReducer must be used within a AudienceListProvider'
    );
  }
  return context;
};

export { AudienceListProvider, useAudienceList, useAudienceListReducer };
