"use client";
import { useState, useEffect } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function Editor() {
  const [tema, setTema] = useState<"light" | "dark">("light");
  const editor: any = useCreateBlockNote();

  useEffect(() => {
    const data = localStorage.getItem("my-bigplan-storage");
    if (data && editor) {
      try { editor.replaceBlocks(editor.document, JSON.parse(data)); } catch (e) {}
    }
  }, [editor]);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "row", // Default menyamping untuk laptop
      height: "100vh", 
      backgroundColor: tema === "light" ? "#ffffff" : "#191919", 
      color: tema === "light" ? "#37352f" : "#d4d4d4",
      fontFamily: "'Inter', sans-serif" 
    }}>
      
      {/* SIDEBAR RESPONSIF */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar-custom { width: 60px !important; padding: 20px 5px !important; }
          .sidebar-text { display: none; } /* Sembunyikan tulisan di HP agar tidak sempit */
          .content-area { padding: 40px 20px !important; }
          .title-text { fontSize: 28px !important; }
        }
      `}</style>

      <div className="sidebar-custom" style={{ 
        width: "240px", 
        backgroundColor: tema === "light" ? "#f7f7f5" : "#202020", 
        padding: "24px 12px", 
        borderRight: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "width 0.3s"
      }}>
        <p className="sidebar-text" style={{ fontSize: "11px", fontWeight: "700", color: "#91918e", paddingLeft: "12px", letterSpacing: "0.5px" }}>
          WORKSPACE
        </p>
        <div style={{ 
          padding: "8px 12px", 
          backgroundColor: tema === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", 
          borderRadius: "6px", 
          fontSize: "14px",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          🎯 <span className="sidebar-text" style={{marginLeft: "8px"}}>My Plan</span>
        </div>
        
        <button 
          onClick={() => setTema(tema === "light" ? "dark" : "light")}
          style={{ 
            marginTop: "auto", 
            padding: "8px", 
            cursor: "pointer", 
            borderRadius: "6px", 
            border: "1px solid rgba(0,0,0,0.1)",
            background: "transparent",
            color: "inherit"
          }}
        >
          {tema === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* AREA KONTEN */}
      <div className="content-area" style={{ flex: 1, overflowY: "auto", padding: "60px 40px" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <h1 className="title-text" style={{ fontSize: "42px", fontWeight: "800", marginBottom: "20px" }}>
            🎯 My Big Plan
          </h1>
          <div style={{ marginLeft: "-10px" }}> 
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