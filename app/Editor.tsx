"use client";
import { useState, useEffect } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function Editor() {
  const [tema, setTema] = useState<"light" | "dark">("light");
  const editor: any = useCreateBlockNote();

  // Memuat data tersimpan agar ketikan tidak hilang saat refresh
  useEffect(() => {
    const data = localStorage.getItem("my-bigplan-storage");
    if (data && editor) {
      try { editor.replaceBlocks(editor.document, JSON.parse(data)); } catch (e) {}
    }
  }, [editor]);

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      backgroundColor: tema === "light" ? "#ffffff" : "#191919", 
      color: tema === "light" ? "#37352f" : "#d4d4d4",
      fontFamily: "'Inter', sans-serif" 
    }}>
      
      {/* SIDEBAR (Mirip Lovable) */}
      <div style={{ 
        width: "240px", 
        backgroundColor: tema === "light" ? "#f7f7f5" : "#202020", 
        padding: "24px 12px", 
        borderRight: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#91918e", paddingLeft: "12px", letterSpacing: "0.5px" }}>
          WORKSPACE
        </p>
        <div style={{ 
          padding: "8px 12px", 
          backgroundColor: tema === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", 
          borderRadius: "6px", 
          fontSize: "14px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          🎯 My Big Plan
        </div>
        
        <button 
          onClick={() => setTema(tema === "light" ? "dark" : "light")}
          style={{ 
            marginTop: "auto", 
            padding: "8px", 
            fontSize: "12px", 
            cursor: "pointer", 
            borderRadius: "6px", 
            border: "1px solid rgba(0,0,0,0.1)",
            background: "transparent",
            color: "inherit"
          }}
        >
          {tema === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* AREA KONTEN (Putih Bersih) */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "80px 40px" }}>
          <h1 style={{ 
            fontSize: "42px", 
            fontWeight: "800", 
            marginBottom: "20px",
            letterSpacing: "-0.5px"
          }}>
            🎯 My Big Plan
          </h1>
          
          <div style={{ marginLeft: "-45px" }}> {/* Menyesuaikan posisi kursor agar sejajar judul */}
            <BlockNoteView 
              editor={editor} 
              theme={tema} 
              onChange={() => {
                localStorage.setItem("my-bigplan-storage", JSON.stringify(editor.document));
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}