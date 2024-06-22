import { cn } from "@/helper/cn";
import { Information } from "iconsax-react";
import React from "react";

type EmptyStateCardProps = {
  className?: string;
  buttonClassName?: string;
  buttonText: string;
  handleClick: any;
  title: string;
  titleClassName?: string;
  isDisabled?: boolean;
  buttonElement?: React.ReactNode;
};

const EmptyStateCard = ({
  className,
  handleClick,
  buttonClassName,
  buttonText,
  title,
  titleClassName,
  isDisabled,
  buttonElement,
}: EmptyStateCardProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-white py-6",
        className,
      )}
    >
      <div className="flex flex-col items-center">
        <span className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 bg-opacity-15">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 bg-opacity-15 text-blue-500">
            <Information size="32" className="-rotate-180" />
          </span>
        </span>

        <h2 className={cn("font-medium", titleClassName)}>{title}</h2>
        {buttonElement ? (
          buttonElement
        ) : (
          <button
            disabled={isDisabled}
            onClick={handleClick}
            className={cn(
              "mt-3 inline-block cursor-pointer bg-goldie-300 px-4 py-2 text-neutral-900",
              buttonClassName,
            )}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyStateCard;
