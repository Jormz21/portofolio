const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("status-message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const response = await fetch("https://formspree.io/f/xvgqoeag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      statusMessage.textContent = "✅ Pesan berhasil dikirim!";
      statusMessage.style.color = "lightgreen";
      form.reset();
    } else {
      const errorData = await response.json();
      statusMessage.textContent = "❌ Gagal mengirim: " + (errorData.message || "Error tidak diketahui.");
      statusMessage.style.color = "red";
    }
  } catch (error) {
    statusMessage.textContent = "⚠️ Koneksi gagal.";
    statusMessage.style.color = "orange";
  }
});
