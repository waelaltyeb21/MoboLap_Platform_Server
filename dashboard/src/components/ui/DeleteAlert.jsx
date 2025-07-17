import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MoboButton from "./MoboButton";

const DeleteAlert = ({ text, handler }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MoboButton variant="destructive">{text}</MoboButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="*:text-right">
          <AlertDialogTitle>هل انت متأكد من الحذف ؟</AlertDialogTitle>
          <AlertDialogDescription>
            هذا الاجراء لا يمكن التراجع عنه
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between *:cursor-pointer">
          <AlertDialogCancel>الغاء</AlertDialogCancel>
          <AlertDialogAction onClick={handler}>متابعة</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
