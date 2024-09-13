import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { Edit, Trash } from "iconsax-react";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import EditAddressModal from "../EditAddressModal";

const addresses = [
  {
    id: 1,
    firstname: "Timilehin",
    lastname: "Abegunde",
    address:
      "3, Alade Yusuf Street, Off Epetedo B/Stop, Abaranje Road, Ikotun, Lagos.",
    city: "Ikotun",
    state: "Lagos",
    country: "Nigeria",
    phonenumber: "+234 801 234 5678",
    isDefault: true,
  },
  {
    id: 2,
    firstname: "Chimamanda",
    lastname: "Adichie",
    address: "15 Eze Crescent, Independence Layout, Enugu.",
    city: "Enugu",
    state: "Enugu",
    country: "Nigeria",
    phonenumber: "+234 802 345 6789",
    isDefault: false,
  },
  {
    id: 3,
    firstname: "Olumide",
    lastname: "Adeniyi",
    address: "22 Awolowo Road, Bodija, Ibadan.",
    city: "Ibadan",
    state: "Oyo",
    country: "Nigeria",
    phonenumber: "+234 803 456 7890",
    isDefault: false,
  },
  {
    id: 4,
    firstname: "Fatima",
    lastname: "Usman",
    address: "9 Waziri Street, Unguwan Rimi, Kaduna.",
    city: "Kaduna",
    state: "Kaduna",
    country: "Nigeria",
    phonenumber: "+234 804 567 8901",
    isDefault: false,
  },
];


  // const form = useForm<z.infer<typeof formSchema >>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //         firstname: "Timilehin",
  //       },
  // })

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //     console.log(values)
  //     console.log('submitted')
// }
  

const MyAddresses = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div>
      <div className="mb-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">My Addresses</h2>
        <p>Manage your personal and frequently used shipping addresses.</p>
      </div>

      {isEditOpen && (
        <EditAddressModal
        // onClose={() => setIsEditOpen(false)}
        // selectedAddress={selectedAddress}
        />
      )}
      <div className="grid gap-3 lg:grid-cols-2">
        <EachElement
          of={addresses}
          render={(item: any, index: number) => (
            <div
              className={cn(
                "relative flex flex-col justify-between overflow-hidden rounded border p-4 pb-0",
              )}
              key={index}
            >
              <div className="">
                {item?.isDefault && (
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-700 border-opacity-20 px-3 py-1 text-sm font-medium text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-700 "></span>{" "}
                    Default
                  </span>
                )}
                <h3 className="font-medium">
                  {item?.firstname} {item?.lastname}
                </h3>
                <p className="text-neutral-600">
                  {item?.address} <br />{" "}
                  <span>
                    {item?.state}, {item?.country}
                  </span>
                </p>
                <p className="text-neutral-600">{item?.phonenumber}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t py-3">
                <span
                  className={cn(
                    "cursor-pointer rounded bg-neutral-900 px-3 py-2 text-sm uppercase text-goldie-300",
                    item?.isDefault &&
                      "cursor-not-allowed bg-opacity-5 text-neutral-300",
                  )}
                >
                  Set as default
                </span>
                <div className="inline-flex items-center gap-2">
                  <span
                    className="cursor-pointer text-neutral-900"
                    // onClick={() => handleEditClick(item)}
                    // onClick={() => setIsPopupOpen(true)}
                    onClick={() => {
                      // setIsPopupOpen(true);
                      setIsEditOpen(true);
                      setSelectedAddress(item); // Pass the clicked address data
                    }}
                  >
                    <Edit />
                  </span>
                  <span className="cursor-pointer text-neutral-900">
                    <Trash />
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>

    //   <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //     <FormField
    //       control={form.control}
    //       name="firstname"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>First Name</FormLabel>
    //           <FormControl>
    //             <Input placeholder="Timilehin" {...field} />
    //           </FormControl>
    //           {/* <FormDescription>
    //             This is your public display name.
    //           </FormDescription> */}
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     {/* last name */}
    //     {/* <FormField
    //       // control={form.control}
    //       // name="username"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Last Name</FormLabel>
    //           <FormControl>
    //             <Input placeholder="Abegunde" {...field} />
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )} */}
    //     {/* /> */}
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>

    
    
  );
};

export default MyAddresses;

