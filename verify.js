// Konwersja mocy KM na kW (1 KM = 0.7355 kW)
const mocKM = document.getElementById('mocKM');
const mocKW = document.getElementById('mocKW');

mocKM.addEventListener('input', () => {
  const km = Number(mocKM.value);
  if (!isNaN(km)) {
    const kw = Math.round(km * 0.7355); // przelicz i zaokrąglij
    mocKW.value = kw;
  } else {
    mocKW.value = '';
  }
});

// Funkcja zbierająca dane z formularza i generująca plik HTML do pobrania
function saveDataAsHTML() {
  const form = document.getElementById("equipForm");
  const formData = new FormData(form);

  // Zamieniam checkboxy z tymi samymi nazwami na tablice wartości
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (key.endsWith("[]")) {
      // Tablica checkboxów (np. audio[], komfort[], itd)
      const baseKey = key.slice(0, -2);
      if (!data[baseKey]) data[baseKey] = [];
      data[baseKey].push(value);
    } else {
      data[key] = value;
    }
  }

  // Funkcja tworząca listę z wartości checkboxów lub "-" jeśli pusta
  function formatArray(arr) {
    if (!arr || arr.length === 0) return "-";
    return "<ul>" + arr.map(item => `<li>${item}</li>`).join("") + "</ul>";
  }

  // Tworzymy prosty HTML z wypełnionymi danymi
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <title>Dane wyposażenia pojazdu</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      h1 { text-align: center; }
      table { border-collapse: collapse; width: 100%; max-width: 800px; margin: auto; }
      td, th { border: 1px solid #ccc; padding: 8px; vertical-align: top; }
      th { background-color: #f0f0f0; text-align: left; width: 250px; }
      ul { margin: 0; padding-left: 20px; }
    </style>
  </head>
  <body>
    <h1>Dane wyposażenia pojazdu</h1>
    <table>
      <tbody>
        <tr><th>Marka</th><td>${data.marka || "-"}</td></tr>
        <tr><th>Model</th><td>${data.model || "-"}</td></tr>
        <tr><th>Wersja</th><td>${data.wersja || "-"}</td></tr>
        <tr><th>Generacja</th><td>${data.generacja || "-"}</td></tr>
        <tr><th>Dodatkowy pakiet stylistyczny</th><td>${data.pakiet_stylistyczny || "-"}</td></tr>
        <tr><th>Rodzaj pojazdu</th><td>${data.rodzaj_pojazdu || "-"}</td></tr>
        <tr><th>Typ nadwozia</th><td>${data.typ_nadwozia || "-"}</td></tr>
        <tr><th>Rodzaj paliwa</th><td>${data.rodzaj_paliwa || "-"}</td></tr>
        <tr><th>AdBlue</th><td>${data.adblue || "-"}</td></tr>
        <tr><th>Rok produkcji</th><td>${data.rok_produkcji || "-"}</td></tr>
        <tr><th>VIN</th><td>${data.vin || "-"}</td></tr>
        <tr><th>Przebieg (km)</th><td>${data.przebieg || "-"}</td></tr>
        <tr><th>Pojemność silnika (cm³)</th><td>${data.pojemnosc_silnika || "-"}</td></tr>
        <tr><th>Kod silnika</th><td>${data.kod_silnika || "-"}</td></tr>
        <tr><th>Moc silnika (KM)</th><td>${data.moc_silnika || "-"}</td></tr>
        <tr><th>Moc silnika (kW)</th><td>${data.moc_kw || "-"}</td></tr>
        <tr><th>Skrzynia biegów</th><td>${data.skrzynia_biegow || "-"}</td></tr>
        <tr><th>Napęd</th><td>${data.naped || "-"}</td></tr>
        <tr><th>Auto uszkodzone</th><td>${data.auto_uszkodzone || "-"}</td></tr>
        <tr><th>Pojazd importowany</th><td>${data.pojazd_importowany || "-"}</td></tr>
        <tr><th>Numer rejestracyjny</th><td>${data.nr_rejestracyjny || "-"}</td></tr>
        <tr><th>Data pierwszej rejestracji</th><td>${data.data_pierwszej_rejestracji || "-"}</td></tr>
        <tr><th>Liczba drzwi</th><td>${data.liczba_drzwi || "-"}</td></tr>
        <tr><th>Liczba miejsc</th><td>${data.liczba_miejsc || "-"}</td></tr>
        <tr><th>Liczba właścicieli</th><td>${data.liczba_wlascicieli || "-"}</td></tr>
        <tr><th>Ilość kluczyków</th><td>${data.ilosc_kluczykow || "-"}</td></tr>
        <tr><th>Auto serwisowane</th><td>${data.auto_serwisowane || "-"}</td></tr>
        <tr><th>Kraj pochodzenia</th><td>${data.kraj_pochodzenia || "-"}</td></tr>
        <tr><th>Auto zarejestrowane</th><td>${data.auto_zarejestrowane || "-"}</td></tr>
        <tr><th>Ubezpieczenie do</th><td>${data.ubezpieczenie_do || "-"}</td></tr>
        <tr><th>Kolor nadwozia</th><td>${data.kolor_nadwozia || "-"}</td></tr>
        <tr><th>Kod lakieru</th><td>${data.kod_lakieru || "-"}</td></tr>
        <tr><th>Rozmiar kół</th><td>${data.rozmiar_kol || "-"}</td></tr>

        <tr><th>Producent nagłośnienia</th><td>${data.producent_naglosnienia || "-"}</td></tr>

        <tr><th>Audio i multimedia</th><td>${formatArray(data.audio)}</td></tr>
        <tr><th>Komfort</th><td>${formatArray(data.komfort)}</td></tr>
        <tr><th>Auta elektryczne</th><td>${formatArray(data.elektryczne)}</td></tr>
        <tr><th>Bezpieczeństwo</th><td>${formatArray(data.bezpieczenstwo)}</td></tr>
        <tr><th>Oświetlenie</th><td>${formatArray(data.oswietlenie)}</td></tr>
      </tbody>
    </table>
  </body>
  </html>
  `;

  // Tworzymy Blob i "klikamy" link do pobrania
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "dane_wyposazenia.html";
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
