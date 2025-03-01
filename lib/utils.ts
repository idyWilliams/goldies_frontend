import { storage } from "@/firebase.config";
import { type ClassValue, clsx } from "clsx";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadImageToFirebase(file: File) {
  try {
    const storageRef = ref(storage, `products/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    // console.log("Image uploaded successfully:", url);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteImageFromFirebase(imageUrl: string) {
  try {
    // Decode the URL to handle special characters like %2F
    const decodedUrl = decodeURIComponent(imageUrl);

    // Extract the file path from the full URL
    const url = new URL(decodedUrl);
    const pathname = url.pathname;

    // Remove the leading "/v0/b/bucket-name/o/" from the path
    const pathStartIndex = pathname.indexOf("o/") + 2; // +2 to skip "o/"
    if (pathStartIndex === -1) {
      throw new Error("Invalid image URL: Path not found.");
    }

    const filePath = pathname.substring(pathStartIndex);

    // Create a reference to the file to delete
    const storageRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(storageRef);

    // console.log("Image deleted successfully:", filePath);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
