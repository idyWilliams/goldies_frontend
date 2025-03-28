"use client";
import Layout from "@/app/(landing)/layout";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";

const inviteAdminModal = () => {
  return (
    <Layout>
      <div className="mt-[64px]" />
      <section className="py-10">
        <div className="wrapper">
          <div className="mb-4 mt-6 text-center">
            <p className="text-balance text-neutral-600">
              Request succesfully sent to your host!.
            </p>
          </div>
          <div className="mx-8 w-full">
            <Button className="col-span-2 mt-3 h-auto w-full rounded-none bg-neutral-800 py-3 text-base text-brand-200">
              Close
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default inviteAdminModal;
