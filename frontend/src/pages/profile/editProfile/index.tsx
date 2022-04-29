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

function EditProfile() {
  const {initUsername, initDescription, initProfileImage} = useAppSelector(
    state => {
      const {username, description, profileImage} = state.user
      return {
        initUsername: username,
        initDescription: description,
        initProfileImage: profileImage,
      }
    },
  )
  const [username, setUsername] = useState(initUsername)
  const [description, setDescription] = useState(initDescription)
  const [profileImage, setProfileImage] = useState(initProfileImage)
  const [phone, setPhone] = useState('')
  const [isPhoneChange, setIsPhoneChange] = useState(false)
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

  const setValidPhone = useCallback((text: string) => {
    setPhone(text)
  }, [])

  const toggleIsPhoneChange = useCallback(() => {
    setIsPhoneChange(!isPhoneChange)
    setPhone('')
  }, [isPhoneChange])

  const setProfileChange = useCallback(() => {
    Alert.alert(
      `name : ${username} | phone : ${phone} | Image : ${profileImage} | des : ${description.slice(
        5,
      )}..`,
    )
  }, [username, description, phone, profileImage])

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
        defaultValue={initUsername}
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
        defaultValue={initDescription}
        onChangeText={descriptionChanged}
        placeholder={'자기소개'}
        returnKeyType={'done'}
        maxLength={50}
        multiline={true}
      />
      {isPhoneChange ? (
        <View>
          <PhoneForm setValidPhone={setValidPhone} />
          <BaseButton
            text={'번호 변경 취소'}
            onPress={toggleIsPhoneChange}
            marginVertical={10}
            paddingVertical={10}
          />
        </View>
      ) : (
        <BaseButton
          text={'휴대전화 번호 변경'}
          onPress={toggleIsPhoneChange}
          marginVertical={10}
          paddingVertical={10}
        />
      )}

      <BaseButton
        text={'수정 완료'}
        onPress={setProfileChange}
        marginVertical={30}
        paddingVertical={10}
      />
    </KeyboardAwareScrollView>
  )
}

export default memo(EditProfile)
