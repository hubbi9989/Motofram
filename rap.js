document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inspectionForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Zbieramy dane z formularza
    const formData = new FormData(form);

    // Funkcja do utworzenia pojedynczego inputa/textarea/select w HTML
    function getFieldHTML(name, value, type = "text") {
      if (type === "textarea") {
        return `<textarea name="${name}">${value || ""}</textarea>`;
      } else if (type === "select") {
        // Select będzie po prostu wartość, bo odtworzenie opcji jest trudne,
        // można to rozszerzyć jeśli chcesz pełne odtworzenie selecta.
        return value || "";
      } else {
        return `<input type="${type}" name="${name}" value="${value || ""}">`;
      }
    }

    // W praktyce zapisujemy formularz jako statyczny html z wartościami w value/textarea
    // Aby uprościć - najpierw pobieramy cały HTML formularza i podmieniamy wartości inputów na wpisane.

    // Pobierz klon formularza:
    const clonedForm = form.cloneNode(true);

    // W formularzu zamieniamy value inputów/textarea/select na wpisane wartości:
    clonedForm.querySelectorAll("input, textarea, select").forEach((el) => {
      const name = el.name;
      const value = formData.get(name) || "";

      if (el.tagName.toLowerCase() === "input") {
        el.setAttribute("value", value);
      } else if (el.tagName.toLowerCase() === "textarea") {
        el.textContent = value;
      } else if (el.tagName.toLowerCase() === "select") {
        // Ustawiamy selected opcję:
        Array.from(el.options).forEach(opt => {
          opt.selected = opt.value === value;
        });
      }
    });

    // Generujemy pełny dokument HTML
    const fullHTML = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Raport oględzin pojazdu - zapis</title>
  <style>
    /* Minimalny styl, możesz rozszerzyć lub załączyć CSS osobno */
    body { font-family: Arial, sans-serif; padding: 20px; }
    label { display: block; margin-top: 10px; }
    input, select, textarea { width: 100%; max-width: 400px; }
    fieldset { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; }
    legend { font-weight: bold; }
    table { border-collapse: collapse; width: 100%; margin-top: 10px; }
    th, td { border: 1px solid #ccc; padding: 5px; text-align: left; }
  </style>
</head>
<body>
  <h1>Raport oględzin pojazdu</h1>
  ${clonedForm.outerHTML}
</body>
</html>
`;

    // Funkcja do pobrania pliku:
    function download(filename, text) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    download("raport_ogledzin_pojazdu.html", fullHTML);
  });
});
