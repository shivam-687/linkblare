import React, { PropsWithChildren, useState } from 'react';
import {
    CompassOutlined, FileFilled, GithubFilled, MenuOutlined, SearchOutlined,
} from '@ant-design/icons';
import { Button, Divider, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Logo from '~/components/Logo';
import SidebarAuthButton from '~/components/SidebarAuthButton';
import SidebarAuthMenu from '~/components/ui/SidebarAuthMenu';
import SidebarSavedCollectionList from '~/components/collection/SidebarSavedCollectionList';
import { api } from '~/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchInput from '~/components/search/SearchInput';
import AppSidebar from './AppSidebar';
import { useAtom } from 'jotai';
import { AppSidebarAtom } from '~/lib/atoms/AppSidebarAtom';

const { Header, Content, Footer, Sider } = Layout;




const App = ({ children }: PropsWithChildren) => {
    const [isSidebarOpen, setIsSidebarOpen] = useAtom(AppSidebarAtom);
    const {
        token: { colorBgContainer, colorTextBase },
    } = theme.useToken();
    const router = useRouter()

    return (
        <Layout style={{ height: '100vh', color: colorTextBase }} >
            <AppSidebar/>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className='hidden md:block'><SearchInput/></div>

                    <div className='flex justify-between items-center w-full h-full p-2 md:hidden'>
                        <div className='w-max'><Button  icon={<MenuOutlined/>} onClick={() => setIsSidebarOpen(true)} /></div>

                        <div className='flex w-full items-center justify-center'><Logo /></div>

                        <div className='w-max'><Button icon={<SearchOutlined/>}/></div>
                    </div>

                </Header>
                <Content className='p-6 overflow-auto' >
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <div className="flex items-center justify-center ">
                       <a href="https://github.com/shivam-687/linkblare"> <Button type='ghost' icon={<GithubFilled/>}>LinkBlare Shivam Singh</Button></a>
                        {/* <span>Shivam Singh</span> */}
                    </div>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;