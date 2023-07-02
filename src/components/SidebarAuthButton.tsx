import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronRight, LogIn } from "react-feather";
import Loading from "./Loading";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const SidebarAuthButton = () => {
    const { data: sessionData, status } = useSession();

    if (status === 'loading') {
        return <div className='flex items-center justify-center py-3'>
            <Loading width={24} height={24} />
        </div>
    }

    if (status === 'unauthenticated') {
        return <div className='py-1 border-t'>
            <Button type="dashed"  onClick={() => void signIn()} title="sign-in button " className='w-full' icon={<LoginOutlined/>}> Login</Button>
        </div>
    }
    return (
        <div className='p-1 border-t z-50'>
            <div className="dropdown dropdown-right dropdown-end w-full ">
                <label tabIndex={0} className="w-full block ">
                    <div className="rounded-lg py-2 px-2 border border-zinc-800 flex items-center gap-2 cursor-pointer group">
                        <span className='rounded-full w-8 h-8 bg-cover bg-center bg-no-repeat ' style={{ backgroundImage: `url(${sessionData?.user.image || ''})` }}></span>
                        <div className='flex-grow'>
                            <p className='text-base capitalize'>{sessionData?.user.name}</p>
                        </div>
                        <span className='group-hover:translate-x-2 transition-all '><ChevronRight /></span>
                    </div>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ">
                    <li onClick={() => void signOut()}><a>Logout</a></li>
                    
                </ul>
            </div>

        </div>
    )
}

export default SidebarAuthButton
