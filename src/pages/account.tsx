import { Layout } from 'antd'
import React from 'react'

const AccountPage = () => {
  return (
    <div>
        <Layout>
            <Layout.Sider>
                <p>Sider</p>
            </Layout.Sider>
            <Layout.Content>
                <p>Content</p>
            </Layout.Content>
        </Layout>
    </div>
  )
}

export default AccountPage