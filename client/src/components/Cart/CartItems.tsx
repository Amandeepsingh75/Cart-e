
const CartItems = ({cartProducts}:{cartProducts: any}) => {
  return (
      <>
          {cartProducts?.map((product: { items: { price:  number , productImage: string | undefined; productName: string |undefined }; quantity: number }, i:number) => {
                                                        const productTotal = product?.items?.price * product?.quantity
                                                        return (product?.quantity > 0 && <li key={i} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    alt={product?.items?.productImage}
                                                                    src={product?.items?.productImage}
                                                                    className="h-full w-full object-contain object-center"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href={'#'}>{product?.items?.productName}</a>
                                                                        </h3>
                                                                        <p className="ml-4">₹ {productTotal}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="ml-4">₹ {product?.items?.price} * {product?.quantity}</p>

                                                                    <p className="text-gray-500">Qty {product?.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        )
                                                    })}
      </>
  )
}

export default CartItems