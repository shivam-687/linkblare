import { Divider, Drawer, Menu, MenuProps, theme } from 'antd';
import { useAtom } from 'jotai'
import React from 'react'
import { AppSidebarAtom } from '~/lib/atoms/AppSidebarAtom'
import { Layout } from 'antd'
import { useRouter } from 'next/router';
import Logo from '~/components/Logo';
import SidebarSavedCollectionList from '~/components/collection/SidebarSavedCollectionList';
import SidebarAuthMenu from '~/components/ui/SidebarAuthMenu';
import Link from 'next/link';
import { CompassOutlined, FileFilled } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link href={'/'}>Explore</Link>, '/', <CompassOutlined />),
    getItem(<Link href={'/savedCollections'}>Saved Collections</Link>, '/savedCollections', <FileFilled />),
];



const AppSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useAtom(AppSidebarAtom);
    const router = useRouter()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const SidebarContent = () => {
        return (
            <>
                <Menu theme="dark" selectedKeys={[String(router.pathname)]} defaultSelectedKeys={['/']} mode="inline" items={items} />
                <Divider>Saved Collections</Divider>
                <div className='h-full w-full overflow-auto pb-36'>
                    <SidebarSavedCollectionList />
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-2">
                    <SidebarAuthMenu />
                </div>
            </>
        )
    }
    return (
        <>
            <Layout.Sider style={{ backgroundColor: colorBgContainer }} className='relative pb-20 overflow-hidden hidden md:block'>
                <div className='flex w-full items-center justify-center py-2 '><Logo /></div>
                <SidebarContent/>
            </Layout.Sider>

            <Drawer open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
                <SidebarContent/>
            </Drawer>
        </>
    )
}

export default AppSidebar