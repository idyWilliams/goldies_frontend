"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import CreateProductLayout from "@/components/admin-component/create-product/CreateProductLayout";
import AnimatedMulti from "@/components/admin-component/CustomSelect";
import { MultiValue } from "react-select";
// import { useSearchParams } from "next/navigation";
// import { productList } from "@/utils/adminData";

const fillingsList = [
  {
    label: "Chocolate",
    value: "chocolate",
  },
  {
    label: "Vanilla",
    disabled: true,
    value: "vanilla",
  },
  {
    label: "Strawberry",
    value: "strawberry",
  },
  {
    label: "Lemon",
    value: "lemon",
  },
  {
    label: "Raspberry",
    value: "raspberry",
  },
  {
    label: "Caramel",
    value: "caramel",
  },
  {
    label: "Coffee",
    value: "coffee",
  },
  {
    label: "Peanut Butter",
    value: "peanut-butter",
  },
  {
    label: "Coconut",
    value: "coconut",
  },
  {
    label: "Mint",
    value: "mint",
  },
  {
    label: "Blueberry",
    value: "blueberry",
  },
  {
    label: "Cherry",
    value: "cherry",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Hazelnut",
    value: "hazelnut",
  },
  {
    label: "Almond",
    value: "almond",
  },
];
const cakeShapes = [
  {
    label: "Round",
    value: "round",
  },
  {
    label: "Rectangular",
    value: "rectangular",
  },
  {
    label: "Square",
    value: "square",
  },
  {
    label: "Heart",
    value: "heart",
  },
  {
    label: "Star",
    value: "star",
  },
  {
    label: "Oval",
    value: "oval",
  },
  {
    label: "Petal",
    value: "petal",
  },
  {
    label: "Unicorn",
    value: "unicorn",
  },
  {
    label: "Tiered",
    value: "tiered",
  },
  {
    label: "Sheet",
    value: "sheet",
  },
];
const toppings = [
  {
    label: "Fresh Fruit",
    value: "fresh_fruit",
  },
  {
    label: "Chocolate Ganache",
    value: "chocolate_ganache",
  },
  {
    label: "Whipped Cream",
    value: "whipped_cream",
  },
  {
    label: "Toasted Nuts",
    value: "toasted_nuts",
  },
  {
    label: "Caramel Sauce",
    value: "caramel_sauce",
  },
];
const cakeSizes = [
  {
    label: "Mini",
    value: "mini",
  },
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Large",
    value: "large",
  },
  {
    label: "Extra Large",
    value: "extra_large",
  },
];

const milestoneSub = [
  { label: "Birthday Cakes", value: "birthday_cakes" },
  { label: "Anniversary Cakes", value: "anniversary_cakes" },
  { label: "Graduation Cakes", value: "graduation_cakes" },
  { label: "Baby Shower Cakes", value: "baby_shower_cakes" },
  { label: "Retirement Cakes", value: "retirement_cakes" },
];
const kidsCakeSub = [
  { label: "Cartoon Character Cakes", value: "cartoon_character_cakes" },
  { label: "Princess Cakes", value: "princess_cakes" },
  { label: "Superhero Cakes", value: "superhero_cakes" },
  { label: "Animal Cakes", value: "animal_cakes" },
  { label: "Fantasy Cakes", value: "fantasy_cakes" },
];
const cupCakeSub = [
  { label: "Classic Cupcakes", value: "classic_cupcakes" },
  { label: "Gourmet Cupcakes", value: "gourmet_cupcakes" },
  { label: "Vegan Cupcakes", value: "vegan_cupcakes" },
  { label: "Gluten-Free Cupcakes", value: "gluten_free_cupcakes" },
  { label: "Seasonal Cupcakes", value: "seasonal_cupcakes" },
];
const weddingCakeSub = [
  {
    label: "Traditional Wedding Cakes",
    value: "traditional_wedding_cakes",
  },
  { label: "Modern Wedding Cakes", value: "modern_wedding_cakes" },
  { label: "Floral Wedding Cakes", value: "floral_wedding_cakes" },
  { label: "Rustic Wedding Cakes", value: "rustic_wedding_cakes" },
  { label: "Themed Wedding Cakes", value: "themed_wedding_cakes" },
];

const options = [
  { label: "Milestone Cakes", value: "milestone cakes", disabled: false },
  { label: "Kids' Cakes", value: "kids cakes" },
  { label: "Cupcakes", value: "cupcakes", disabled: false },
  { label: "Wedding Cakes", value: "wedding cakes" },
];

export type SelectOptionType = {
  label: string | number;
  value: string | number;
  description?: string;
} | null;

