"use client";

import { useRouter } from "next/navigation";

import { AppRoutes } from "@/constants";
import { SiteApi } from "@/services/apiClient";
import { Button, useToast } from "@/shadcn";
import { useQueryClient } from "@tanstack/react-query";

export const DeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const handleDeleteUser = async () => {
    try {
      await SiteApi.users.deleteUser();
      await queryClient.refetchQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game"] });
      toast({ description: "Successfully deleted account." });
      router.replace(AppRoutes.MAIN);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something unexpected happened... Try again later.",
      });
    }
  };
  return (
    <div className="w-full bg-[--background-profile] rounded-md shadow-xl">
      <div className="flex flex-col gap-3 p-6 w-[40rem]">
        <h2 className="font-medium text-lg">Delete Account</h2>
        <p className="font-normal text-sm">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
        <Button
          onClick={handleDeleteUser}
          className="mt-5 uppercase w-48 text-xs font-bold tracking-widest z-10 bg-red-600"
        >
          delete account
        </Button>
      </div>
    </div>
  );
};
