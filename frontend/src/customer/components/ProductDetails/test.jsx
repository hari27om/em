import { useEffect, useState } from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";
// import { store } from './../../../State/store';

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "$192",
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Men", href: "#" },
//     { id: 2, name: "Clothing", href: "#" },
//   ],
//   images: [
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//       alt: "Model wearing plain black basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//       alt: "Model wearing plain gray basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//       alt: "Model wearing plain white basic tee.",
//     },
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "2XL", inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton",
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };
// const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  // const { products } = useSelector(store => store)
  const { products } = useSelector((store) => store);
  console.log("----", params.productId);

  const handelAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize.name };
    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId]);

  return (
    <div className="bg-white">
      <div className="pt-6">

        {/* image and size */}
        <div className="mt-[100px] grid gap-4 sm:grid-cols-12 container mx-auto  w-full md:w-1/3 px-3 md:mb-0">
          <div className="min-h-[100px]  sm:col-span-8  ">
            {/* Image gallery */}
            <div className="flex flex-col items-center ">
              <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                <img
                  src={products.product?.imageUrl}
                  alt={products.product?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="min-h-[100px] sm:col-span-4 border border-gray-200 p-[20px] rounded">
            <div>
              <h1 className="text-2xl font-bold font-abc tracking-tight text-gray-900 sm:text-3xl">
                {products.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl font-abc  text-gray-900 opacity-60 pt-1">
                {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0 ">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-gray-900 pt-6">
                <p className="  text-sm font-abc">
                  {"₹" + products.product?.discountedPrice}
                </p>
                <p className="font-abc line-through text-sm">
                  {"₹" + products.product?.price}
                </p>
                <p className="text-red-500 text-sm font-abc">
                  {(
                    (1 -
                      products.product?.discountedPrice /
                        products?.product?.price) *
                    100
                  ).toFixed(0) + "% off"}
                </p>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="tracking-widest font-semibold text-base text-center">
                      Size
                    </h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {products.product?.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  onClick={handelAddToCart}
                  type="submit"
                  className="w-full mt-[50px] text-white hover:bg-gray-800 bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* discription */}
        <div className="container mx-auto  w-full md:w-1/3 px-3 md:mb-0 py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div className="mt-[50px]">
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6 font-abc text-lg">
              <p>{products.product?.description}</p>
              {/* <p className="text-base text-gray-900">{product.description}</p> */}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900 font-abc ">
              Highlights
            </h3>

            <div className="mt-4">
              <ul
                role="list"
                className="list-disc space-y-2 pl-4 text-base font-abc"
              >
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="text-gray-400">
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-medium text-gray-900 font-abc">
              Details
            </h2>

            <div className="mt-4 space-y-6">
              <p className="text-base font-abc text-gray-600">
                {product.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
