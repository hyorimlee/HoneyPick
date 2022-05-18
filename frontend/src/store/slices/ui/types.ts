export type IIsModal =
  | false
  | 'createCollection'
  | 'editCollection'
  | 'clipboard'
  | 'clipboardCreateCollection'
  | 'createVote'

export interface IInitialState {
  isModal: IIsModal
}
