import { useEffect, useState } from "react"

function Navbar() {
  const [userDetails, setUserDetails] = useState<any>()

  //get login user
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ORIGIN}/profile/get-user`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json()
      setUserDetails(data)
    } catch (error) {
      throw new Error(`Cannot find user ${error}`)
    }
  }

  // User logout function
  const handleLogOut = async () => {
    if (!userDetails) return 'User is alerady logout'
    await fetch(`${import.meta.env.VITE_ORIGIN}/profile/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUserDetails(data))
    localStorage.removeItem('accessToken')
  }
  useEffect(() => {
    fetchUserDetails()
  }, [])
  
  return (
    <>
      <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900 dark:border-gray-700 ">
        <div className="max-w-screen-xl flex  items-center justify-between mx-auto  p-2 md:p-4">
          <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="font-semibold md:text-lg text-sm uppercase">cart-e</div>
          </a>

          <div className="" id="navbar-dropdown">
            <ul className="flex items-center gap-2 font-medium p-4 md:p-0  md:space-x-4 md:flex-row md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 ">
              {userDetails?.userData ? <a href={`/profile/${userDetails?.userData?.username}`}> <img src={userDetails?.userData?.avatar} className="h-9 md:h-10  md:block" alt={userDetails?.userData?.username} /> </a> : <img src={'./user.png'} className="h-5 md:h-10 hidden md:block" alt={userDetails?.userData?.username} />}
              <li className={` ${userDetails?.userData ? 'bg-slate-600' : 'bg-rose-600 border-red-400'} border py-2 px-3 rounded-md `}>
                {userDetails?.userData ? <button onClick={handleLogOut} className="block font-semibold rounded text-sm md:text-lg text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button> :
                  <a href="/login" className="block font-semibold rounded text-sm md:text-lg text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar