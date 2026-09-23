export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Mihin tilaukseni tuotto käytetään?",
    answer:
      "Kakkutukun tuotolla tuetaan Katedralskolanin 750-vuotisjuhlavuotta ja erityisesti Vanhojen Tanssien järjestämistä.",
  },
  {
    question: "Kuinka paljon yksi tuote maksaa?",
    answer:
      "Kaikki Kakkutukun tuotteet maksavat 8 € kappale.",
  },
  {
    question: "Miten teen tilauksen?",
    answer:
      "Valitse haluamasi tuotteet ostoskoriin, siirry tilaukseen ja täytä yhteystietosi. Tilauksen lähettämisen jälkeen saat pian sähköpostiisi vahvistuksen.",
  },
  {
    question: "Tarvitseeko minun luoda käyttäjätili?",
    answer:
      "Ei tarvitse. Tilauksen tekeminen onnistuu ilman kirjautumista.",
  },
  {
    question: "Mitä tietoja tilaukseen tarvitaan?",
    answer:
      "Tarvitsemme nimesi, puhelinnumerosi ja sähköpostiosoitteesi. Voit lisäksi jättää tilaukseen lyhyen viestin.",
  },
  {
    question: "Voinko muuttaa tilaustani jälkikäteen?",
    answer:
      "Jos haluat muuttaa tai perua tilaustasi, ota yhteyttä mahdollisimman pian tilauksen tekemisen jälkeen.",
  },
];