export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Mihin tilaukseni tuotto käytetään?",
    answer:
      "Kakkutukun tuotolla tuetaan Katedralskolanin Vanhojen Tanssien järjestämistä.",
  },
  {
    question: "Kuinka paljon yksi tuote maksaa?",
    answer:
      "Kaikki Kakkutukun tuotteet maksavat 8 € / kappale. Toimitus on hinnoitettu sijainnin mukaan.",
  },
  {
    question: "Miten teen tilauksen?",
    answer:
      "Valitse haluamasi tuotteet ostoskoriin, siirry tilaukseen ja täytä yhteystietosi. Tilauksen lähettämisen jälkeen saat pian sähköpostiisi vahvistuksen.",
  },
  {
    question: "Tarvitsenko luoda käyttäjätilin?",
    answer:
      "Ei tarvitse. Tilauksen tekeminen onnistuu ilman kirjautumista.",
  },
  {
    question: "Mitä tietoja tilaukseen tarvitaan?",
    answer:
      "Tarvitsemme nimesi, puhelinnumerosi, sähköpostiosoitteesi, osoitteesi ja alueesi. Voit lisäksi jättää tilaukseen lyhyen viestin.",
  },
  {
    question: "Voinko muuttaa tilaustani jälkikäteen?",
    answer:
      "Jos haluat muuttaa tai perua tilaustasi, ota yhteyttä mahdollisimman pian tilauksen tekemisen jälkeen sähkopostitse osoitteeseen arthur.lagerlof@abo.fi tai puhelimitse 040 634 7109.",
  },
];