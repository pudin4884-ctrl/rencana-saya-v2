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
      height: "100vh", 
      backgroundColor: tema === "light" ? "#fbfbfa" : "#191919", 
      color: tema === "light" ? "#37352f" : "#d4d4d4",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
    }}>
      
      {/* CSS CUSTOM UNTUK SIDEBAR MOBILE & TAMPILAN PREMIUM */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar-custom { position: fixed; bottom: 0; width: 100% !important; height: 60px !important; flex-direction: row !important; padding: 0 20px !important; z-index: 100; border-top: 1px solid rgba(0,0,0,0.05); border-right: none !important; }
          .sidebar-text, .workspace-label { display: none !important; }
          .content-area { padding-bottom: 80px !important; }
        }
        .bn-editor { padding-inline: 0 !important; }
        .bn-container { background: transparent !important; }
      `}</style>

      {/* SIDEBAR */}
      <div className="sidebar-custom" style={{ 
        width: "260px", 
        backgroundColor: tema === "light" ? "#f7f7f5" : "#202020", 
        padding: "30px 16px", 
        borderRight: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "4px"
      }}>
        <p className="workspace-label" style={{ fontSize: "11px", fontWeight: "600", color: "rgba(55, 53, 47, 0.4)", paddingLeft: "10px", marginBottom: "10px", letterSpacing: "0.5px" }}>WORKSPACE</p>
        
        <div style={{ 
          padding: "8px 10px", 
          backgroundColor: tema === "light" ? "white" : "rgba(255,255,255,0.05)", 
          borderRadius: "6px", 
          fontSize: "14px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          cursor: "pointer"
        }}>
          <span style={{fontSize: "18px"}}>🎯</span>
          <span className="sidebar-text">My Big Plan</span>
        </div>
        
        <button 
          onClick={() => setTema(tema === "light" ? "dark" : "light")}
          style={{ 
            marginTop: "auto", 
            padding: "10px", 
            fontSize: "13px", 
            cursor: "pointer", 
            borderRadius: "8px", 
            border: "1px solid rgba(0,0,0,0.08)",
            backgroundColor: tema === "light" ? "white" : "#2f2f2f",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          {tema === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="content-area" style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 40px" }}>
          
          {/* JUDUL BESAR */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "70px", marginBottom: "10px" }}>🎯</div>
            <h1 style={{ 
              fontSize: "45px", 
              fontWeight: "700", 
              letterSpacing: "-1.2px",
              lineHeight: "1.2",
              outline: "none"
            }} contentEditable suppressContentEditableWarning>
              My Big Plan
            </h1>
          </div>
          
          {/* EDITOR */}
          <div style={{ marginLeft: "-40px" }}>
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