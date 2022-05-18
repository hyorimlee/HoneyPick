import * as React from 'react'
import {memo, useCallback} from 'react'
import ChooseCollection from '~/containers/chooseCollection'
import CollectionForm from '~/containers/submitForm/collectionForm'
import VoteForm from '~/containers/submitForm/voteForm'
import uiSlice from '~/store/slices/ui'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {Screen, Background, Modal} from './styles'

function ModalView() {
  const dispatch = useAppDispatch()
  const {isModal} = useAppSelector(state => state.ui)

  const onPressBackground = useCallback(() => {
    dispatch(uiSlice.actions.setIsModal(false))
  }, [])

  return (
    <Screen>
      <Background onPress={onPressBackground} />
      <Modal>
        {isModal === 'clipboard' ? (
          <ChooseCollection />
        ) : isModal === 'createVote' ? (
          <VoteForm />
        ) : (
          <CollectionForm />
        )}
      </Modal>
    </Screen>
  )
}

export default memo(ModalView)
