export interface HistoryImageCredit {
  creator?: string;
  title?: string;
  source: string;
  sourceUrl?: string;
  rights: string;
}

export interface HistoryEvent {
  year: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  imageCredit?: HistoryImageCredit;
}

export const historyEvents: HistoryEvent[] = [
  {
    year: "1276",
    title: "Alku",
    text: "Katedralskolanin katsotaan saaneen alkunsa vuonna 1276 Turun tuomiokapitulin yhteydessä. Keskiaikaisen katedraalikoulun tehtävänä oli kouluttaa poikia kirkon palvelukseen.",
    image: "/history/1276_turku_non_historical_painting_self_made_no_attribution.jpeg",
    imageAlt: "Taiteellinen tulkinta keskiaikaisesta Turusta ja Turun tuomiokirkon ympäristöstä.",
  },
  {
    year: "1326",
    title: "Ensimmäiset jäljet",
    text: "Vuodelta 1326 tunnetaan maininta koulusta. Katedralskolanista kasvoi vuosisatojen aikana Turun hiippakunnalle ja koko Suomelle merkittävä oppilaitos.",
    image: "/history/1300s_katedralskolan_self_made_no_attribution.jpeg",
    imageAlt: "Taiteellinen tulkinta keskiaikaisesta katedraalikoulusta.",
  },
  {
    year: "1400-luku",
    title: "Koulumuurin suojassa",
    text: "1400-luvun lopulta lähtien koulurakennus sijaitsi Turun tuomiokirkkoa ympäröineessä muurissa. Koulupäivä oli pitkä, ja opetuksessa korostuivat latina, kielioppi ja retoriikka.",
    image: "/history/1400s_cathedral_watercolour.jpeg",
    imageAlt: "Turun tuomiokirkko ja silta Aurajoen yli 1400-luvulla. Akvarelli oppilaan tekemä.",
  },
  {
    year: "1539",
    title: "Mikael Agricola",
    text: "Mikael Agricola toimi Katedralskolanin rehtorina vuosina 1539–1548. Hänet tunnetaan Suomen kirjakielen kehittäjänä ja uskonpuhdistajana.",
    image: "/history/Mikael_Agricola_by_Albert_Edelfelt.jpg",
    imageAlt: "Mikael Agricola, Albert Edelfelt.",
    imageCredit: {
      creator: "Albert Edelfelt",
      title: "Mikael Agricola",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Mikael_Agricola_by_Albert_Edelfelt.jpg",
      rights: "Public domain",
    },
  },
  {
    year: "1600-luku",
    title: "Koulutuksen muutos",
    text: "Koulua uudistettiin Ruotsin valtakunnan koulutusjärjestelmän mukana. Vuonna 1630 katedraalikoulu muutettiin gymnaasiksi, ja vuonna 1640 Turun Akatemia perustettiin.",
    image:
      "/history/Albert_Edelfelt_-_Inauguration_of_the_Academy_in_Turku_1640,_Alternative_Entry_for_the_Competition_-_A_III_2011_-_Finnish_National_Galle.jpg",
    imageAlt:
      "Albert Edelfeltin maalaus Turun Akatemian vihkiäisistä vuonna 1640.",
    imageCredit: {
      creator: "Albert Edelfelt",
      title:
        "Inauguration of the Academy in Turku 1640, Alternative Entry for the Competition",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Albert_Edelfelt_-_Inauguration_of_the_Academy_in_Turku_1640,_Alternative_Entry_for_the_Competition_-_A_III_2011_-_Finnish_National_Galle.jpg",
      rights: "CC0 / Public domain",
    },
  },
  {
    year: "1827",
    title: "Turun palo",
    text: "Turun suuri palo muutti kaupungin ja koulun historian. Palon jälkeen koulun oppilaat siirrettiin Raumalle, missä opetus jatkui muutaman vuoden ajan.",
    image: "/history/Turku_1827_after_Great_Fire.jpg",
    imageAlt:
      "Turku talvella 1827 Turun suuren palon jälkeen.",
    imageCredit: {
      title: "Turku 1827 after Great Fire",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Turku_1827_after_Great_Fire.jpg",
      rights: "Public domain",
    },
  },
  {
    year: "1830",
    title: "Uusi alku",
    text: "Vuonna 1830 Turun koululaitos järjestettiin uudelleen. Katedralskolanista tuli trivialikoulu, ja vuonna 1841 se sai nimen Högre elementarskolan.",
    image: "/history/Turku_ennen_paloa.jpg",
    imageAlt: "Turku ennen vuoden 1827 suurta paloa.",
    imageCredit: {
      source: "Historiallinen kuva-aineisto",
      rights: "Public domain",
    },
  },
  {
    year: "1872",
    title: "Classicum",
    text: "Högre elementarskolan ja Turun gymnasium yhdistyivät Svenska klassiska lyceumiksi eli Classicumiksi. Koulun historia jatkui uuden nimen alla.",
    image: "/history/Proffesorer_vid_abo_akademi.jpg",
    imageAlt: "Professoreita Åbo Akademin historiallisessa kuvassa.",
    imageCredit: {
      source: "Historiallinen kuva-aineisto",
      rights: "Public domain",
    },
  },
  {
    year: "1971",
    title: "Yhteinen koulu",
    text: "Svenska klassiska lyceum ja Åbo svenska flicklyceum yhdistettiin yhteislyseoksi. Näin Katedralskolanin historiaan tuli uusi luku myös yhteisenä tyttöjen ja poikien kouluna.",
  },
  {
    year: "1975",
    title: "Katedralskolan i Åbo",
    text: "Katedralskolan i Åbo -nimi otettiin jälleen käyttöön. Seuraavana vuonna lukio siirtyi omaksi kouluyksikökseen peruskoulu-uudistuksen yhteydessä.",
  },
  {
    year: "2026",
    title: "750 vuotta",
    text: "Katedralskolan juhlii 750-vuotista historiaansa. Vuoden 2027 alussa järjestetään vanhojen tanssit.",
    image: "/history/2026_dance_lift_dirty_dancing.png",
    imageAlt: "Vanhojen Tanssien tanssipari nostossa",
  },
];