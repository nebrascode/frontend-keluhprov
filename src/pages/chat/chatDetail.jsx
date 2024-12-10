import HeaderLayout from "../../components/Header/HeaderLayout"
import SidebarLayout from "../../components/Header/SidebarLayout"
import ChatDetail from '../../components/chat/chatDetail'

export default function ChatDetailPage() {
    return (
        <>
            <div className="flex flex-col w-full">
                <HeaderLayout />
                <SidebarLayout />
            </div>

            <div className="lg:ml-72 min-h-[80dvh] overflow-y-auto">
                <div className="bg-light-2 px-8">
                    <div className="pt-9 font-poppins text-black text-4xl font-medium">
                        Kelola Chat
                    </div>
                    <div className="container mt-9 w-full justify-between rounded-lg min-h-[80vh]">
                        <ChatDetail />
                    </div>
                </div>

            </div>
        </>
    )
}