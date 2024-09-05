import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
    const [userData, setUserData] = useState({
        productImage: '',
        productName: '',
        Description: '',
        price: ''
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
    const handleAddProduct = async (e: { preventDefault: () => void }) => {
        try {
            e.preventDefault()
            let formData = new FormData()
            formData.append("productImage", userData.productImage);
            formData.append("productName", userData.productName);
            formData.append("description", userData.Description);
            formData.append("price", userData.price);
            let response = await fetch(`${import.meta.env.VITE_ORIGIN}/product/add-product`, {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                setUserData({
                    productImage: '',
                    productName: '',
                    Description: '',
                    price: ''
                })
                toast("Product added Successfully!", { type: 'success' })
                setTimeout(() => {
                    navigate('/')
                }, 3000)

            }
        } catch (error) {
            throw new Error(`Cannot add product ${error}`)
        }
    }

    return (
        <>
            <div className="bg-green-800 content-center h-screen">
                <ToastContainer autoClose={2500} />
                <header className="max-w-lg mx-auto">
                    <h1 className="text-4xl font-bold text-white text-center">Add your Product</h1>
                </header>

                <main className="bg-white max-w-lg mx-auto p-8 md:p-10 my-10 rounded-lg shadow-2xl">
                    <section className="mt-10">
                        <form className="flex flex-col">
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Upload Your Product Image</label>
                                <input type="file" id='productImage' onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Product Name</label>
                                <input type="text" id="productName" value={userData.productName} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">Description</label>
                                <input type="text" id="Description" value={userData.Description} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Price</label>
                                <input type="text" id="price" value={userData.price} onChange={onChangeFunc} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-1" />
                            </div>

                            <button onClick={handleAddProduct} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" >Add Your Product</button>
                        </form>
                    </section>
                </main>
            </div>
        </>
    )
}

export default AddProducts