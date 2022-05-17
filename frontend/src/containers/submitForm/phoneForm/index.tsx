import * as React from 'react'
import {memo, useState, useCallback} from 'react'
import {Alert, View} from 'react-native'
import {HorizontalView} from './styles'
import BaseTextInput from '~/components/textInput/base'
import BaseButton from '~/components/button/base'
import {onlyNumber, onlyNumberAlert, phoneValid} from '~/modules/valid'
import {IComponentProps} from './types'
import {useAppDispatch} from '~/store/types'
import {
  requestPhoneVerify,
  requestPhoneVerifyCheck,
} from '~/store/slices/user/asyncThunk'

function PhoneForm({setValidPhone}: IComponentProps) {
  const dispatch = useAppDispatch()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [phoneId, setPhoneId] = useState('')
  const [phoneEditable, setPhoneEditable] = useState(true)
  const [status, setStatus] = useState<'idle' | 'request' | 'success' | 'fail'>(
    'idle',
  )

  const phoneNumberChanged = useCallback(
    (text: string) => {
      setPhoneNumber(phoneValid(text))
    },
    [phoneNumber],
  )

  const verificationCodeChanged = useCallback(
    (text: string) => {
      setVerificationCode(onlyNumber(text))
    },
    [verificationCode],
  )

  const phoneSubmit = useCallback(() => {
    if (status === 'idle') {
      setStatus('request')
      setPhoneEditable(false)
      dispatch(requestPhoneVerify({phoneNumber}))
        .unwrap()
        .then(response => {
          setPhoneId(response.phone._id)
        })
        .catch(() => {
          setStatus('idle')
          setPhoneEditable(true)
        })
    } else if (status === 'request') {
      setStatus('idle')
      setPhoneEditable(true)
    }
  }, [phoneNumber, status])

  const verificationCodeSubmit = useCallback(() => {
    dispatch(requestPhoneVerifyCheck({phoneId, verificationCode}))
      .unwrap()
      .then(response => {
        setStatus('success')
        setValidPhone(phoneNumber)
      })
      .catch(error => {
        setStatus('fail')
        Alert.alert(error.err)
      })
  }, [verificationCode, phoneId])

  return (
    <View>
      <HorizontalView>
        <BaseTextInput
          value={phoneNumber}
          onChangeText={phoneNumberChanged}
          onSubmitEditing={phoneSubmit}
          onKeyPress={onlyNumberAlert}
          placeholder={'휴대전화번호'}
          placeholderTextColor={'#C4C4C4'}
          importantForAutofill={'yes'} // Android
          autoComplete={'tel'} // Android
          textContentType={'telephoneNumber'} // ios
          keyboardType={'number-pad'}
          returnKeyType={'send'}
          flex={3}
          maxLength={13}
          editable={phoneEditable}
        />
        {status !== 'success' ? (
          <BaseButton
            text={status === 'idle' ? '인증번호 요청' : '인증번호 재요청'}
            onPress={phoneSubmit}
            borderRadius={5}
            marginVertical={5}
            flex={2}
            disabled={phoneNumber.length < 12}
          />
        ) : null}
      </HorizontalView>
      {status === 'request' || status === 'fail' ? (
        <HorizontalView>
          <BaseTextInput
            value={verificationCode}
            onChangeText={verificationCodeChanged}
            onSubmitEditing={verificationCodeSubmit}
            onKeyPress={onlyNumberAlert}
            placeholder={'인증번호'}
            placeholderTextColor={'#C4C4C4'}
            keyboardType={'number-pad'}
            returnKeyType={'send'}
            flex={3}
            maxLength={6}
          />
          <BaseButton
            text={'인증번호 확인'}
            onPress={verificationCodeSubmit}
            borderRadius={5}
            marginVertical={5}
            flex={2}
            disabled={verificationCode.length < 6}
          />
        </HorizontalView>
      ) : null}
    </View>
  )
}

export default memo(PhoneForm)
