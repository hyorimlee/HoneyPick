import * as React from 'react'
import {memo, useState, useCallback, useRef} from 'react'
import {Alert, Image, Pressable, Text, TextInput, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import BaseTextInput from '../../../components/textInput/base'
import BaseButton from '../../../components/button/base'
import PhoneForm from '../../../containers/submitForm/phoneForm'
import {nicknameAlert, nicknameValid} from '../../../modules/valid'
import {useAppDispatch, useAppSelector} from '../../../store/types'
import ImagePicker from 'react-native-image-crop-picker'
import {
  setProfile,
  setProfileImageToServer,
} from '../../../store/slices/profile/asyncThunk'
import {useNavigation} from '@react-navigation/native'
import {ProfileNavigationProp} from './types'

const paddingHorizontal = 30

function EditProfile() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<ProfileNavigationProp>()
  const {initNickname, initDescription, initProfileImage, userId} =
    useAppSelector(state => {
      const {nickname, description, profileImage, userId} = state.profile
      return {
        initNickname: nickname,
        initDescription: description,
        initProfileImage: profileImage,
        userId,
      }
    })
  const [nickname, setNickname] = useState(initNickname)
  const [description, setDescription] = useState(initDescription)
  const [profileImage, setProfileImage] = useState(initProfileImage)
  const [phone, setPhone] = useState('')
  const [isPhoneChange, setIsPhoneChange] = useState(false)
  const descriptionRef = useRef<TextInput | null>(null)

  const profileImageChanged = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image)
      setProfileImage(image.path)
    })
  }, [])

  const nicknameChanged = useCallback(
    (text: string) => {
      setNickname(nicknameValid(text))
    },
    [nickname],
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
    phone.length > 0
      ? dispatch(setProfile({nickname, description, phone}))
      : dispatch(setProfile({nickname, description}))
          .unwrap()
          .then(response => {
            navigation.navigate('Default', {userId})
            // dispatch(setProfileImageToServer())
          })
          .catch(error => {
            console.log(error)
          })
  }, [nickname, description, phone, profileImage])

  return (
    <KeyboardAwareScrollView style={{paddingHorizontal}}>
      <Pressable onPress={profileImageChanged}>
        {/* <Image
          source={{
            uri: profileImage,
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
        /> */}
      </Pressable>
      <BaseTextInput
        value={nickname}
        defaultValue={initNickname}
        onChangeText={nicknameChanged}
        onSubmitEditing={focusDescription}
        onKeyPress={nicknameAlert}
        placeholder={'별명'}
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
