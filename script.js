console.log("✅ JS TERHUBUNG");

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
// 📄 AMBIL FORM
// ============================
const form = document.getElementById("userForm");

// ============================
// 🚀 SUBMIT FORM
// ============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ambil data
  const email = document.getElementById("email").value.trim();
  const nickname = document.getElementById("nickname").value.trim();
  const gender = document.getElementById("gender").value;
  const birthdate = document.getElementById("birthdate").value;

  // validasi sederhana (tanpa notif)
  if (!email || !nickname || !gender || !birthdate) {
    return;
  }

  try {
    const { error } = await supabaseClient
      .from("users")
      .insert([
        {
          email,
          nickname,
          gender,
          birthdate
        }
      ]);

    // ❌ jika gagal → diam
    if (error) {
      console.error("❌ ERROR:", error.message);
      return;
    }

    // ✅ SIMPAN EMAIL (INI YANG PALING PENTING)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("nickname", nickname);

    // 🔥 REDIRECT KE HALAMAN CARA
    window.location.href = "cara.html";

  } catch (err) {
    console.error("🔥 ERROR BESAR:", err);
  }
});

// ============================
// 🎨 ANIMASI LOGO
// ============================
window.addEventListener("load", () => {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.style.transform = "rotate(360deg)";
    logo.style.transition = "1s";
  }
});