export default function Page() {
  const [category, setCategory] = useState<any>();
  const [subCategory, setSubCategory] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [addOn, setAddOn] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<any>>();
  // const searchParams = useSearchParams();
  // const search = searchParams.get("edit");
  // console.log(search, "search");
  const [product, setProduct] = useState<any>();
  // useEffect(() => {
  //   const [filter] = productList.filter(
  //     (product: any) => String(product.id) === search,
  //   );
  //   setProduct(filter);
  //   // console.log(filter, "filter");
  // }, [search]);

  const [images, setImages] = useState<any>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const handleRemove = (imgNo: number) => {
    setImages((img: any) => {
      return { ...img, [`image${imgNo}`]: "" };
    });
    // setImage1(null);
    // console.log("hello");
  };

  const handleOptionsChange = (newOptions: MultiValue<any>) => {
    setSelectedOptions(newOptions);
  };

  const handleChange = (e: any) => {
    const file = e.target.files && e.target.files[0];
    const name = e.target.name;
    // setImage1
    if (file) {
      const url = URL.createObjectURL(file);
      setImages((img: any) => {
        return {
          ...img,
          [name]: url,
        };
      });
      console.log(url, "url");
    }
    console.log(file, e.target.name);
  };
  let sub;
  switch (category && category) {
    case "milestone cakes":
      sub = (
        // <MultiSelect
        //   disabled={category == null}
        //   options={milestoneSub}
        //   value={subCategory}
        //   onChange={setSubCategory}
        //   labelledBy="Select subcategory"
        // />

        <AnimatedMulti options={milestoneSub} onChange={handleOptionsChange} />
      );
      break;

    case "kids cakes":
      sub = (
        <MultiSelect
          disabled={category == null}
          options={kidsCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;
    case "cupcakes":
      sub = (
        <MultiSelect
          disabled={category == null}
          options={cupCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;
    case "wedding cakes":
      sub = (
        <MultiSelect
          disabled={category == null}
          options={weddingCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;

    default:
      sub = (
        <MultiSelect
          disabled={true}
          options={weddingCakeSub}
          value={subCategory}
          onChange={setSubCategory}
          labelledBy="Select subcategory"
        />
      );
      break;
  }
  const createProduct = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      productName: formData.get("productName"),
      description: formData.get("productDescription"),
      variants: [
        { shapes: shapes },
        { fillings: fillings },
        { sizes: sizes },
        { toppings: toppings },
      ],
      category: {
        name: category,
        subCategory: subCategory,
      },
      pricing: {
        priceFrom: Number(formData.get("priceFrom")),
        priceTo: Number(formData.get("priceTo")),
      },
    };
    // data.append("productName", productName);

    // Now you can log the FormData and productName
    console.log(data, "productName");
  };
  // useEffect(() => {
  //   if (search !== null && search) {
  //     // setCategory(product?.category);
  //     // setSubCategory(product?.subcategories);
  //   }
  // }, []);
  return (
    <section className="p-6">
      <div className="hidden md:block">
        <form onSubmit={createProduct}>
          <div className="flex items-center justify-between">
            <h1 className="font-bold">Create New Products</h1>
            <button
              className="rounded-md bg-black px-10 py-2 text-[12px] text-goldie-300"
              type="submit"
            >
              Save Changes
            </button>
          </div>
          <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="">
              <h2 className="mb-3 font-bold">Product Information</h2>
              <div className="h-full rounded-md border border-neutral-300 p-4">
                <label htmlFor="productName" className="">
                  <span className="mb-1 block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Name
                  </span>
                  <input
                    name="productName"
                    type="text"
                    autoComplete="off"
                    id="productName"
                    placeholder="Product name"
                    className="mb-4 w-full rounded-sm border-none bg-gray-100 placeholder:text-sm"
                  />
                </label>
                <label htmlFor="productDescription" className="">
                  <span className="mb-1 block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Description
                  </span>
                  <textarea
                    name="productDescription"
                    autoComplete="off"
                    id="productDescription"
                    placeholder="Product Description"
                    className="h-[110px] w-full resize-none rounded-sm border-none bg-gray-100 placeholder:text-sm"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-3 w-full">
                    <h2 className="mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                      Category
                    </h2>

                    {/* <CustomSelect
                    selectedOption={category}
                    setSelectOption={setCategory}
                    options={options || []}
                  /> */}

                    <select
                      id="category"
                      name="category"
                      className="form-select w-full rounded-md border-neutral-300 text-neutral-400"
                      onChange={(e: any) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option
                        className=""
                        value={"select_category"}
                        // disabled
                        // selected
                      >
                        Select category
                      </option>
                      {options.map((option: any, index: number) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 w-full">
                    <h2 className="mb-1 after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                      Subcategory
                    </h2>
                    {sub}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-10 xl:mt-0">
              <h1 className="mb-3 font-bold after:text-xl after:text-[#E10] after:content-['*']">
                Product Images
              </h1>
              <div className="grid grid-cols-4 grid-rows-[180px] gap-4 rounded-md border border-neutral-300 p-4 xl:h-full xl:grid-cols-2">
                <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
                  {!images.image1 && (
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
                      Drop files here or
                      <label
                        htmlFor="image1"
                        className="cursor-pointer italic underline"
                      >
                        click here
                      </label>
                      &nbsp;to upload.
                    </div>
                  )}
                  <input
                    type="file"
                    name="image1"
                    id="image1"
                    onChange={(e: any) => handleChange(e)}
                    className="hidden"
                  />
                  {images.image1 && (
                    <div className="group absolute left-0 top-0 h-full w-full">
                      <Image
                        src={images.image1}
                        alt="image"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                        <label
                          htmlFor="image1"
                          className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                        >
                          Replace
                        </label>
                        <button
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
                          onClick={() => handleRemove(1)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
                  {!images.image2 && (
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
                      Drop files here or
                      <label
                        htmlFor="image2"
                        className="cursor-pointer italic underline"
                      >
                        click here
                      </label>
                      &nbsp;to upload.
                    </div>
                  )}
                  <input
                    type="file"
                    name="image2"
                    id="image2"
                    onChange={(e: any) => handleChange(e)}
                    className="hidden"
                  />
                  {images.image2 && (
                    <div className="group absolute left-0 top-0 h-full w-full">
                      <Image
                        src={images.image2}
                        alt="image"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                        <label
                          htmlFor="image2"
                          className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                        >
                          Replace
                        </label>
                        <button
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
                          onClick={() => handleRemove(2)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
                  {!images.image3 && (
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
                      Drop files here or
                      <label
                        htmlFor="image3"
                        className="cursor-pointer italic underline"
                      >
                        click here
                      </label>
                      &nbsp;to upload.
                    </div>
                  )}
                  <input
                    type="file"
                    name="image3"
                    id="image3"
                    onChange={(e: any) => handleChange(e)}
                    className="hidden"
                  />
                  {images.image3 && (
                    <div className="group absolute left-0 top-0 h-full w-full">
                      <Image
                        src={images.image3}
                        alt="image"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                        <label
                          htmlFor="image3"
                          className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                        >
                          Replace
                        </label>
                        <button
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
                          onClick={() => handleRemove(3)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-neutral-300 bg-[#F8F8F8]">
                  {!images.image4 && (
                    <div className="text-balance px-3 text-center text-sm text-neutral-400">
                      Drop files here or
                      <label
                        htmlFor="image4"
                        className="cursor-pointer italic underline"
                      >
                        click here
                      </label>
                      &nbsp;to upload.
                    </div>
                  )}
                  <input
                    type="file"
                    name="image4"
                    id="image4"
                    onChange={(e: any) => handleChange(e)}
                    className="hidden"
                  />
                  {images.image4 && (
                    <div className="group absolute left-0 top-0 h-full w-full">
                      <Image
                        src={images.image4}
                        alt="image"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-50 opacity-0 duration-300 hover:opacity-100">
                        <label
                          htmlFor="image4"
                          className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                        >
                          Replace
                        </label>
                        <button
                          className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
                          onClick={() => handleRemove(4)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h1 className="mb-3 font-bold">Product Pricing</h1>
              <div className="flex h-full w-full gap-4 rounded-md border border-neutral-300 p-4">
                <label htmlFor="priceFrom" className="block flex-grow">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Price From
                  </span>
                  <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                    <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                      &euro;
                    </span>
                    <input
                      name="priceFrom"
                      type="number"
                      autoComplete="off"
                      id="priceFrom"
                      placeholder="Price ranges from"
                      className="w-full border-none bg-transparent pl-12 focus:border-0 focus:ring-0"
                    />
                  </div>
                </label>
                <label htmlFor="priceTo" className="block flex-grow">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Price To
                  </span>
                  <div className="relative overflow-hidden rounded-md border bg-gray-100 focus-within:border-black">
                    <span className="absolute left-0 top-0 flex h-full w-10 items-center justify-center rounded-sm bg-white font-bold">
                      &euro;
                    </span>
                    <input
                      name="priceTo"
                      type="number"
                      autoComplete="off"
                      id="priceTo"
                      placeholder="Price ranges to"
                      className="w-full border-none bg-transparent pl-12 focus:border-0 focus:ring-0"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="mb-3 font-bold">Product Variant</h2>
              <div className="grid h-full grid-cols-2 gap-2 rounded-md border border-neutral-300 p-4">
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Shapes
                  </span>
                  <MultiSelect
                    options={cakeShapes}
                    value={shapes}
                    onChange={setShapes}
                    labelledBy="Select shapes"
                  />
                </div>
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Sizes
                  </span>
                  <MultiSelect
                    options={cakeSizes}
                    value={sizes}
                    onChange={setSizes}
                    labelledBy="Select sizes"
                  />
                </div>
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Product Fillings
                  </span>
                  <MultiSelect
                    options={fillingsList}
                    value={fillings}
                    onChange={setFillings}
                    labelledBy="Select fillings"
                  />
                </div>
                <div className="block">
                  <span className="mb-1 inline-block after:ml-1 after:text-xl after:text-[#E10] after:content-['*']">
                    Toppings/Add-ons
                  </span>
                  <MultiSelect
                    options={toppings}
                    value={addOn}
                    onChange={setAddOn}
                    labelledBy="Select toppings/add-ons"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="block md:hidden">
        <CreateProductLayout />
      </div>
    </section>
  );
}
