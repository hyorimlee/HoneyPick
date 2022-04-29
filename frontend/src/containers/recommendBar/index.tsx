import * as React from 'react'
import {memo} from 'react'
import {View} from 'react-native'
import GaugeBar from '../../components/gaugeBar'

function RecommendBar() {
  return (
    <View>
      <GaugeBar emoji='🎁' text='선물하기 좋아요' votes={222}></GaugeBar>
      <GaugeBar emoji='👔' text='재질이 부드러워요' votes={13}></GaugeBar>
      <GaugeBar emoji='⛏' text='내구성이 좋아요' votes={5}></GaugeBar>
    </View>
  )
}

export default memo(RecommendBar)