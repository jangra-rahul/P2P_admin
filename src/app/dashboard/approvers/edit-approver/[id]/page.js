"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  getApproverRequest,
  editApproverRequest,
} from "@/redux/slice/approverSlice";
import EditApproverModal from "../../../../../componets/approver/EditApproverModal";
import { Spinner } from "react-bootstrap";


const EditApproverPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [approver, setApprover] = useState(null);

  useEffect(() => {
    const fetchApprover = async () => {
      const res = await dispatch(getApproverRequest({ id }));
      setApprover(res?.payload); // ✅ depends on your API structure
    };

    fetchApprover();
  }, [dispatch, id]);

  const handleSave = (data) => {
    dispatch(editApproverRequest({ id, data }));
    router.push("/dashboard/approvers");
  };

  if (!approver) return <div className="p-5"><Spinner/></div>;

  return (
    <EditApproverModal
      approver={approver}
      onSave={handleSave}
      onClose={() => router.push("/dashboard/approvers")}
    />
  );
};

export default EditApproverPage;
