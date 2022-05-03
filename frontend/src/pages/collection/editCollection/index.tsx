import * as React from 'react'
import {memo, useState, useCallback, useRef} from 'react'
import {Alert, Image, Pressable, Text, TextInput, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import BaseTextInput from '../../../components/textInput/base'
import BaseButton from '../../../components/button/base'
import PhoneForm from '../../../containers/submitForm/phoneForm'
import {specialCharacterAlert, usernameValid} from '../../../modules/valid'
import {useAppSelector} from '../../../store/types'
import {imagePath} from '../../../modules/condition'

const paddingHorizontal = 30

function EditCollection() {
  const [username, setUsername] = useState('컬렉션 닉네임')
  const [description, setDescription] = useState('컬렉션 소개')
  const [profileImage, setProfileImage] = useState('')
  const descriptionRef = useRef<TextInput | null>(null)

  const usernameChanged = useCallback(
    (text: string) => {
      setUsername(usernameValid(text))
    },
    [username],
  )
  const descriptionChanged = useCallback(
    (text: string) => {
      setDescription(text)
    },
    [description],
  )

  const focusDescription = useCallback(() => {
    descriptionRef.current?.focus()
  }, [])

  const setProfileChange = useCallback(() => {
    Alert.alert(
      `name : ${username} | Image : ${profileImage} | des : ${description.slice(
        5,
      )}..`,
    )
  }, [username, description, profileImage])

  return (
    <KeyboardAwareScrollView style={{paddingHorizontal}}>
      <Pressable onPress={() => Alert.alert('이미지 변경 로직')}>
        <Image
          source={{
            uri: 'https://www.pngfind.com/pngs/m/387-3877350_kakao-friends-ryan-png-kakao-friends-ryan-icon.png',
          }}
          style={{
            width: 128,
            height: 128,
            resizeMode: 'contain',
            borderRadius: 100,
            backgroundColor: 'black',
            alignSelf: 'center',
            marginVertical: 30,
          }}
        />
      </Pressable>
      <BaseTextInput
        value={username}
        defaultValue={'사용자 기본 이름'}
        onChangeText={usernameChanged}
        onSubmitEditing={focusDescription}
        onKeyPress={specialCharacterAlert}
        placeholder={'아이디'}
        importantForAutofill={'auto'} // Android
        autoComplete={'username'} // Android
        textContentType={'username'} // ios
        returnKeyType={'next'}
        maxLength={10}
      />
      <BaseTextInput
        ref={descriptionRef}
        value={description}
        defaultValue={'사용자소개'}
        onChangeText={descriptionChanged}
        placeholder={'자기소개'}
        returnKeyType={'done'}
        maxLength={50}
        multiline={true}
      />
      <BaseButton
        text={'수정 완료'}
        onPress={setProfileChange}
        marginVertical={30}
        paddingVertical={10}
      />
    </KeyboardAwareScrollView>
  )
}

export default memo(EditCollection)
