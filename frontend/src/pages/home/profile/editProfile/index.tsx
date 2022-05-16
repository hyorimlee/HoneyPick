import * as React from 'react'
import {memo, useState, useCallback, useRef} from 'react'
import {TextInput, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import BaseTextInput from '~/components/textInput/base'
import BaseButton from '~/components/button/base'
import PhoneForm from '~/containers/submitForm/phoneForm'
import {nicknameAlert, nicknameValid} from '~/modules/valid'
import {useAppDispatch, useAppSelector} from '~/store/types'
import ImagePicker from 'react-native-image-crop-picker'
import ImageResizer from 'react-native-image-resizer'
import {setProfile} from '~/store/slices/profile/asyncThunk'
import {useNavigation} from '@react-navigation/native'
import {ProfileEditNavigationProp} from './types'
import Config from 'react-native-config'
import {ProfileImage, ChangeImage} from './styles'

function EditProfile() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<ProfileEditNavigationProp>()
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
  const [profileImage, setProfileImage] = useState(
    `${Config.IMAGE_BASE_URL}/raw/${initProfileImage}`,
  )
  const [phone, setPhone] = useState('')
  const [isPhoneChange, setIsPhoneChange] = useState(false)
  const [imageType, setImageType] = useState('')
  const descriptionRef = useRef<TextInput | null>(null)

  const profileImageChanged = useCallback(() => {
    ImagePicker.openPicker({width: 200, height: 200, cropping: true}).then(
      image => {
        setImageType(image.mime)

        ImageResizer.createResizedImage(
          image.path,
          200,
          200,
          image.mime.includes('jpeg') ? 'JPEG' : 'PNG',
          100,
          0,
        ).then(resizedImage => {
          setProfileImage(resizedImage.uri)
        })
      },
    )
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
    dispatch(setProfile({nickname, description, phone, imageType}))
      .unwrap()
      .then(response => {
        if (response.profileImage !== undefined) {
          const presigned = response.profileImage

          const formData = new FormData()
          for (const key in presigned.fields) {
            formData.append(key, presigned.fields[key])
          }
          formData.append('Content-Type', imageType)
          formData.append('file', {uri: profileImage, type: imageType})

          fetch(presigned.url, {
            method: 'POST',
            body: formData,
          })
        }

        navigation.navigate('Default', {userId})
      })
      .catch(error => {
        console.log(error)
      })
  }, [nickname, description, phone, profileImage])

  return (
    <KeyboardAwareScrollView style={{padding: 30}}>
      <ChangeImage onPress={profileImageChanged}>
        <ProfileImage
          source={{uri: profileImage}}
          resizeMode="contain"
          style={{
            borderRadius: 100,
            width: 128,
            height: 128,
          }}></ProfileImage>
        {/* <FontAwesomeIcon
            icon={faPen as IconProp}
            color="black"
            size={30}
            style={{
              opacity: 10,
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              position: 'absolute',
            }}
          /> */}
      </ChangeImage>
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
          <View style={{alignItems: 'center'}}>
            <BaseButton
              text={'번호 변경 취소'}
              onPress={toggleIsPhoneChange}
              marginVertical={10}
              paddingVertical={10}
              width="60%"
            />
          </View>
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <BaseButton
            text={'휴대전화 번호 변경'}
            onPress={toggleIsPhoneChange}
            marginVertical={10}
            paddingVertical={10}
            width="60%"
          />
        </View>
      )}
      <BaseButton
        text={'수정 완료'}
        onPress={setProfileChange}
        marginVertical={10}
        paddingVertical={10}
        borderRadius={5}
      />
    </KeyboardAwareScrollView>
  )
}

export default memo(EditProfile)
