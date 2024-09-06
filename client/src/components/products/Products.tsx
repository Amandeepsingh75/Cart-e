import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import Searchbar from "../../shared/Searchbar"
import Cart from "../Cart/Cart"
import Skeleton from "../../shared/Skeleton"



const Products = () => {
    const [products, setProducts] = useState<any>()
    const [searchValue, setSearchValue] = useState('')
    const [cartProducts, setCartProducts] = useState<any>([])
    const [open, setOpen] = useState(false)

// fetch productsData from api
    const fetchProducts = async () => {
        await fetch(`${import.meta.env.VITE_ORIGIN}/product/get-products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }
    useEffect(() => {
        fetchProducts()
    }, [])

// add in cart function
    const handleAddtoCart = (items: any, quantity: number) => {
        const sameProduct = cartProducts?.find((prod: { items: { _id: string } }) => items?._id === prod?.items._id)
        if (sameProduct) {
            sameProduct.quantity = quantity
        } else {
                setCartProducts([...cartProducts, { items, quantity }])
        }
    }
    
    // filter for searching
    let filterSearchPrducts = products?.filter((data: { productName: string }) => {
        return searchValue == '' ? data : data.productName.toLowerCase().includes(searchValue.toLowerCase())
    })
    
    return (
        <>
            <Searchbar setSearchValue={setSearchValue} />
            <div className="flex items-center justify-between mx-8 my-6">
                <h1 className="font-bold text-4xl">Shopping Products</h1>
                <div onClick={() => setOpen(true)}>
                    <svg className="h-8 cursor-pointer" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 902.86 902.86" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path> <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path> </g> </g> </g></svg>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6 gap-2 mx-12">
                {filterSearchPrducts?.length <= 0 && <h2>No item Found</h2>}
                {products?.length > 0 ?
                    filterSearchPrducts?.map((item: { productName: string; productImage: string; description: string; price: number, user: string }, i: number) => (
                        <ProductCard key={i}
                            productName={item?.productName}
                            productImage={item?.productImage}
                            description={item?.description}
                            price={item?.price}
                            quantity={1}
                            uploadedBy={item.user}
                            handleAddtoCart={(_a, _b, _c, quantity) => handleAddtoCart(item, quantity)}
                        />))
                    : [1, 2, 3].map((_, i) => {
                        return <Skeleton key={i} />
                    })}

            </div>
            <Cart cartProducts={cartProducts} open={open} setOpen={setOpen} />
        </>
    )
}

export default Products