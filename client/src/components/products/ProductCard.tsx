import { useState } from "react"


interface ProductCardProps {
    productName: string
    productImage: string
    description: string
    uploadedBy: string
    price: number
    quantity: number
    handleAddtoCart: (...arg: any) => void
}
const ProductCard: React.FC<ProductCardProps> = ({ productName, productImage, description, price, quantity, handleAddtoCart }) => {
    const [showQuantity, setShowQuantity] = useState(false)
    const [currentQuantity, setCurrentQuantity] = useState(quantity)

    // increment logic
    const incrementQuantity = () => {
        setCurrentQuantity((currentQuantity + 1))
        handleAddtoCart(productName, productImage, price, currentQuantity + 1)
    }

    // decrement logic 
    const decrementQuantity = () => {
        if (currentQuantity > 1) {
            handleAddtoCart(productName, productImage, price, currentQuantity - 1);
            return setCurrentQuantity(currentQuantity - 1)
        }
        setShowQuantity(false)
        handleAddtoCart(productName, productImage, price, 0);
    }
    return (
        <>
            {/*  product card  */}
            <article className="border border-[#f7f2f2]max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 my-2 md:my-0">
                <div>
                    <img className="object-contain h-64 w-full" src={productImage} alt={productName} />
                </div>

                <div className="flex flex-col gap-1 mt-4 px-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">{productName}</h2>
                    <span className="font-normal text-gray-600 dark:text-gray-300">{description.slice(0, 58)}...</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-50">₹{price}</span>
                </div>


                <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-800 dark:text-white">₹{price}</span>
                        {!showQuantity ? <div onClick={() => { setShowQuantity(true), handleAddtoCart(productName, productImage, price, currentQuantity) }} className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap dark:focus:ring-blue-800">Add to cart</div>
                            : (<div className="flex gap-2 items-center">
                                <div onClick={decrementQuantity} className="bg-blue-700 cursor-pointer px-1 text-white font-bold text-xl">-</div>
                                <div>{currentQuantity}</div>
                                <div onClick={incrementQuantity} className="bg-blue-700 px-1 cursor-pointer text-white font-bold text-xl">+</div>
                            </div>)}</div>
                </div>
            </article>
        </>
    )
}

export default ProductCard