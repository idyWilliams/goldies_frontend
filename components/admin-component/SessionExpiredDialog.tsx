"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { adminLogOut } from "@/services/hooks/admin-auth";

interface SessionExpiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SessionExpiredDialog({
  open,
  onOpenChange,
}: SessionExpiredDialogProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    adminLogOut(router, pathname);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) return;
        onOpenChange(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Expired</DialogTitle>
          <DialogDescription>
            Your session has expired. Please log in again to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleLogout}>Log In Again</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
