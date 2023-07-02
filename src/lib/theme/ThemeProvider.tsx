import { App, ConfigProvider, theme } from 'antd'
import React, { PropsWithChildren } from 'react'
import TailwindThemeIntializer from './TailwindThemeProvider'

const ThemeProvider = ({children}: PropsWithChildren) => {
  return (
    <App>
      <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
        colorBgBase: '#fff',
        colorTextBase: '#000005',
        colorBgContainer: '#fefefe',
      },
      algorithm: theme.darkAlgorithm
    }}
  >
    <TailwindThemeIntializer/>
    {children}
   
  </ConfigProvider>
    </App>
  )
}

export default ThemeProvider