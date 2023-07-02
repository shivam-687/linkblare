import React, { PropsWithChildren, useEffect, useState } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import FullscreenLoader from '../components/FullscreenLoader';
import { Layout, Menu, theme } from 'antd';
import Logo from '~/components/Logo';
import { FolderOpenOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;


const AdminLayout = ({ children }: PropsWithChildren) => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, colorTextBase },
    } = theme.useToken();


    useEffect(() => {
        console.log(sessionData);
        if (status === 'unauthenticated') {
            void router.push('/')
        }

        // if (sessionData && status !== 'authenticated') {
        //     void router.push('/')
        // }
    }, [sessionData])

    if (status === 'loading' || status === 'unauthenticated') {

        return <FullscreenLoader />
    }

    return (
        <Layout style={{ minHeight: '100vh', color: colorTextBase}} >
            <Sider className='' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{backgroundColor: colorBgContainer}}>
                <div className='flex w-full items-center justify-center py-2 mb-5'><Logo/></div>
                <Menu  defaultSelectedKeys={['/collection']} mode="inline" items={[
                    {
                        label: 'Collection',
                        key: '/collection',
                        onClick(){
                            void router.push('/admin/collection')
                        },
                        icon: <FolderOpenOutlined/>
                    }
                ]} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                   {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
