import { useEffect, useState } from "react"

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState<any>()

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_ORIGIN}/profile/get-user`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            setUserDetails(data?.userData)
        } catch (error) {
            throw new Error(`Cannot find user ${error}`)
        }
    }
    useEffect(() => {
        fetchUserDetails()
    }, [])
  return (
      <div className="flex flex-col items-center h-screen py-8 text-white bg-slate-700">
          <div className="text-5xl capitalize font-bold my-6">{userDetails?.username}'s profile</div>
          <img src={userDetails?.avatar} className="h-80 w-50" />
          <div className="text-center my-4">
          <div className="font-semibold text-lg capitalize">Username: {userDetails?.username}</div>
          <div className="font-semibold text-md">Email: {userDetails?.email}</div>
          </div>
      </div>
  )
}

export default UserProfile