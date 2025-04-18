import useAppSidebar from './use-app-sidebar'

export default function Chats() {
  const { isCollapsed } = useAppSidebar()
  return <div className="mt-4 flex flex-col gap-y-4">{`${isCollapsed}`}</div>
}
