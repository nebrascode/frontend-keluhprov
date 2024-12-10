import DataTable from "../../components/Schedule/DataTable";
import HeaderLayout from "../../components/Header/HeaderLayout";
import SidebarLayout from "../../components/Header/SidebarLayout";

const Schedule = () => {
    return (
        <>
            <section className="flex flex-col w-full bg-light-3 h-svh">
                <SidebarLayout />
                <HeaderLayout />
                <div className="lg:ml-72 overflow-y-auto">
                    <div className="px-8">
                        <div className="pt-9 font-poppins text-3xl font-bold">
                            Jadwal
                        </div>
                    </div>
                    <DataTable />
                </div>
            </section>
        </>
    )
}

export default Schedule;