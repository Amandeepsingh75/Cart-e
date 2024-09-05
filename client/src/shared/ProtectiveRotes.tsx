import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectiveRotes = ({Component}: any) => {
    const navigate = useNavigate()
    useEffect(() => {
        const checkUserLogin = localStorage.getItem('accessToken')
        if (!checkUserLogin) {
            navigate('/login')
        }
    }, [])
    return (
        <>
            {Component}
        </>
    )
}

export default ProtectiveRotes