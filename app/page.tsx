"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// PERBAIKAN: Ganti "./editor-komponen" menjadi "./Editor"
// (Pastikan huruf E besar sesuai nama file)
const EditorUtama = dynamic(() => import("./Editor"), { 
  ssr: false, 
  loading: () => <div style={{padding: "40px", fontFamily: "sans-serif"}}>Memuat Rencana Besar...</div> 
});

export default function Page() {
  const [siap, setSiap] = useState(false);
  useEffect(() => { setSiap(true); }, []);
  return siap ? <EditorUtama /> : null;
}