import { signIn, useSession, signOut } from "next-auth/react";
import Loading from "../Loading";
import { ChevronRight, LogIn } from "react-feather";
import { DashboardOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown,Button } from 'antd';
import { type PropsWithChildren } from "react";
import Link from "next/link";




const DropdownMenu = ({ children, items }: PropsWithChildren<{items: MenuProps['items']}>) => {
    return (
        <Dropdown menu={{ items }} trigger={['click']} placement="topRight" >
            {children}
        </Dropdown>
    )
}

const SidebarAuthMenu = () => {
    const { data: sessionData, status } = useSession();

    const items: MenuProps['items'] = [
        {
            label: <Link href={'/admin'}><DashboardOutlined/> <span>Admin</span></Link>,
            key: '1',
        },
        {
            label: <Link href={'/account'}><SettingOutlined/> <span>Account/settings</span></Link>,
            key: '2',
        },
        {
            label: <span onClick={() => void signOut()}><LogoutOutlined/> <span>Logout</span></span>,
            key: '0',
        },
    ];

    if (status === 'loading') {
        return <div className='flex items-center justify-center py-3'>
            <Loading width={24} height={24} />
        </div>
    }

    if (status === 'unauthenticated') {
        return <div className='py-1 border-t flex justify-center'>
            <Button type="dashed" onClick={() => void signIn()} title="sign-in button" className='' >Login</Button>
        </div>
    }
    return (
        <div className='p-1 border-t z-50'>
            <div className="dropdown dropdown-right dropdown-end w-full ">
                <DropdownMenu items={items}>
                    <label className="w-full block">
                        <div className="rounded-lg py-2 px-2 border border-zinc-800 flex items-center gap-2 cursor-pointer group">
                            <span className='rounded-full w-8 h-8 bg-cover bg-center bg-no-repeat ' style={{ backgroundImage: `url(${sessionData?.user.image || ''})` }}></span>
                            <div className='flex-grow'>
                                <p className='text-base capitalize'>{sessionData?.user.name}</p>
                            </div>
                            <span className='group-hover:translate-x-2 transition-all '><ChevronRight /></span>
                        </div>
                    </label>
                </DropdownMenu>

            </div>

        </div>
    )
}

export default SidebarAuthMenu;