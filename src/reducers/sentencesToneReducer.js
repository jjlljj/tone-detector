export const sentencesToneReducer = ( state={}, action ) => {
  switch(action.type) {
    case 'ADD_SENTENCES_TONE':
      return action.sentencesTone
    default:
      return state
  }
}