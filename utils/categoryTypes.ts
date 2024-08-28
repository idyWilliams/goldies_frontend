export type CatWithCategory = {
  cat: string;
  isCategory: boolean;
  sub?: never;
  isSubcategory?: never;
};

export type SubWithSubcategory = {
  sub: string;
  isSubcategory: boolean;
  cat?: never;
  isCategory?: never;
};

export type ModalProps = {
  showModal: boolean;
  setShowModal: any;
  catOrSub: CatWithCategory | SubWithSubcategory;
  actionType: string;
  handleConfirm: any;
};

export type CategoryPageProps = {
  params: any;
};

export type CategoryProps = {
  categoryName: string;
  categorySlug: string;
  description: string;
  [x: string]: string;
};

export type SubcategoriesProps = {
  category: string;
  subcategoryName: string;
  description: string;
  status: "active" | "inactive";
  image: any | File;
}[];

export type SubategoriesColumns = {
  image: any;
  subCategoryName: string;
  description: string;
  status: string;
};

export type SubCategoryProps = {
  // parentCategory: string;
  subCategoryName: string;
  description: string;
  status: "active" | "inactive";
  [x: string]: string;
};

export type CategoryImageProps = {
  imageUrl: string;
  dragging: boolean;
  handleDragEnter: (e: any) => void;
  handleDragLeave: (e: any) => void;
  handleDragOver: (e: any) => void;
  handleDrop: (e: any) => void;
  handleRemoveCateImg: (e: any) => void;
};
