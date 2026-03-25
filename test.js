document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ TEST.JS JALAN");

  // ============================
  // 🔐 SUPABASE CONFIG
  // ============================
  const SUPABASE_URL = "https://xwzlsxvbnsumhuurfppj.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emxzeHZibnN1bWh1dXJmcHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTAzODMsImV4cCI6MjA4OTkyNjM4M30.DPS3aaH3fkcyzFD5U6whIRpiB2KLF4NucLEGPHFLAB0";

  const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  // ============================
  // 🔒 CEK EMAIL
  // ============================
  const email = localStorage.getItem("userEmail");

  console.log("📧 EMAIL:", email);

  if (!email) {
    console.error("❌ EMAIL TIDAK ADA");
    window.location.href = "index.html";
    return;
  }

  // ============================
  // 📄 AMBIL FORM
  // ============================
  const form = document.getElementById("testForm");

  if (!form) {
    console.error("❌ FORM TIDAK DITEMUKAN");
    return;
  }

  // ============================
  // 🚀 SUBMIT
  // ============================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("📤 SUBMIT DIKLIK");

    // ambil jawaban
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.getElementById("q3").value;
    const q4 = document.getElementById("q4").value;
    const q5 = document.getElementById("q5").value;
    const q6 = document.getElementById("q6").value;
    const q7 = document.getElementById("q7").value;
    const q8 = document.getElementById("q8").value;
    const q9 = document.getElementById("q9").value;
    const q10 = document.getElementById("q10").value;

    const answers = {
      q1, q2, q3, q4, q5,
      q6, q7, q8, q9, q10
    };

    console.log("🧠 JAWABAN:", answers);

    try {

      // ============================
      // 💾 SIMPAN KE DATABASE
      // ============================
      const { error } = await supabaseClient
        .from("answers")
        .insert([
          {
            email,
            ...answers
          }
        ]);

      if (error) {
        console.error("❌ GAGAL SIMPAN:", error.message);
        alert("Gagal menyimpan jawaban");
        return;
      }

      console.log("✅ DATA MASUK DATABASE");

      // ============================
      // 🎉 LANGSUNG SELESAI (FETCH DIHAPUS)
      // ============================
      window.location.href = "finish.html";

    } catch (err) {
      console.error("🔥 ERROR BESAR:", err);
      alert("Terjadi error, cek console");
    }

  });

});