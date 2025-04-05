"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cn } from "@/helper/cn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { FaSpinner, FaUserShield } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { AiOutlineSetting, AiOutlineUserAdd } from "react-icons/ai";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminDataTable, {
  Admin,
  AdminPaginationInfo,
} from "@/components/admin-component/admin-table/adminDataTable";
import {
  blockAdmin,
  adminVerify,
  deleteAdmin,
  unBlockAdmin,
  getAdminUsers,
  inviteAdmin,
} from "@/services/hooks/admin-auth";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

type FormData = {
  email: string;
  role: "admin" | "super_admin";
};
// Validation schema for invite admin form
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  role: yup
    .string()
    .oneOf(["admin", "super_admin"] as const, "Invalid role")
    .required("Role is required"),
});
export default function AdminManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState(
    searchParams.get("status") || "all",
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const lastPageChangeRef = useRef(Date.now());
  const [page, setPage] = useState(() => {
    return Number(searchParams.get("page")) || 1;
  });
  const [limit] = useState(10);
  const [adminToAction, setAdminToAction] = useState<Admin | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [addAdminDialogOpen, setAddAdminDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<
    "block" | "delete" | "reactivate" | "activate"
  >("block");

  // Form setup for invite admin modal
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      role: "admin", // Default role is admin
    },
  });

  const updateUrlParams = (params: {
    status?: string;
    search?: string;
    page?: number;
  }) => {
    const url = new URL(window.location.href);

    // Track if anything actually changed
    let hasChanges = false;

    if (params.status) {
      const currentStatus = url.searchParams.get("status") || "all";
      if (params.status !== currentStatus) {
        if (params.status === "all") {
          url.searchParams.delete("status");
        } else {
          url.searchParams.set("status", params.status);
        }
        hasChanges = true;
      }
    }

    if (params.search !== undefined) {
      const currentSearch = url.searchParams.get("search") || "";
      if (params.search !== currentSearch) {
        if (params.search === "") {
          url.searchParams.delete("search");
        } else {
          url.searchParams.set("search", params.search);
        }
        hasChanges = true;
      }
    }

    if (params.page !== undefined) {
      const currentPage = Number(url.searchParams.get("page")) || 1;
      if (params.page !== currentPage) {
        // Critical change: Skip if new page matches component state
        // This prevents the URL update from triggering another state change
        if (params.page === page) {
          console.log(
            "Skipping URL update - page already matches state:",
            page,
          );
          return;
        }

        if (params.page === 1) {
          url.searchParams.delete("page");
        } else {
          url.searchParams.set("page", params.page.toString());
        }
        hasChanges = true;
      }
    }

    // Only update if something actually changed
    if (hasChanges) {
      console.log("Updating URL params to:", url.search);
      router.replace(url.pathname + url.search, { scroll: false });
    }
  };

  const getStatusFilter = (tab: string) => {
    switch (tab) {
      case "active":
        return "active";
      case "blocked":
        return "blocked";
      case "deleted":
        return "deleted";
      default:
        return null;
    }
  };

  const {
    data,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllAdmin", page, limit, searchQuery, currentTab],
    queryFn: () =>
      getAdminUsers({
        page,
        limit,
        search: searchQuery,
        status: getStatusFilter(currentTab),
      }),
  });

  const admins = data?.admins || [];
  const pagination: AdminPaginationInfo = data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  };

  // Error handling
  useEffect(() => {
    if (isError) {
      toast("Failed to load admins. Please try again.");
    }
  }, [isError]);

  // Mutations
  const blockMutation = useMutation({
    mutationFn: blockAdmin,
    onSuccess: () => {
      toast(`Admin ${adminToAction?.userName} has been blocked.`);
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      toast("Failed to block admin. Please try again.");
      closeActionDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast(`Admin ${adminToAction?.userName} has been deleted.`);
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      toast("Failed to delete admin. Please try again.");
      closeActionDialog();
    },
  });

  const unblockMutation = useMutation({
    mutationFn: unBlockAdmin,
    onSuccess: () => {
      toast(`Admin ${adminToAction?.userName} has been reactivated.`);
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      closeActionDialog();
    },
  });

  const verifyMutation = useMutation({
    mutationFn: adminVerify,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      toast("Failed to activate admin. Please try again.");
      closeActionDialog();
    },
  });

  const inviteAdminMutation = useMutation({
    mutationFn: inviteAdmin,
    onSuccess: (data) => {
      toast.success("Invitation sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      reset();
      setAddAdminDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to send invitation",
      );
    },
  });

  // Action handlers
  const handleAction = async () => {
    if (!adminToAction) return;

    switch (actionType) {
      case "block":
        blockMutation.mutate(adminToAction._id);
        break;
      case "delete":
        deleteMutation.mutate(adminToAction._id);
        break;
      case "reactivate":
        unblockMutation.mutate(adminToAction._id);
        break;
      case "activate":
        verifyMutation.mutate(adminToAction._id);
        break;
    }
  };

  const openActionDialog = (
    admin: Admin,
    action: "block" | "delete" | "reactivate" | "activate",
  ) => {
    setAdminToAction(admin);
    setActionType(action);
    setActionDialogOpen(true);
  };

  const closeActionDialog = () => {
    setActionDialogOpen(false);
    setAdminToAction(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;

    console.log("AdminManagement: Changing page to", newPage, "from", page);
    setPage(newPage);
    const currentChange = Date.now();
    lastPageChangeRef.current = currentChange;

    setTimeout(() => {
      if (lastPageChangeRef.current === currentChange) {
        updateUrlParams({ page: newPage });
      }
    }, 50);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on new search
    updateUrlParams({ search: query, page: 1 });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setPage(1);
    updateUrlParams({ status: tab, page: 1 });
  };

  const handleAddNewAdmin = (data: any) => {
    inviteAdminMutation.mutate(data);
  };
  const selectedRole = watch("role");
  const isMutationLoading =
    blockMutation.isPending ||
    deleteMutation.isPending ||
    unblockMutation.isPending ||
    verifyMutation.isPending;

  return (
    <div className=" w-full px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <div className="items center flex gap-2 ">
              <MdAdminPanelSettings className="h-8 w-8 text-primary" />
              <div className="flex items-center gap-3">
                <h1 className="text-base font-bold tracking-tight md:text-2xl">
                  Admin Management
                </h1>
                <Badge className=" hidden bg-brand-200 text-[10px] md:block">
                  {pagination.total}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              Manage admin accounts and permissions
            </p>
          </div>
        </div>

        <Dialog open={addAdminDialogOpen} onOpenChange={setAddAdminDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex cursor-pointer items-center gap-1 self-start rounded-md bg-brand-200 text-brand-100 hover:bg-brand-200">
              <HiUserAdd className="h-4 w-4" />
              <span>Add New Admin</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[440px]">
            <div className="flex flex-col items-center py-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-200 bg-opacity-35">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 bg-opacity-35 text-brand-100">
                  <AiOutlineUserAdd size={30} />
                </span>
              </span>
              <div className="mb-8 mt-6 text-center">
                <DialogTitle className="mb-1 text-2xl font-bold capitalize">
                  Invite Admin
                </DialogTitle>
                <DialogDescription className="text-balance text-neutral-600">
                  A link will be sent to the provided email to request admin
                  access
                </DialogDescription>
              </div>
              <div className="w-full">
                {/* <form
                  id="signup"
                  className="flex flex-col gap-5 md:grid-cols-2"
                  onSubmit={handleSubmit(handleAddNewAdmin)}
                >
                  <label htmlFor="email" className="md:col-span-2">
                    <span className="mb-1 inline-block font-medium capitalize">
                      Email Address
                    </span>
                    <input
                      {...register("email")}
                      type="email"
                      className={cn(
                        "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                        errors?.email
                          ? "border border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                      )}
                      id="email"
                      name="email"
                      placeholder="admin@example.com"
                    />
                    {errors?.email && (
                      <p className={cn("mt-1 text-sm text-red-600")}>
                        {errors.email?.message}
                      </p>
                    )}
                  </label>
                  <Button
                    disabled={inviteAdminMutation.isPending}
                    className="col-span-2 mt-3 h-auto w-full rounded-none bg-brand-200 py-3 text-base text-brand-100"
                    type="submit"
                  >
                    {inviteAdminMutation.isPending ? (
                      <div className="flex items-center justify-center gap-3">
                        <CgSpinner className="animate-spin" size={20} />
                        Loading...
                      </div>
                    ) : (
                      "Send Invite"
                    )}
                  </Button>
                </form> */}

                <form
                  className="w-full space-y-6"
                  onSubmit={handleSubmit(handleAddNewAdmin)}
                >
                  <div>
                    <label htmlFor="email" className="mb-1 block font-medium">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={cn(
                        "form-input w-full bg-neutral-100 py-3 placeholder:text-neutral-500",
                        errors?.email
                          ? "border border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-0 focus:border-neutral-900 focus:ring-neutral-900",
                      )}
                      id="email"
                      placeholder="admin@example.com"
                    />
                    {errors?.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block font-medium">Assign Admin Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-200 p-4 transition-all",
                          selectedRole === "admin"
                            ? "border-brand-100 bg-brand-200 bg-opacity-10"
                            : "hover:border-neutral-300",
                        )}
                      >
                        <input
                          type="radio"
                          {...register("role")}
                          value="admin"
                          className="sr-only"
                        />
                        <FaUserShield
                          size={24}
                          className={cn(
                            "mb-2",
                            selectedRole === "admin"
                              ? "text-brand-100"
                              : "text-neutral-500",
                          )}
                        />
                        <span
                          className={cn(
                            "font-medium",
                            selectedRole === "admin"
                              ? "text-brand-100"
                              : "text-neutral-700",
                          )}
                        >
                          Admin
                        </span>
                        <span className="mt-1 text-center text-xs text-neutral-500">
                          Standard admin access
                        </span>
                      </label>

                      <label
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-200 p-4 transition-all",
                          selectedRole === "super_admin"
                            ? "border-brand-100 bg-brand-200 bg-opacity-10"
                            : "hover:border-neutral-300",
                        )}
                      >
                        <input
                          type="radio"
                          {...register("role")}
                          value="super_admin"
                          className="sr-only"
                        />
                        <AiOutlineSetting
                          size={24}
                          className={cn(
                            "mb-2",
                            selectedRole === "super_admin"
                              ? "text-brand-100"
                              : "text-neutral-500",
                          )}
                        />
                        <span
                          className={cn(
                            "font-medium",
                            selectedRole === "super_admin"
                              ? "text-brand-100"
                              : "text-neutral-700",
                          )}
                        >
                          Super Admin
                        </span>
                        <span className="mt-1 text-center text-xs text-neutral-500">
                          Full system access
                        </span>
                      </label>
                    </div>
                    {errors?.role && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.role?.message}
                      </p>
                    )}
                  </div>

                  <Button
                    disabled={inviteAdminMutation.isPending}
                    className="hover:bg-brand-200/90 h-auto w-full bg-brand-200 py-3 text-base font-medium text-brand-100"
                  >
                    {inviteAdminMutation.isPending ? (
                      <div className="flex items-center justify-center gap-3">
                        <CgSpinner className="animate-spin" size={20} />
                        Sending Invitation...
                      </div>
                    ) : (
                      "Send Invite"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />
      <div>
        <CardContent className="p-0">
          <AdminDataTable
            data={admins}
            pagination={pagination}
            isLoading={isLoading}
            currentTab={currentTab}
            onTabChange={handleTabChange}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            onBlock={(admin) => openActionDialog(admin, "block")}
            onDelete={(admin) => openActionDialog(admin, "delete")}
            onReactivate={(admin) =>
              openActionDialog(
                admin,
                admin.isDeleted ? "reactivate" : "reactivate",
              )
            }
            onActivate={(admin) => openActionDialog(admin, "activate")}
          />
        </CardContent>
      </div>

      {/* Action confirmation dialog */}
      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "block"
                ? "Block Admin"
                : actionType === "delete"
                  ? "Delete Admin"
                  : actionType === "activate"
                    ? "Activate Admin Account"
                    : "Reactivate Admin"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "block" &&
                "Blocking this admin will prevent them from accessing the system until they are unblocked."}
              {actionType === "delete" &&
                "Deleting this admin will remove their account from active use. This can be undone later."}
              {actionType === "reactivate" &&
                (adminToAction?.isDeleted
                  ? "This will restore the deleted admin account."
                  : "This will unblock the admin account and restore access.")}
              {actionType === "activate" &&
                "This will activate the admin account and allow them to access the system."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAction}
              disabled={isMutationLoading}
            >
              {isMutationLoading ? (
                <>
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {actionType === "block"
                    ? "Block"
                    : actionType === "delete"
                      ? "Delete"
                      : actionType === "activate"
                        ? "Activate"
                        : "Reactivate"}
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
