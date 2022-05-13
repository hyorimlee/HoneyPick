import * as React from 'react'
import {memo, useState, useEffect, useCallback, useMemo} from 'react'
import {View, Text, Pressable} from 'react-native'
import FollowList from './components/followList'
import {getFollowList} from '~/store/slices/profile/asyncThunk'
import {useAppDispatch, useAppSelector} from '~/store/types'
import {
  Container,
  Background,
  HorizontalContainer,
  CustomText,
  TotalView,
} from './styles'

const paddingHorizontal = 30

function FollowStack() {
  const dispatch = useAppDispatch()
  const {following, followingList, follower, followerList} = useAppSelector(
    state => state.profile,
  )

  const [selected, setSelected] = useState<'following' | 'follower'>(
    'following',
  )

  const selectedFollowing = useCallback(() => {
    setSelected('following')
  }, [])

  const selectedFollower = useCallback(() => {
    setSelected('follower')
  }, [])

  useEffect(() => {
    dispatch(getFollowList())
  }, [])

  return (
    <Container>
      <Background
        source={require('~/assets/images/receipt_long.png')}
        resizeMode="stretch">
        <HorizontalContainer>
          <Pressable onPress={selectedFollowing}>
            <CustomText selected={selected === 'following' ? true : false}>
              following
            </CustomText>
          </Pressable>
          <Pressable onPress={selectedFollower}>
            <CustomText selected={selected === 'follower' ? true : false}>
              follower
            </CustomText>
          </Pressable>
        </HorizontalContainer>
        <TotalView>
          <CustomText selected={false}>
            total {selected === 'following' ? following : follower}
          </CustomText>
        </TotalView>
        <FollowList
          data={
            selected === 'following' ? followingList : followerList
          }></FollowList>
      </Background>
    </Container>
  )
}

export default memo(FollowStack)
