"use client";

import { FaTrashAlt } from "react-icons/fa"; 
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; 

export function DeleteAppointmentAlert({ appointment, onDeleteSuccess }) {
  const router = useRouter();
  const { _id, doctorName, patientName } = appointment;

  const handleDelete = async () => {
    try {
    
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        toast.error("You are not authorized. Please login again.");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://doc-appoint-server-kappa.vercel.app";

      
      const res = await fetch(`${apiUrl}/booking/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${tokenData.token}` // 🔒 Bearer Token পাঠানো হলো
        }
      });

      const data = await res.json();

      if (res.ok && (data.deletedCount > 0 || data.success)) {
        toast.success("Appointment deleted successfully!");
        
        if (onDeleteSuccess) {
          onDeleteSuccess(_id);
        }
        
        router.refresh();
      } else {
        toast.error(data.message || "Failed to delete from database");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <AlertDialog>
      
      <Button className="w-full h-10 flex items-center justify-center gap-2 px-4 bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-xs cursor-pointer active:scale-98">
        <FaTrashAlt className="w-3.5 h-3.5" /> Delete
      </Button>
      
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-white p-6 rounded-2xl shadow-xl">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="flex items-center gap-2">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-xl font-bold text-slate-800">
                Cancel Appointment?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="py-4 text-slate-600 text-sm">
              <p>
                Are you sure you want to permanently delete the appointment with{" "}
                <strong className="text-[#023154]">{doctorName}</strong> for patient <strong>{patientName}</strong>? 
                This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex justify-end gap-3 pt-2">
              <Button slot="close" variant="tertiary" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium text-sm cursor-pointer">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger" className="px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold text-sm rounded-xl cursor-pointer">
                Yes, Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}