import { storage } from "@/firebase.config";
import { type ClassValue, clsx } from "clsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadImageToFirebase(file: any) {
  const storageRef = ref(storage, `products/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
}
