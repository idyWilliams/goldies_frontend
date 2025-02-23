import { Copy } from "lucide-react";
import { cn } from "@/helper/cn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode, useContext } from "react";
import Image from "next/image";
import { CloseSquare } from "iconsax-react";
import Goldie from "@/public/assets/goldis-gold-logo.png";
import AuthContext from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import useActivePath from "@/app/_hooks/useActivePath";

export function DialogCloseButton({
  setPreviewFav,
  children,
}: Readonly<{
  children: ReactNode;
  setPreviewFav: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  // // @ts-ignore
  // const { activePathRef } = useContext(AuthContext);
  // const router = useRouter();
  // const pathname = usePathname();

  // const navigateToLogin = () => {
  //   console.log(pathname);

  //   activePathRef.current = pathname;
  //   router.push("/sign-in");
  // };
  const navigateToLogin = useActivePath();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "w-full gap-2 rounded-lg border-none bg-neutral-900 p-0 sm:w-[400px] md:w-[500px]",
        )}
      >
        <DialogHeader className="">
          <DialogTitle>
            <div className="flex items-center justify-between border-b border-goldie-300 border-opacity-40 px-4 py-4">
              <Image src={Goldie} alt="Goldie" className="w-[120px]" />
              <DialogClose asChild>
                <span
                  className="cursor-pointer text-goldie-300"
                  onClick={() => setPreviewFav(false)}
                >
                  <CloseSquare size={24} />
                </span>
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription className=" p-4 text-base leading-7 text-white ">
            You have to login to continue with this action. Login now or close
            to keep checking.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="px-4 pb-5 sm:justify-start">
          <div className=" flex gap-3">
            <button
              className="cursor-pointer rounded-md bg-goldie-300 px-4 py-1.5 text-sm text-neutral-900"
              onClick={navigateToLogin}
            >
              Login
            </button>

            <DialogClose asChild>
              <button
                className="cursor-pointer rounded-md bg-red-600 px-4 py-1.5 text-sm text-neutral-50"
                onClick={() => setPreviewFav(false)}
              >
                Close
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
