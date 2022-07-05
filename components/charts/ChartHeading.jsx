import { Popover, Menu } from "@headlessui/react";
import { InformationCircleIcon, PencilIcon } from '@heroicons/react/outline'
import { useCallback } from "react";

export default function ChartHeading({ chart, showModify, modifyOnHover, infoOnHover }) {
    
    const preventDefault = useCallback((e)=>e.preventDefault(), [])
    
    return (
        <>
            <div className="flex flex-row justify-between p-2">
                <div />
                <div><h2 className='self-center mb-2'>{chart.name}</h2></div>
                <div className="flex flex-row gap-2">
                    { showModify && <a onMouseOver={modifyOnHover} onClick={preventDefault} href=""><PencilIcon className="h-4 w-4 "/></a> }
                    <a onMouseOver={infoOnHover} onClick={preventDefault} href=""><InformationCircleIcon className="h-4 w-4 "/></a>
                </div>
            </div>
        </>
    )
}