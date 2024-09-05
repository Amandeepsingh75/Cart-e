import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';


function Login() {
    const navigate = useNavigate()
    const [loginUserData, setLoginUserData] = useState({
        usernameOrEmail: '',
        password: ''
    })
    const [error, setError] = useState(false)

    const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const id = e.target.id
        setLoginUserData({
            ...loginUserData,
            [id]: value
        })
    }
    const handleLogin = async (e: { preventDefault: () => void }) => {
        try {
            e.preventDefault()
            const { usernameOrEmail, password } = loginUserData;
            let loginInput;
            { usernameOrEmail.includes('@') ? loginInput = { email: usernameOrEmail, password } : loginInput = { username: usernameOrEmail, password } }
            const response = await fetch(`${import.meta.env.VITE_ORIGIN}/profile/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInput)
            })
            if (response.ok) {
                // toast("Login Successfully!", { type: 'success' })
                localStorage.setItem('accessToken', (document?.cookie.split('=')[1]))
                setTimeout(() => {
                    navigate('/')
                }, 500)
            } else {
                setError(true)
            }
            // const data = await response.json()
        } catch (error) {
            throw new Error(error as string)
        }


    }
    return (
        <div className="bg content-center h-screen">
            {/* <ToastContainer /> */}

            <header className="max-w-lg mx-auto">
                <h1 className="text-4xl font-bold text-white text-center">Login Form</h1>
            </header>
            <main className="bg-white max-w-lg mx-4 md:mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">Welcome to ...</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>
                <section className="mt-10">
                    <form className="flex flex-col">
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Email or Username</label>
                            <input type="text" id={'usernameOrEmail'} value={loginUserData.usernameOrEmail} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                            <input type="password" id="password" value={loginUserData.password} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div>
                        {error && <div className="text-red-500 font-semibold text-sm">User not found . Sign up first</div>}
                        <button onClick={handleLogin} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" >Sign In</button>
                    </form>
                </section>
            </main>

            <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                <p className="text-white">Don't have an account? <a href="/register" className="font-bold hover:underline">Sign up</a>.</p>
            </div>
        </div>
    )
}

export default Login