import React from 'react'
import SettingsLayout from '~/components/setting/SettingLayout'
import TagSelector from '~/components/tags/TagSelector'

const PreferencePage = () => {
  return (
    <SettingsLayout>
        <TagSelector/>
    </SettingsLayout>
  )
}

export default PreferencePage