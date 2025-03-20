import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../public/assets/new-logo/logo-colored.svg";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-brand-100 p-5">
      <div className="absolute left-4 top-4">
        <Image
          src={Logo}
          priority
          className="w-[130px]"
          width={175}
          height={92}
          alt="The cake app Logo"
        />
      </div>
      <h1 className="text-5xl font-bold">Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-6 flex gap-4">
        <Link href="/">
          <Button
            className="bg-brand-200 font-semibold text-brand-100"
            size="lg"
          >
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
