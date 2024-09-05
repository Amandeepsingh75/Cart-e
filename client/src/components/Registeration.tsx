import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';



const Register = () => {
    const [userData, setUserData] = useState({
        avatar: '',
        username: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const onChangeFunc = (e: any) => {
        const type = e.target.type
        const value = type == 'file' ? e.target.files[0] : e.target.value
        const id = e.target.id
        setUserData({
            ...userData,
            [id]: value
        })
    }
    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("avatar", userData.avatar);
        formData.append("username", userData.username);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        const response = await fetch(`${import.meta.env.VITE_ORIGIN}/profile/register`, {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            setUserData({ username: '', email: '', password: '', avatar: '' })
            // toast("User Registered Successfully!", { type: 'success' })

            setTimeout(() => {
                navigate('/login')
            }, 300)
        }
    }

    return (
        <div className="bg content-center h-full">
            {/* <ToastContainer autoClose={2000}/> */}
            <header className="max-w-lg mx-auto">
                <h1 className="text-4xl font-bold text-white text-center">Regiteration Form</h1>
            </header>

            <main className="bg-white max-w-lg mx-4 md:mx-auto p-8 md:p-12 my-6 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">Welcome to ...</h3>
                    <p className="text-gray-600 pt-2">Sign up to your account.</p>
                </section>

                <section className="mt-10">
                    <form className="flex flex-col">
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Upload profile pic</label>
                            <input type="file" id='avatar' onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Username</label>
                            <input type="text" id="username" value={userData.username} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email</label>
                            <input type="text" id="email" value={userData.email} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                            <input type="password" id="password" value={userData.password} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <button onClick={handleClick} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" >Sign Up</button>
                    </form>
                </section>
            </main>

            <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                <p className="text-white">have an account? <a href="/login" className="font-bold hover:underline">Sign in</a>.</p>
            </div>
        </div>
    )
}

export default Register