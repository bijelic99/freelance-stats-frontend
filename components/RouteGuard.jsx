import { TokenContext } from '../contexts/tokenContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo } from 'react';

export default function RouteGuard({children}) {
    const router = useRouter()
    const {token} = useContext(TokenContext)
    const currentPage = useMemo(() => router.asPath, [])
    useEffect(() => {
        if (currentPage && token && ["register", "login"].find(x => currentPage?.endsWith(x))) {
            router.push("/")
        }
        else if (currentPage && !token && !(["register", "login"].find(x => currentPage?.endsWith(x)))) {
            router.push("/login")
        }
    }, [token, currentPage])
    return <>
    {
        children
    }
    </>
}