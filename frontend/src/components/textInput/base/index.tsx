import * as React from 'react'
import {memo, forwardRef} from 'react'
import {TextInput} from 'react-native'
import {CustomBaseTextInput} from './styles'
import {IComponentProps} from './types'

function BaseTextInput(
  {
    value,
    onChangeText,
    placeholder,
    placeholderTextColor = '#C4C4C4',
    defaultValue,
    importantForAutofill,
    autoComplete,
    textContentType,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    secureTextEntry,
    marginHorizontal,
    marginVertical,
    paddingHorizontal,
    paddingVertical,
    borderBottomWidth = 2,
    borderBottomColor = '#FFD669',
    borderStyle,
    fontSize,
    backgroundColor,
    flex,
    maxLength,
    editable,
    onKeyPress,
    multiline,
    color = '#000000',
  }: IComponentProps,
  ref?: React.Ref<TextInput | null>,
) {
  return (
    <CustomBaseTextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      defaultValue={defaultValue}
      importantForAutofill={importantForAutofill} // Android
      autoComplete={autoComplete} // Android
      clearButtonMode={'while-editing'} // ios
      textContentType={textContentType} // ios
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      blurOnSubmit={false}
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={secureTextEntry}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      borderBottomWidth={borderBottomWidth}
      borderBottomColor={borderBottomColor}
      borderStyle={borderStyle}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      flex={flex}
      maxLength={maxLength}
      editable={editable}
      onKeyPress={onKeyPress}
      multiline={multiline}
      color={color}
    />
  )
}

export default memo(forwardRef(BaseTextInput))
