import {
  ColorValue,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInputKeyPressEventData,
} from 'react-native'

export interface IComponentProps {
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  placeholderTextColor?: string
  defaultValue?: string
  importantForAutofill?:
    | 'yes'
    | 'auto'
    | 'no'
    | 'noExcludeDescendants'
    | 'yesExcludeDescendants'
    | undefined
  autoComplete?:
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'gender'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'username'
    | 'username-new'
    | 'off'
    | undefined
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined
  keyboardType?:
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | undefined
  returnKeyType?: ReturnKeyTypeOptions | undefined
  onSubmitEditing?: () => void
  secureTextEntry?: boolean | undefined
  marginHorizontal?: string | number
  marginVertical?: string | number
  paddingHorizontal?: string | number
  paddingVertical?: string | number
  borderBottomWidth?: number
  borderBottomColor?: ColorValue
  borderStyle?: 'solid' | 'dotted' | 'dashed'
  fontSize?: number
  backgroundColor?: ColorValue
  flex?: number
  maxLength?: number
  editable?: boolean
  onKeyPress?: ({
    nativeEvent,
  }: {
    nativeEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  }) => void
  multiline?: boolean
  color?: ColorValue
}

export interface IStyleProps {
  marginHorizontal?: string | number
  marginVertical?: string | number
  paddingHorizontal?: string | number
  paddingVertical?: string | number
  borderBottomWidth?: number
  borderBottomColor?: ColorValue
  borderStyle?: 'solid' | 'dotted' | 'dashed'
  fontSize?: number
  backgroundColor?: ColorValue
  flex?: number
  maxLength?: number
  editable?: boolean
  onKeyPress?: ({
    nativeEvent,
  }: {
    nativeEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  }) => void
  color?: ColorValue
}
