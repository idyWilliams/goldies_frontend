import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { IBillingInfo } from "@/interfaces/user.interface";
import {
  getAllBllingInfo,
  setDefaultBilling,
  updateDetailsBillings,
} from "@/services/hooks/payment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit, Trash } from "iconsax-react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteAddressModal from "../DeleteAddressModal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EditBillingForm from "./EditBillingForm";

const MyAddresses = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<IBillingInfo | null>(null);
  const [deletingInfo, setDeletingInfo] = useState<IBillingInfo | null>(null);

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["allBllingInfo"],
    queryFn: async () => getAllBllingInfo(),
  });

  const billingInfos = data?.user as IBillingInfo[];

  const updateBillingDetails = useMutation({
    mutationFn: updateDetailsBillings,
  });

  const setAsDefault = useMutation({
    mutationFn: setDefaultBilling,
  });

  const handleDefault = async(data: IBillingInfo) => {
    if (!data) {
      toast.error("No billing information selected to set as default");
      return;
    }
    try {
      await setAsDefault.mutateAsync(data?._id);
      toast.success("Default billing info updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to update default billing info");
    }
  };

  // Function to map billing info to form values
  const mapBillingInfoToForm = (info: IBillingInfo) => ({
    _id: info._id,
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    phone: info.phoneNumber,
    address: info.streetAddress,
    state: info.cityOrTown,
    country: info.country,
  });

  // Handle edit submission
  const handleEditSubmit = async (data: any) => {
    if (!data._id) {
      toast.error("Invalid billing information");
      return;
    }

    try {
      const billingInfo = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phone,
        streetAddress: data.address,
        cityOrTown: data.city,
        defaultBillingInfo: data.save,
      };

      await updateBillingDetails.mutateAsync(billingInfo);
      toast.success("Billing info updated successfully!");
      refetch();
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Failed to update billing info");
    }
  };

  return (
    <div>
      <div className="mb-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">My Addresses</h2>
        <p>Manage your personal and frequently used shipping addresses.</p>
      </div>

      {isLoading ? (
        <div className="flex w-full items-center justify-center py-10">
          <Loader2Icon className="mr-2 animate-spin" />
          <p>Fetching shipping address...</p>
        </div>
      ) : billingInfos && billingInfos.length > 0 ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <EachElement
            of={billingInfos}
            render={(item: IBillingInfo, index: number) => (
              <div
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden rounded border p-4 pb-0",
                )}
                key={index}
              >
                <div className="">
                  {item?.defaultBillingInfo && (
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-700 border-opacity-20 px-3 py-1 text-sm font-medium text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-700 "></span>{" "}
                      Default
                    </span>
                  )}
                  <h3 className="font-medium">
                    {item?.firstName} {item?.lastName}
                  </h3>
                  <p className="text-neutral-600">
                    {item?.streetAddress} <br />{" "}
                    <span>
                      {item?.cityOrTown}, {item?.country}
                    </span>
                  </p>
                  <p className="text-neutral-600">+{item?.phoneNumber}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t py-3">
                  <Button
                    className={cn(
                      "bg-neutral-900 text-goldie-300",
                      item?.defaultBillingInfo &&
                        "cursor-not-allowed bg-opacity-5 text-neutral-300",
                    )}
                    onClick={() => handleDefault(item)}
                  >
                    Set as default
                  </Button>
                  <div className="inline-flex items-center gap-2">
                    <Dialog
                      open={isEditOpen && editingInfo?._id === item._id}
                      onOpenChange={(open) => {
                        if (!open) {
                          setEditingInfo(null);
                        }
                        setIsEditOpen(open);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingInfo(item);
                          }}
                        >
                          <Edit size={20} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Billing Information</DialogTitle>
                        </DialogHeader>
                        {editingInfo && (
                          <EditBillingForm
                            defaultValues={mapBillingInfoToForm(editingInfo)}
                            onSubmit={handleEditSubmit}
                            onClose={() => setIsEditOpen(false)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={isDeleteOpen && deletingInfo?._id === item._id}
                      onOpenChange={(open) => {
                        if (!open) {
                          setDeletingInfo(null);
                        }
                        setIsDeleteOpen(open);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingInfo(item);
                          }}
                        >
                          <Trash size={20} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-0 bg-transparent p-0 sm:max-w-[600px]">
                        <DeleteAddressModal
                          data={item}
                          onClose={() => setIsDeleteOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      ) : (
        <div>
          <p className="text-center text-gray-500">No shipping yet</p>
        </div>
      )}
    </div>
  );
};

export default MyAddresses;
