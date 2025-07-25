import TodaySales from '@/componets/dashboard/TodaySales'
import TopApprovers from '@/componets/dashboard/TopApprovers'
import TotalRevenue from '@/componets/dashboard/TotalRevenue'

export default function page() {
    return (
        <>
            <TodaySales />
            <TotalRevenue />
            <TopApprovers />
        </>
    )
}
