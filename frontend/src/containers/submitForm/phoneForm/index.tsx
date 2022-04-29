import * as React from 'react'
import {memo, useState, useCallback, forwardRef} from 'react'
import {Alert, TextInput, View} from 'react-native'
import {HorizontalView} from './styles'
import BaseTextInput from '../../../components/textInput/base'
import BaseButton from '../../../components/button/base'
import {
  noSpace,
  onlyNumber,
  onlyNumberAlert,
  phoneValid,
} from '../../../modules/valid'
import {IComponentProps} from './types'

function PhoneForm({setValidPhone}: IComponentProps) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [phoneEditable, setPhoneEditable] = useState(true)
  const [status, setStatus] = useState<'idle' | 'request' | 'success' | 'fail'>(
    'idle',
  )

  const phoneChanged = useCallback(
    (text: string) => {
      setPhone(phoneValid(text))
    },
    [phone],
  )

  const codeChanged = useCallback(
    (text: string) => {
      setCode(onlyNumber(text))
    },
    [code],
  )

  const phoneSubmit = useCallback(() => {
    if (status === 'idle') {
      setStatus('request')
      setPhoneEditable(false)
      Alert.alert('인증코드 요청')
    } else if (status === 'request') {
      setStatus('idle')
      setPhoneEditable(true)
    }
  }, [phone, status])

  const codeSubmit = useCallback(() => {
    Alert.alert('인증코드 검증')
    setStatus('success')
    setValidPhone(phone)
  }, [code])

  return (
    <View>
      <HorizontalView>
        <BaseTextInput
          value={phone}
          onChangeText={phoneChanged}
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
            disabled={phone.length < 12}
          />
        ) : null}
      </HorizontalView>
      {status === 'request' || status === 'fail' ? (
        <HorizontalView>
          <BaseTextInput
            value={code}
            onChangeText={codeChanged}
            onSubmitEditing={codeSubmit}
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
            onPress={codeSubmit}
            borderRadius={5}
            marginVertical={5}
            flex={2}
            disabled={code.length < 6}
          />
        </HorizontalView>
      ) : null}
    </View>
  )
}

export default memo(PhoneForm)