// const EditAddressModal = (onClose, address,) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
//       <form>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">First Name</label>
//           <input
//             type="text"
//             defaultValue={address.firstname}
//             className="w-full border border-neutral-300 rounded px-3 py-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Last Name</label>
//           <input
//             type="text"
//             defaultValue={address.lastname}
//             className="w-full border border-neutral-300 rounded px-3 py-2"
//           />
//         </div>

//         {/* add address, country, state, etc here */}

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             onClick={onClose}
//             className="mr-2 bg-black text-white px-4 py-2 rounded"
//           >
//             Save Changes
//           </button>
//           <button type="button"
//           className="bg-white text-black px-4 py-2 rounded"
//           onClick={onClose}
//           >
//             Discard Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
//   );
// };

// export default EditAddressModal;




// "use client";

// import BreadCrumbs from "@/components/BreadCrumbs";
// import Layout from "@/components/Layout";
// import AccountInfo from "@/components/my-account-comps/AccountInfo";
// import ChangePassword from "@/components/my-account-comps/ChangePassword";
// import MyAddresses from "@/components/my-account-comps/MyAddresses";
// import Orders from "@/components/my-account-comps/Orders";
// import SavedItems from "@/components/my-account-comps/SavedItems";
// import EachElement from "@/helper/EachElement";
// import { cn } from "@/helper/cn";
// import { Book, Box, HeartTick, Lock1, UserSquare } from "iconsax-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { act, useEffect, useState } from "react";
// import arrow from '../../public/assets/back-arrow.png';
// import frontarrow from '../../public/assets/frontArrow.png';


// const tabs = [
//   {
//     label: "Account Info",
//     icon: <UserSquare />,
//   },
//   {
//     label: "Recent Orders",
//     icon: <Box />,
//   },
//   {
//     label: "Saved Items",
//     icon: <HeartTick />,
//   },
//   {
//     label: "My Addresses",
//     icon: <Book />,
//   },
//   // {
//   //   label: "Change Password",
//   //   icon: <Lock1 />,
//   // },
// ];

// function switchTabs(index: any) {
//   switch (index) {
//     case 0:
//       return <AccountInfo />;
//     case 1:
//       return <Orders />;
//     case 2:
//       return <SavedItems />;
//     case 3:
//       return <MyAddresses />;
//     // case 4:
//     //   return <ChangePassword />;
//     default:
//       break;
//   }
// }

// const Page = () => {
//   const [activeTab, setActiveTab] = useState<any>(null);
//   const [activeDesktopTab, setActiveDesktopTab] = useState<any>(0);
//   const router = useRouter();
//   const [isMobileView, setIsMobileView] = useState(false)

//   const handleTab = (index: number, label: string) => {
//     setActiveTab(index);
//     const newUrl = label?.toLowerCase().replace(/ /g, "-");
//     router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
//     // window.scrollTo(0, 0);
//     // if (!isMobileView) window.scrollTo(0, 0);

//     // if (isMobileView) {
//     //   setActiveTab(null);
//     // } else if(!isMobileView) {
//     //   setActiveTab(0);
//     // } else {
//     //   console.log("not applicable");
//     // }
//   };

//   const handleDesktopTab = (index: number, label: string) => {
//     setActiveDesktopTab(index);
//         const newUrl = label?.toLowerCase().replace(/ /g, "-");
//         router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
//     window.scrollTo(0, 0);

//   }



  
//   // handle mobile and desktop states separately

//   useEffect(() => {
//     const newUrl = tabs[activeTab]?.label?.toLowerCase().replace(/ /g, "-");
//     router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
    
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth <= 768);
//     }

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return() => window.removeEventListener('resize', handleResize)


//   }, [activeTab, router]);

//     useEffect(() => {
//     const newUrl = tabs[activeDesktopTab].label?.toLowerCase().replace(/ /g, "_");
//     router.push(`/my-account?tab=${encodeURIComponent(newUrl)}`);
//   }, [activeDesktopTab, router])


//   return (
//     <>
//       <Layout>
//         <div className="mt-[65px] lg:mt-20"></div>
//         <div className="bg-black">
//           <div className={cn("wrapper px-4 py-3")}>
//             <BreadCrumbs
//               items={[
//                 {
//                   name: "Home",
//                   link: "/",
//                 },
//                 {
//                   name: "My Account",
//                   link: "/my-account",
//                 },
//               ]}
//             />
//           </div>
//         </div>
//         <section className="px-4 py-8 md:bg-neutral-200">
//           <h1 className="flex flex-col items-center justify-center gap-1 text-center text-2xl font-bold after:inline-block after:h-1 after:w-[100px] after:bg-goldie-500">
//             My Account
//           </h1>

