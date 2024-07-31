"use client";
import Layout from "@/components/Layout";
import AccountInfo from "@/components/my-account-comps/AccountInfo";
import MyAddresses from "@/components/my-account-comps/MyAddresses";
import SavedItems from "@/components/my-account-comps/SavedItems";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import { cn } from "@/helper/cn";
import EachElement from "@/helper/EachElement";
import { recentOrders } from "@/utils/adminData";
import { ArrowLeft, Eye } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function switchTabs(index: any) {
  switch (index) {
    case "account-details":
      return <AccountInfo />;
    case "recent-orders":
      return <Orders />;
    case "saved-items":
      return <SavedItems />;
    case "my-addresses":
      return <MyAddresses />;
    // case 4:
    //   return <ChangePassword />;
    default:
      break;
  }
}

const AccountTabs = ({ params }: any) => {
  console.log(params);

  return (
    <Layout>
      <div className="mt-[64px]" />
      <section
        className={cn(
          "px-4 py-7",
          params.tab === "recent-orders" && "bg-neutral-50",
        )}
      >
        <div>{switchTabs(params?.tab)}</div>
      </section>
    </Layout>
  );
};

export default AccountTabs;

const Orders = () => {
  const router = useRouter();
  return (
    <div className="">
      <div className="mb-4 flex items-start gap-2 border-b border-neutral-200 pb-4 md:block md:border-0">
        <Link href="/my-account" className="md:hidden">
          <ArrowLeft size={32} />
        </Link>
        <div>
          {" "}
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p>Recent orders from the store.</p>
        </div>
      </div>
      <div className="grid gap-5">
        <EachElement
          of={recentOrders}
          render={(order: any, index: any) => {
            if (index > 6) return;
            return (
              <div key={index} className="rounded-md bg-white p-4">
                <ul className="space-y-3">
                  <li>
                    <div className="flex items-center justify-between">
                      <span>Order ID: #GOL{order?.id.slice(0, 4)}</span>
                      <span>
                        <StatusColumn status={order?.status} />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                      <span>Order Quantity</span>
                      <span>{order?.quantity} products</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center justify-between">
                      <span>Amount</span>
                      <span>
                        <span>&euro;{order?.price}</span>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                      <span>Shipping</span>
                      <span>
                        <span>&euro;{order?.shippingFee}</span>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center justify-between border-t pt-2">
                      <span>Total</span>
                      <span>
                        <span>
                          &euro;{order?.shippingFee + order?.price * 1}
                        </span>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center justify-between">
                      <span>Date:</span>
                      <button
                        onClick={() => router.push(`/my-orders/${order?.id}`)}
                        className="inline-flex items-center gap-2 bg-neutral-900 px-2 py-1 text-sm text-goldie-300"
                      >
                        <span>View</span> <Eye size={20} />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
