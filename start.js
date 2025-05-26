document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");
    if (link) {
      card.classList.add("clicked");
      setTimeout(() => {
        window.location.href = link;
      }, 150);
    }
  });
});