//           <div className="  w-full gap-4 tabular-nums md:grid md:grid-cols-[30%_1fr] md:items-start md:justify-between lg:mx-auto lg:max-w-[1000px] xl:max-w-[1140px]">
//             <div className="mb-4  h-full w-full flex-wrap gap-2 border-b border-neutral-200 pb-10 md:my-0 md:flex-col md:bg-white md:p-4">
//               {/* border-b border-neutral-200  */}
//               {isMobileView ? (
//                 activeTab === null ? (
//                   <EachElement
//                     of={tabs}
//                     render={(tab: any, index: number) => (
//                       <div
//                         key={index}
//                         onClick={() => handleTab(index, tab.label)}
//                         className={cn(
//                           "mb-8 flex cursor-pointer items-center justify-between rounded-md border border-neutral-500  py-4 text-red-900 md:w-full md:rounded-none md:border-0",
//                           // icons + labels up
//                           activeTab === index &&
//                             "w-min justify-center bg-neutral-900 text-goldie-300 md:justify-start",
//                         )}
//                        >
//                         {/* each icon and label */}
//                         <div className="flex items-center justify-start  ">
//                           <div
//                             className={cn(
//                               "flex w-20 items-center justify-center gap-2 text-lg text-neutral-500",
//                               activeTab === index && "text-goldie-300",
//                             )}
//                           >
//                             {tab.icon}
//                           </div>
//                           <h3
//                             className={cn(
//                               "w-auto whitespace-nowrap text-center text-lg text-neutral-500 opacity-100 duration-300 md:text-sm",
//                               activeTab === index && "text-goldie-300",
//                             )}
//                           >
//                             {tab.label}
//                           </h3>
//                         </div>

//                         <div
//                           className={cn(
//                             "flex w-5 items-center justify-center gap-2 text-lg text-neutral-500 mr-4 ",
//                             activeTab === index && "text-goldie-300",
//                           )}
//                          >
//                           <Image src={frontarrow} alt="front arrow" />
//                         </div>
//                       </div>
//                     )}
//                   />
//                 ) : (
//                   <div className="md:w-full">
//                     <button
//                       className="mb-4 text-blue-600 underline"
//                       onClick={() => setActiveTab(null)}
//                     >
//                       <Image
//                         src={arrow}
//                         className="flex w-[20px] items-center"
//                         alt="arrow"
//                       />
//                     </button>
//                     {switchTabs(activeTab)}
//                   </div>
//                 )
//               ) : (
//                 <EachElement
//                   of={tabs}
//                   render={(tab: any, index: number) => (
//                     <div
//                       key={index}
//                       onClick={() => handleTab(index, tab.label)}
//                       className={cn(
//                         "flex cursor-pointer items-center justify-start gap-1 rounded-md border border-neutral-500 px-3 py-2 md:w-full md:rounded-none md:border-0",
//                         activeTab === index &&
//                           "w-min justify-center bg-neutral-900 text-goldie-300 md:justify-start",
//                       )}
//                     >
//                       <div
//                         className={cn(
//                           "flex w-5 items-center justify-center gap-2 text-neutral-500",
//                           activeTab === index && "text-goldie-300",
//                         )}
//                       >
//                         {tab.icon}
//                       </div>
//                       <h3
//                         className={cn(
//                           "w-auto whitespace-nowrap text-center text-xs text-neutral-500 opacity-100 duration-300 md:text-sm",
//                           activeTab === index && "text-goldie-300",
//                         )}
//                       >
//                         {tab.label}
//                       </h3>
//                     </div>
//                   )}
//                 />
//               )}
//              </div>

//             {!isMobileView && (
//               <div className="md:h-full md:bg-white md:p-4">
//                 {switchTabs(activeDesktopTab)}
//               </div>
//             )}
//           </div>
//         </section>
//       </Layout>
//     </>
//   );
// };

// // manage your state properly
// // edit page, delete box, top tabs to list
// // <div className=" mt-5 gap-4 tabular-nums md:grid md:grid-cols-[30%_1fr] md:items-start md:justify-between lg:mx-auto lg:max-w-[1000px] xl:max-w-[1140px]">
// //       <div className=" mb-4 mt-5 flex h-full flex-wrap gap-2 border-b border-neutral-200 pb-4 md:my-0 md:flex-col md:bg-white md:p-4">


// export default Page;
