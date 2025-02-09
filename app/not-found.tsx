import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../public/assets/goldis-logo.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 p-5">
      <div className="absolute top-4 left-4">
        <Image
          src={Logo}
          priority
          className="w-[130px]"
          width={175}
          height={92}
          alt="Goldis Logo"
        />
      </div>
      <h1 className="text-5xl font-bold">Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-6 flex gap-4">
        <Link href="/">
          <Button className="text-goldie-300 font-semibold" size='lg'>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
