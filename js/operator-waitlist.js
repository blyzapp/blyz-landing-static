(function () {
  const form = document.getElementById("operator-form");
  const status = document.getElementById("operator-status");

  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://blyz-server.onrender.com"; // Render URL here

  function setStatus(msg, type = "info") {
    status.textContent = msg;
    status.classList.remove("error", "success");

    if (type === "error") status.classList.add("error");
    if (type === "success") status.classList.add("success");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("op-name").value.trim();
    const email = document.getElementById("op-email").value.trim();
    const phone = document.getElementById("op-phone").value.trim();
    const vehicle = document.getElementById("op-vehicle").value;

    setStatus("Submitting…");

    try {
      const res = await fetch(`${API_BASE}/api/waitlist/operator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, vehicle }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("You're now on the operator waitlist! ❄️", "success");
        form.reset();
      } else {
        setStatus(data.message || "Something went wrong.", "error");
      }
    } catch (err) {
      setStatus("Network error — try again.", "error");
    }
  });
})();
