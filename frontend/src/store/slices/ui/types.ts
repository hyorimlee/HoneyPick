export type IIsModal =
  | false
  | 'createCollection'
  | 'editCollection'
  | 'clipboard'
  | 'clipboardCreateCollection'

export interface IInitialState {
  isModal: IIsModal
}
