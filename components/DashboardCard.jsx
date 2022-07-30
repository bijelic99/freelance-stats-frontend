import Link from "next/link";
import { useMemo } from "react";

export default function DashboardCard({ dashboardMetadata }) {



    (<div className="flex flex-col items-start w-full border border-black rounded-md shadow-md py-2 px-4">
        <div><h2 className="font-bold"><Link href={`/dashboard/${dashboardMetadata.id}`}>{dashboardMetadata.name}</Link></h2></div>
        <div className="flex gap-2 justify-between w-full"><span>Created by:</span> <Link href={`/dashboard/${dashboardMetadata.ownerId}`}>{dashboardMetadata.ownerUsername}</Link></div>
        {
            dashboardMetadata?.chartSources && <div className="flex gap-2 justify-between w-full"><span>Sources:</span><span className="truncate">{dashboardMetadata.chartSources.join(',')}</span></div>
        }
        {
            dashboardMetadata?.chartNames && <div className="flex gap-2 justify-between w-full"><span>Charts:</span><span className="truncate">{dashboardMetadata.chartNames.join(',')}</span></div>
        }
        <div className="flex gap-2 justify-between w-full"><span>Created at:</span><span>{dashboardMetadata.createdAt}</span></div>
        <div className="flex gap-2 justify-between w-full"><span>Modified at:</span><span>{dashboardMetadata.modifiedAt}</span></div>
        {
            dashboardMetadata.public && <span className="italic">Public chart</span>
        }
    </div>)

    return (
        <div className="w-full border border-black rounded-md shadow-md py-2 px-4 flex flex-col gap-1">
            <h2 className="font-bold text-xl"><Link href={`/dashboard/${dashboardMetadata.id}`}>{dashboardMetadata.name}</Link></h2>
            <div className="w-full h-0 border rounded-md shadow-md"></div>
            <div className="w-full grid grid-cols-2 gap-1">
                <span>Created by:</span> <Link href={`/user/${dashboardMetadata.ownerId}`}>{dashboardMetadata.ownerUsername}</Link>
                {
                    dashboardMetadata.chartSources.length !== 0 && <><span>Sources:</span><span className="truncate">{dashboardMetadata.chartSources.join(',')}</span></>
                }
                {
                    dashboardMetadata.chartNames.length !== 0 && <><span>Charts:</span><span className="truncate">{dashboardMetadata.chartNames.join(',')}</span></>
                }
                <span>Created at:</span><span>{dashboardMetadata.createdAt}</span>
                <span>Modified at:</span><span>{dashboardMetadata.modifiedAt}</span>
                <span>Chart type:</span><span>{dashboardMetadata.public ? 'Public' : 'Private'}</span>
            </div>
        </div>
    )
}