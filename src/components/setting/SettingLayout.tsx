
import { Divider } from "antd"
import SettingSidebarNav  from "./SettingsSidebarNav"


const sidebarNavItems = [
  {
    lable: "Account",
    href: "/setting",
  },
  {
    lable: "Preference",
    href: "/setting/prefrence",
  },
//   {
//     title: "Appearance",
//     href: "/examples/forms/appearance",
//   },
//   {
//     title: "Notifications",
//     href: "/examples/forms/notifications",
//   },
//   {
//     title: "Display",
//     href: "/examples/forms/display",
//   },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your site settings
          </p>
        </div>
        <Divider className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingSidebarNav items={sidebarNavItems} />
          </aside>
          <Divider type='vertical' />
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}