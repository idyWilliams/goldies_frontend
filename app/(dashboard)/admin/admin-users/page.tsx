// // pages/admin/AdminManagement.tsx
// "use client";

// import { useState, useEffect } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { MdAdminPanelSettings } from "react-icons/md";
// import { HiUserAdd } from "react-icons/hi";
// import { FaSpinner } from "react-icons/fa";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import {
// //   adminVerify,
// //   deleteAdmin,
// //   blockAdmin,
// //   unBlockAdmin,
// //   getAdminUsers,
// // } from "@/api/adminService";
// import { Admin } from "@/services/types";
// import AdminDataTable from "@/components/admin-component/admin-table/adminDataTable";
// import {
//   adminVerify,
//   getAdminUsers,
//   unBlockAdmin,
// } from "@/services/hooks/admin-auth";

// export default function AdminManagement() {
//   const queryClient = useQueryClient();
//   const [currentTab, setCurrentTab] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [adminToAction, setAdminToAction] = useState<Admin | null>(null);
//   const [actionDialogOpen, setActionDialogOpen] = useState(false);
//   const [actionType, setActionType] = useState<
//     "block" | "delete" | "reactivate" | "activate"
//   >("block");

//   // Fetch admins with React Query
//   const {
//     data,
//     isPending: isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["getAllAdmin", page, searchQuery, currentTab],
//     queryFn: () =>
//       getAdminUsers({
//         page,
//         limit: 10,
//         search: searchQuery,
//         status: currentTab === "all" ? undefined : currentTab,
//       }),
//     keepPreviousData: true,
//   });

//   const admins = data?.admins || [];
//   const pagination: AdminPaginationInfo = data?.pagination || {
//     total: 0,
//     page: 1,
//     limit: 10,
//     pages: 0,
//   };

//   // Error handling
//   useEffect(() => {
//     if (isError) {
//       toast({
//         title: "Error",
//         description: "Failed to load admins. Please try again.",
//         variant: "destructive",
//       });
//     }
//   }, [isError]);

//   // Mutations
//   const blockMutation = useMutation({
//     mutationFn: blockAdmin,
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: `Admin ${adminToAction?.userName} has been blocked.`,
//       });
//       queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
//       closeActionDialog();
//     },
//     onError: () => {
//       toast({
//         title: "Error",
//         description: "Failed to block admin. Please try again.",
//         variant: "destructive",
//       });
//       closeActionDialog();
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteAdmin,
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: `Admin ${adminToAction?.userName} has been deleted.`,
//       });
//       queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
//       closeActionDialog();
//     },
//     onError: () => {
//       toast({
//         title: "Error",
//         description: "Failed to delete admin. Please try again.",
//         variant: "destructive",
//       });
//       closeActionDialog();
//     },
//   });

//   const unblockMutation = useMutation({
//     mutationFn: unBlockAdmin,
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: `Admin ${adminToAction?.userName} has been reactivated.`,
//       });
//       queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
//       closeActionDialog();
//     },
//     onError: () => {
//       toast({
//         title: "Error",
//         description: "Failed to reactivate admin. Please try again.",
//         variant: "destructive",
//       });
//       closeActionDialog();
//     },
//   });

//   const verifyMutation = useMutation({
//     mutationFn: adminVerify,
//     onSuccess: () => {
//       toast({
//         title: "Success",
//         description: `Admin ${adminToAction?.userName}'s account has been activated.`,
//       });
//       queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
//       closeActionDialog();
//     },
//     onError: () => {
//       toast({
//         title: "Error",
//         description: "Failed to activate admin. Please try again.",
//         variant: "destructive",
//       });
//       closeActionDialog();
//     },
//   });

//   // Filter based on tab
//   const filteredAdmins = admins.filter((admin) => {
//     switch (currentTab) {
//       case "active":
//         return !admin.isBlocked && !admin.isDeleted && admin.isVerified;
//       case "blocked":
//         return admin.isBlocked && !admin.isDeleted;
//       case "deleted":
//         return admin.isDeleted;
//       case "pending":
//         return (
//           !admin.isVerified ||
//           (admin.statusChanges?.[0]?.status === "created" &&
//             !admin.isBlocked &&
//             !admin.isDeleted)
//         );
//       default:
//         return true;
//     }
//   });

//   // Action handlers
//   const handleAction = async () => {
//     if (!adminToAction) return;

//     switch (actionType) {
//       case "block":
//         blockMutation.mutate(adminToAction._id);
//         break;
//       case "delete":
//         deleteMutation.mutate(adminToAction._id);
//         break;
//       case "reactivate":
//         unblockMutation.mutate(adminToAction._id);
//         break;
//       case "activate":
//         verifyMutation.mutate(adminToAction._id);
//         break;
//     }
//   };

//   const openActionDialog = (
//     admin: Admin,
//     action: "block" | "delete" | "reactivate" | "activate",
//   ) => {
//     setAdminToAction(admin);
//     setActionType(action);
//     setActionDialogOpen(true);
//   };

//   const closeActionDialog = () => {
//     setActionDialogOpen(false);
//     setAdminToAction(null);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     setPage(1); // Reset to first page on new search
//   };

//   const isMutationLoading =
//     blockMutation.isPending ||
//     deleteMutation.isPending ||
//     unblockMutation.isPending ||
//     verifyMutation.isPending;

