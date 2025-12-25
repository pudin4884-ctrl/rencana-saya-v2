"use client";
import { useState, useEffect } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

// Komponen Kalender Sederhana tapi Estetik
const KalenderMini = ({ tema }: { tema: string }) => {
  const hariIni = new Date();
  const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const namaHari = ["M", "S", "S", "R", "K", "J", "S"];
  
  return (
    <div style={{
      padding: "20px",
      backgroundColor: tema === "light" ? "white" : "#252525",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      marginBottom: "30px",
      border: "1px solid rgba(0,0,0,0.05)"
    }}>
      <div style={{ fontWeight: "700", marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
        <span>{namaBulan[hariIni.getMonth()]} {hariIni.getFullYear()}</span>
        <span style={{ color: "#eb5757" }}>Hari ini</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", textAlign: "center", fontSize: "12px" }}>
        {namaHari.map(h => <div key={h} style={{ fontWeight: "600", color: "#91918e" }}>{h}</div>)}
        {[...Array(31)].map((_, i) => (
          <div key={i} style={{
            padding: "8px 0",
            borderRadius: "6px",
            backgroundColor: (i + 1) === hariIni.getDate() ? "#eb5757" : "transparent",
            color: (i + 1) === hariIni.getDate() ? "white" : "inherit",
            fontWeight: (i + 1) === hariIni.getDate() ? "700" : "400"
          }}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

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
      fontFamily: "-apple-system, sans-serif" 
    }}>
      
      <style>{`
        @media (max-width: 768px) {
          .sidebar-custom { display: none !important; }
          .content-area { padding: 40px 20px !important; }
        }
      `}</style>

      {/* SIDEBAR */}
      <div className="sidebar-custom" style={{ 
        width: "300px", 
        backgroundColor: tema === "light" ? "#f7f7f5" : "#202020", 
        padding: "24px", 
        borderRight: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#91918e", letterSpacing: "1px" }}>DASHBOARD</p>
        
        {/* Kalender di Sidebar */}
        <KalenderMini tema={tema} />

        <div style={{ marginTop: "auto" }}>
          <button 
            onClick={() => setTema(tema === "light" ? "dark" : "light")}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", background: tema === "light" ? "white" : "#333", color: "inherit" }}
          >
            {tema === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </div>

      {/* AREA KONTEN */}
      <div className="content-area" style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 40px" }}>
          <div style={{ fontSize: "60px" }}>🎯</div>
          <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "30px", letterSpacing: "-1.5px" }}>My Big Plan</h1>
          
          <div style={{ marginLeft: "-45px" }}>
            <BlockNoteView 
              editor={editor} 
              theme={tema} 
              onChange={() => localStorage.setItem("my-bigplan-storage", JSON.stringify(editor.document))} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}