//   return (
//     <div className="container mx-auto space-y-6 py-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <MdAdminPanelSettings className="h-8 w-8 text-primary" />
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">
//               Admin Management
//             </h1>
//             <p className="text-muted-foreground">
//               Manage admin accounts and permissions
//             </p>
//           </div>
//         </div>
//         <Button className="gap-2">
//           <HiUserAdd className="h-4 w-4" />
//           <span>Add New Admin</span>
//         </Button>
//       </div>

//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle>Admin Accounts</CardTitle>
//           <CardDescription>
//             Total of {pagination.total} admin accounts in the system
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs
//             defaultValue="all"
//             value={currentTab}
//             onValueChange={setCurrentTab}
//           >
//             <TabsList className="mb-4">
//               <TabsTrigger value="all">All Admins</TabsTrigger>
//               <TabsTrigger value="active">Active</TabsTrigger>
//               <TabsTrigger value="pending">Pending Activation</TabsTrigger>
//               <TabsTrigger value="blocked">Blocked</TabsTrigger>
//               <TabsTrigger value="deleted">Deleted</TabsTrigger>
//             </TabsList>

//             <TabsContent value={currentTab} forceMount>
//               <AdminDataTable
//                 data={filteredAdmins}
//                 pagination={pagination}
//                 isLoading={isLoading}
//                 onPageChange={handlePageChange}
//                 onSearch={handleSearch}
//                 onBlock={(admin) => openActionDialog(admin, "block")}
//                 onDelete={(admin) => openActionDialog(admin, "delete")}
//                 onReactivate={(admin) =>
//                   openActionDialog(
//                     admin,
//                     admin.isDeleted ? "reactivate" : "reactivate",
//                   )
//                 }
//                 onActivate={(admin) => openActionDialog(admin, "activate")}
//               />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Action confirmation dialog */}
//       <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               {actionType === "block"
//                 ? "Block Admin"
//                 : actionType === "delete"
//                   ? "Delete Admin"
//                   : actionType === "activate"
//                     ? "Activate Admin Account"
//                     : "Reactivate Admin"}
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               {actionType === "block" &&
//                 "Blocking this admin will prevent them from accessing the system until they are unblocked."}
//               {actionType === "delete" &&
//                 "Deleting this admin will remove their account from active use. This can be undone later."}
//               {actionType === "reactivate" &&
//                 (adminToAction?.isDeleted
//                   ? "This will restore the deleted admin account."
//                   : "This will unblock the admin account and restore access.")}
//               {actionType === "activate" &&
//                 "This will activate the admin account and allow them to access the system."}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleAction}
//               disabled={isMutationLoading}
//             >
//               {isMutationLoading ? (
//                 <>
//                   <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <>
//                   {actionType === "block"
//                     ? "Block"
//                     : actionType === "delete"
//                       ? "Delete"
//                       : actionType === "activate"
//                         ? "Activate"
//                         : "Reactivate"}
//                 </>
//               )}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }

// pages/admin/AdminManagement.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
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
import AdminDataTable, {
  Admin,
  AdminPaginationInfo,
} from "@/components/AdminDataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminVerify,
  deleteAdmin,
  blockAdmin,
  unBlockAdmin,
  getAdminUsers,
} from "@/api/adminService";

export default function AdminManagement() {
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [adminToAction, setAdminToAction] = useState<Admin | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<
    "block" | "delete" | "reactivate" | "activate"
  >("block");

  // Map tab values to status filter
  const getStatusFilter = (tab: string) => {
    switch (tab) {
      case "active":
        return "active";
      case "pending":
        return "pending";
      case "blocked":
        return "blocked";
      case "deleted":
        return "deleted";
      default:
        return undefined;
    }
  };

  // Fetch admins with React Query
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
    keepPreviousData: true,
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
      toast({
        title: "Error",
        description: "Failed to load admins. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError]);

  // Mutations
  const blockMutation = useMutation({
    mutationFn: blockAdmin,
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Admin ${adminToAction?.userName} has been blocked.`,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to block admin. Please try again.",
        variant: "destructive",
      });
      closeActionDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Admin ${adminToAction?.userName} has been deleted.`,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete admin. Please try again.",
        variant: "destructive",
      });
      closeActionDialog();
    },
  });

  const unblockMutation = useMutation({
    mutationFn: unBlockAdmin,
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Admin ${adminToAction?.userName} has been reactivated.`,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reactivate admin. Please try again.",
        variant: "destructive",
      });
      closeActionDialog();
    },
  });

  const verifyMutation = useMutation({
    mutationFn: adminVerify,
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Admin ${adminToAction?.userName}'s account has been activated.`,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllAdmin"] });
      closeActionDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to activate admin. Please try again.",
        variant: "destructive",
      });
      closeActionDialog();
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
    setPage(newPage);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on new search
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setPage(1); // Reset to first page on tab change
  };

  const isMutationLoading =
    blockMutation.isPending ||
    deleteMutation.isPending ||
    unblockMutation.isPending ||
    verifyMutation.isPending;

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdAdminPanelSettings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Management
            </h1>
            <p className="text-muted-foreground">
              Manage admin accounts and permissions
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <HiUserAdd className="h-4 w-4" />
          <span>Add New Admin</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Admin Accounts</CardTitle>
          <CardDescription>
            Total of {pagination.total} admin accounts in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={currentTab}
            onValueChange={handleTabChange}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Admins</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending Activation</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
              <TabsTrigger value="deleted">Deleted</TabsTrigger>
            </TabsList>

            <TabsContent value={currentTab} forceMount>
              <AdminDataTable
                data={admins}
                pagination={pagination}
                isLoading={isLoading}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
