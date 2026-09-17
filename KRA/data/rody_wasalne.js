const rodyWasalneDb = [
  // ==========================================================================
  // GRUPA 1: LENNA I PROWINCJE WIELKIEGO RODU ŚWINKÓW
  // ==========================================================================
  {
    isDivider: true,
    html: `
      <div style="margin: 28px 0 14px 0; padding: 12px 18px; background: linear-gradient(90deg, #0f2d4a 0%, #1e4a75 100%); color: #ffffff; border-radius: 4px; border-left: 6px solid #d4af37; box-shadow: 0 2px 4px rgba(0,0,0,0.08); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85;">Wasalitet Regionalny</span>
          <strong style="font-size: 16px; letter-spacing: 0.5px;">Lenna Wielkiego Rodu Świnków</strong>
        </div>
        <span style="font-size: 12px; font-style: italic; opacity: 0.9;">Suzeren: Diuk Bolszewicki Tata Świnka</span>
      </div>
    `
  },

  // 1. MARKIZ ZIELONOGRODU ŚWIDNICKIEGO
  {
    title: "Markiz Zielonogrodu Świdnickiego",
    ranga: "Markiz",
    kategoriaRodu: "Ród Przysięgły",
    koronaImg: "../KRA/korona markiza.png",
    n11_title: "Markiz Zielonogrodu Świdnickiego",
    n12_creationOrder: "Postanowienie Krula Multikont nr 12/T/2026 z dnia 24.02.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Markiz",
    n15_territory: "Miasto szlacheckie Zielonogród Świdnicki (urząd Burgrabiego Miejskiego Zielonogrodu Świdnickiego)",
    n16_publicEstate: "Urząd Burgrabiego Miasta Szlacheckiego Zielonogród Świdnicki",
    n17_businessEstate: "Dobra ziemskie i plantacje ekologiczne Zielonogrodu (45 ha) w Księstwie Świnków",
    n18_publicLegalBasis: "Art. 11 ust. 5 oraz art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Złoty sygnet ze szmaragdem",
    n110_dates: "24.02.2026 r./nie dotyczy",
    n21_holderName: "Ekologiczny Tata Świnka",
    n22_grantOrder: "Postanowienie Krula Multikont nr 17/N/2026 z dnia 25.02.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Feministyczny Tata Świnka",
    n25_individualPrivileges: "Prawo zasiadania w Senacie Koronnym",
    n31_usedHerbImg: "../KRA/herb_pozo3.png",
    n31_usedHerbDesc: "Biało-czarny lemur ze złotymi oczami na tle zielonej tarczy. Nad tarczą herbową znajduje się korona rangowa markiza.",
    n32_usageTitle: "Markiz",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Przysięgły (głowa rodu w randze Markiza)",
    n42_vassalStatus: "Wasal Księstwa Świnków. Akt Hołdu złożony przed Diukiem Bolszewickim Tatą Świnką w Świdniku w dniu 25.02.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: "../KRA/herb_os_poz3.png",
    n43_houseHerbDesc: "Biało-czarny lemur ze złotymi oczami na tle zielonej tarczy.",
    n44_houseMembers: [
      "Ekologiczny Tata Świnka",
      "Feministyczny Tata Świnka"
    ],
    n45_houseSeat: "Pałac Ekologiczny w Zielonogrodzie Świdnickim"
  },

  // 2. HRABIA ZACISZA PRYZMATYCZNEGO
  {
    title: "Hrabia Zacisza Pryzmatycznego",
    ranga: "Hrabia",
    kategoriaRodu: "Ród Przysięgły",
    koronaImg: "../KRA/korona hrabiego.png",
    n11_title: "Hrabia Zacisza Pryzmatycznego",
    n12_creationOrder: "Postanowienie Krula Multikont nr 19/T/2026 z dnia 18.09.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Hrabia",
    n15_territory: "Miasto szlacheckie Zacisze Pryzmatyczne (urząd Burgrabiego Miejskiego Zacisza Pryzmatycznego)",
    n16_publicEstate: "Urząd Burgrabiego Miasta Szlacheckiego Zacisze Pryzmatyczne",
    n17_businessEstate: "Posiadłość ziemska i dobra wytwórcze w Zaciszu Pryzmatycznym",
    n18_publicLegalBasis: "Art. 11 ust. 5 oraz art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Złoty sygnet z szafirem",
    n110_dates: "18.09.2026 r./nie dotyczy",
    n21_holderName: "Nacjonalistyczny Tata Świnka",
    n22_grantOrder: "Postanowienie Krula Multikont nr 23/N/2026 z dnia 18.09.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Brak",
    n25_individualPrivileges: "Brak",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak zarejestrowanego wzoru herbu",
    n32_usageTitle: "Hrabia",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Przysięgły (głowa rodu w randze Hrabiego)",
    n42_vassalStatus: "Wasal Księstwa Świnków. Akt Hołdu złożony przed Diukiem Bolszewickim Tatą Świnką w dniu 18.09.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Nacjonalistyczny Tata Świnka"
    ],
    n45_houseSeat: "Pałac w Zaciszu Pryzmatycznym"
  },

  // 3. HRABIA ŚWIDNICKI
  {
    title: "Hrabia Świdnicki",
    ranga: "Hrabia",
    kategoriaRodu: "Ród Przysięgły",
    koronaImg: "../KRA/korona hrabiego.png",
    n11_title: "Hrabia Świdnicki",
    n12_creationOrder: "Postanowienie Krula Multikont nr 8/T/2026 z dnia 24.02.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Hrabia",
    n15_territory: "Miasto szlacheckie Świdnik (urząd Burgrabiego Miejskiego Świdnika)",
    n16_publicEstate: "Urząd Burgrabiego Miasta Szlacheckiego Świdnik",
    n17_businessEstate: "Nieruchomość ziemska o wielkości 30 ha, położona w gminie Świdnik wraz z folwarkiem rolnym",
    n18_publicLegalBasis: "Art. 11 ust. 5 oraz art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Złoty sygnet z szafirem",
    n110_dates: "24.02.2026 r./nie dotyczy",
    n21_holderName: "Militarno-radziecki Wujek Świnka",
    n22_grantOrder: "Postanowienie Krula Multikont nr 14/N/2026 z dnia 25.02.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Ludowo-socjalistyczny Wujek Świnka",
    n25_individualPrivileges: "Brak",
    n31_usedHerbImg: "../KRA/herb_pozo2.png",
    n31_usedHerbDesc: "Czerwona świnka ze złotą gwiazdą na tułowiu stojąca na dwóch tylnych raciczkach, zwrócona w lewo, na tle bordowej tarczy. Nad tarczą korona rangowa hrabiego.",
    n32_usageTitle: "Hrabia",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Przysięgły (głowa rodu w randze Hrabiego)",
    n42_vassalStatus: "Wasal Księstwa Świnków. Akt Hołdu złożony przed Diukiem Bolszewickim Tatą Świnką w dniu 25.02.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: "../KRA/herb_os_poz2.png",
    n43_houseHerbDesc: "Czerwona świnka ze złotą gwiazdą na tułowiu stojąca na dwóch tylnych raciczkach, zwrócona w lewo, na tle bordowej tarczy.",
    n44_houseMembers: [
      "Militarno-radziecki Wujek Świnka",
      "Ludowo-socjalistyczny Wujek Świnka"
    ],
    n45_houseSeat: "Dwór Hrabstwa Świdnickiego"
  },

  // 4. BARON PROWINCJI DOLNOŚWIDNICKIEJ
  {
    title: "Baron Prowincji Dolnoświdnickiej",
    ranga: "Baron",
    kategoriaRodu: "Ród Ziemski",
    koronaImg: "../KRA/korona barona.png",
    n11_title: "Baron Prowincji Dolnoświdnickiej",
    n12_creationOrder: "Postanowienie Krula Multikont nr 18/T/2026 z dnia 18.09.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Baron",
    n15_territory: "Prowincja Dolnoświdnicka (urząd Burgrabiego Prowincji Dolnoświdnickiej)",
    n16_publicEstate: "Siedziba Urzędu Prowincji Dolnoświdnickiej",
    n17_businessEstate: "Majątek ziemski i dobra rolne Prowincji Dolnoświdnickiej",
    n18_publicLegalBasis: "Art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Srebrny sygnet z topazem",
    n110_dates: "18.09.2026 r./nie dotyczy",
    n21_holderName: "Kapitalistyczny Tata Świnka",
    n22_grantOrder: "Postanowienie Krula Multikont nr 22/N/2026 z dnia 18.09.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Brak",
    n25_individualPrivileges: "Brak",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak zarejestrowanego wzoru herbu",
    n32_usageTitle: "Baron",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Ziemski (głowa rodu w randze Barona)",
    n42_vassalStatus: "Wasal Księstwa Świnków. Akt Hołdu złożony przed Diukiem Bolszewickim Tatą Świnką w dniu 18.09.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Kapitalistyczny Tata Świnka"
    ],
    n45_houseSeat: "Zamek Prowincjonalny Świdnik Dolny"
  },

  // 5. BARON PROWINCJI ZŁOTOKŁOSKIEJ
  {
    title: "Baron Prowincji Złotokłoskiej",
    ranga: "Baron",
    kategoriaRodu: "Ród Ziemski",
    koronaImg: "../KRA/korona barona.png",
    n11_title: "Baron Prowincji Złotokłoskiej",
    n12_creationOrder: "Postanowienie Krula Multikont nr 20/T/2026 z dnia 18.09.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Baron",
    n15_territory: "Prowincja Złotokłoska (urząd Burgrabiego Prowincji Złotokłoskiej)",
    n16_publicEstate: "Siedziba Urzędu Prowincji Złotokłoskiej",
    n17_businessEstate: "Ziemie uprawne i spichlerze zbożowe Prowincji Złotokłoskiej",
    n18_publicLegalBasis: "Art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Srebrny sygnet z topazem",
    n110_dates: "18.09.2026 r./nie dotyczy",
    n21_holderName: "Żydowski Tata Świnka",
    n22_grantOrder: "Postanowienie Krula Multikont nr 24/N/2026 z dnia 18.09.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Brak",
    n25_individualPrivileges: "Brak",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak zarejestrowanego wzoru herbu",
    n32_usageTitle: "Baron",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Ziemski (głowa rodu w randze Barona)",
    n42_vassalStatus: "Wasal Księstwa Świnków. Akt Hołdu złożony przed Diukiem Bolszewickim Tatą Świnką w dniu 18.09.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Żydowski Tata Świnka"
    ],
    n45_houseSeat: "Twierdza Złotokłos"
  },

  // 6. BARON PROWINCJI STARORUDZKIEJ
  {
    title: "Baron Prowincji Starorudzkiej",
    ranga: "Baron",
    kategoriaRodu: "Ród Ziemski",
    koronaImg: "../KRA/korona barona.png",
    n11_title: "Baron Prowincji Starorudzkiej",
    n12_creationOrder: "Postanowienie Krula Multikont nr 21/T/2026 z dnia 18.09.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Baron",
    n15_territory: "Prowincja Starorudzka (urząd Burgrabiego Prowincji Starorudzkiej)",
    n16_publicEstate: "Siedziba Urzędu Prowincji Starorudzkiej",
    n17_businessEstate: "Złoża rudy i dobra ziemskie Starorudzkie",
    n18_publicLegalBasis: "Art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Srebrny sygnet z topazem",
    n110_dates: "18.09.2026 r./nie dotyczy",
    n21_holderName: "Tęczowy Tata Świnka",
    n22_grantOrder: "Postanowienie Krula Multikont nr 25/N/2026 z dnia 18.09.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Brak",
    n25_individualPrivileges: "Brak",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak zarejestrowanego wzoru herbu",
    n32_usageTitle: "Baron",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Ziemski (głowa rodu w randze Barona)",
    n42_vassalStatus: "Wasal Księstwa Świnków. Akt Hołdu złożony przed Diukiem Bolszewickim Tatą Świnką w dniu 18.09.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Tęczowy Tata Świnka"
    ],
    n45_houseSeat: "Dwór Starorudzki"
  },

// ==========================================================================
  // GRUPA 2: LENNA I PROWINCJE WIELKIEGO RODU STRIGALLORÓW
  // ==========================================================================
  {
    isDivider: true,
    html: `
      <div style="margin: 28px 0 14px 0; padding: 12px 18px; background: linear-gradient(90deg, #0f2d4a 0%, #1e4a75 100%); color: #ffffff; border-radius: 4px; border-left: 6px solid #d4af37; box-shadow: 0 2px 4px rgba(0,0,0,0.08); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85;">Wasalitet Regionalny</span>
          <strong style="font-size: 16px; letter-spacing: 0.5px;">Lenna Wielkiego Rodu Strigallorów</strong>
        </div>
        <span style="font-size: 12px; font-style: italic; opacity: 0.9;">Suzeren: Diuk Puchacz Potężny</span>
      </div>
    `
  },

  // 1. MARKIZ GANOZEWSZA
  {
    title: "Markiz Ganozewsza",
    ranga: "Markiz",
    kategoriaRodu: "Ród Przysięgły",
    koronaImg: "../KRA/korona markiza.png",
    n11_title: "Markiz Ganozewsza",
    n12_creationOrder: "Postanowienie Krula Multikont nr 22/T/2026 z dnia 18.09.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Markiz",
    n15_territory: "Miasto szlacheckie Ganozewsze (urząd Burgrabiego Miejskiego Ganozewsza)",
    n16_publicEstate: "Urząd Burgrabiego Miasta Szlacheckiego Ganozewsze oraz Dwór w Ganozewszu",
    n17_businessEstate: "Winnice i plantacje winorośli w Ganozewszu",
    n18_publicLegalBasis: "Art. 11 ust. 5 oraz art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Złoty sygnet ze szmaragdem",
    n110_dates: "18.09.2026 r./nie dotyczy",
    n21_holderName: "Galbrannor",
    n22_grantOrder: "Postanowienie Krula Multikont nr 26/N/2026 z dnia 18.09.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Brak",
    n25_individualPrivileges: "Prawo zasiadania w Senacie Koronnym",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak zarejestrowanego wzoru herbu",
    n32_usageTitle: "Markiz",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Przysięgły (głowa rodu w randze Markiza)",
    n42_vassalStatus: "Wasal Księstwa Strigallorów. Akt Hołdu złożony przed Diukiem Puchaczem Potężnym w Sowigrodzie w dniu 18.09.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Galbrannor"
    ],
    n45_houseSeat: "Dwór w Ganozewszu"
  },

   // 2. MARKIZ POGRANICZA SOWIEGO
  {
    title: "Markiz Pogranicza Sowiego",
    ranga: "Markiz",
    kategoriaRodu: "Ród Przysięgły",
    koronaImg: "../KRA/korona markiza.png",
    n11_title: "Markiz Pogranicza Sowiego",
    n12_creationOrder: "Postanowienie Krula Multikont nr 9/T/2026 z dnia 25.02.2026 r. (ze zm. z 18.09.2026 r.)",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Markiz",
    n15_territory: "Prowincja Pogranicze Sowie (urząd Burgrabiego Prowincji)",
    n16_publicEstate: "Siedziba Urzędu Prowincji Pogranicza Sowiego w Stanicy Pogranicza",
    n17_businessEstate: "Winnica i strażnica graniczna Pogranicza Sowiego",
    n18_publicLegalBasis: "Art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Złoty sygnet ze szmaragdem",
    n110_dates: "25.02.2026 r./nie dotyczy",
    n21_holderName: "Athaurion",
    n22_grantOrder: "Postanowienie Krula Multikont nr 15/N/2026 z dnia 25.02.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Valquintor",
    n25_individualPrivileges: "Prawo poboru myta granicznego na rzecz rodu zwierzchniego",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak zarejestrowanego wzoru herbu",
    n32_usageTitle: "Markiz",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Przysięgły (głowa rodu w randze Markiza)",
    n42_vassalStatus: "Wasal Księstwa Strigallorów. Akt Hołdu złożony przed Diukiem Puchaczem Potężnym w Sowigrodzie w dniu 25.02.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Athaurion",
      "Valquintor"
    ],
    n45_houseSeat: "Stanica Pogranicza"
  },

  // 3. HRABINA WYŻYN PÓŁNOCNYCH
  {
    title: "Hrabina Wyżyn Północnych",
    ranga: "Hrabia",
    kategoriaRodu: "Ród Przysięgły",
    koronaImg: "../KRA/korona hrabiego.png",
    n11_title: "Hrabina Wyżyn Północnych",
    n12_creationOrder: "Postanowienie Krula Multikont nr 23/T/2026 z dnia 18.09.2026 r.",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Hrabia",
    n15_territory: "Prowincja Wyżyny Północne (urząd Burgrabiego Prowincji)",
    n16_publicEstate: "Siedziba Urzędu Prowincji Wyżyn Północnych w Twierdzy Wyżywnik",
    n17_businessEstate: "Posiadłości ziemskie Twierdzy Wyżywnik i przyległe tereny wyżynne",
    n18_publicLegalBasis: "Art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Złoty sygnet z szafirem",
    n110_dates: "18.09.2026 r./nie dotyczy",
    n21_holderName: "Tyvurea",
    n22_grantOrder: "Postanowienie Krula Multikont nr 27/N/2026 z dnia 18.09.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Brak",
    n25_individualPrivileges: "Brak",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak zarejestrowanego wzoru herbu",
    n32_usageTitle: "Hrabina",
    n33_otherTitles: "Brak",
    n41_houseCategory: "Ród Przysięgły (głowa rodu w randze Hrabiego)",
    n42_vassalStatus: "Wasal Księstwa Strigallorów. Akt Hołdu złożony przed Diukiem Puchaczem Potężnym w Sowigrodzie w dniu 18.09.2026 r., zatwierdzony postanowieniem Krula Multikont.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Tyvurea"
    ],
    n45_houseSeat: "Twierdza Wyżywnik"
  },

  // 4. BARON ZŁOTEJ GRANI
  {
    title: "Baron Złotej Grani",
    ranga: "Baron",
    kategoriaRodu: "Ród Ziemski",
    koronaImg: "../KRA/korona barona.png",
    n11_title: "Baron Złotej Grani",
    n12_creationOrder: "Postanowienie Krula Multikont nr 19/T/2026 z dnia 02.03.2026 r. (ze zm. z 18.09.2026 r.)",
    classes: {
      publicFunction: true,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Baron",
    n15_territory: "Miasto szlacheckie Złota Grań (urząd Burgrabiego Miejskiego Złotej Grani)",
    n16_publicEstate: "Ratusz Miejski oraz zbrojownia miejska w Złotej Grani",
    n17_businessEstate: "Kuźnie i warsztaty rzemieślnicze Złotej Grani",
    n18_publicLegalBasis: "Art. 11 ust. 5 oraz art. 24 ust. 2 i 3 Ustawy z dnia 17.03.2025 r. o samorządzie prowincji (Kr. Dz. U. z 2026 r. poz. 51)",
    n19_ringDesc: "Srebrny sygnet z ametystem",
    n110_dates: "02.03.2026 r./nie dotyczy",
    n21_holderName: "Drothellan",
    n22_grantOrder: "Postanowienie Krula Multikont nr 23/N/2026 z dnia 02.03.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Othmarion",
    n25_individualPrivileges: "Brak",
    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Srebrne pióro sowie skrzyżowane ze sztyletem na ciemnogranatowej tarczy. Nad tarczą korona rangowa barona.",
    n32_usageTitle: "Baron",
    n33_otherTitles: "Burgrabia Miejski Złotej Grani",
    n41_houseCategory: "Ród Ziemski (głowa rodu w randze Barona)",
    n42_vassalStatus: "Wasal Księstwa Strigallorów. Podległość lenna wobec Diuka Puchacza Potężnego na prawie miejskim szlacheckim.",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Srebrne pióro sowie skrzyżowane ze sztyletem na ciemnogranatowej tarczy.",
    n44_houseMembers: [
      "Drothellan",
      "Othmarion"
    ],
    n45_houseSeat: "Belweder Burgrabiego w Złotej Grani"
  },

  // ==========================================================================
  // GRUPA 3: PROWINCJE I WASALE BEZPOŚREDNI TRONU KRULEWSKIEGO
  // ==========================================================================
  {
    isDivider: true,
    html: `
      <div style="margin: 28px 0 14px 0; padding: 12px 18px; background: linear-gradient(90deg, #6e1313 0%, #9e1c1c 100%); color: #ffffff; border-radius: 4px; border-left: 6px solid #d4af37; box-shadow: 0 2px 4px rgba(0,0,0,0.08); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85;">Zależność Bezpośrednia (Art. 36b ust. 1 in fine Dekretu)</span>
          <strong style="font-size: 16px; letter-spacing: 0.5px;">Bezpośredni Wasale Tronu Krulewskiego</strong>
        </div>
        <span style="font-size: 12px; font-style: italic; opacity: 0.9;">Najwyższy Suzeren: Krul Multikont</span>
      </div>
    `
  },

  // 6. BARON DOLINY DRAPIEŻNIKÓW
  {
    title: "Baron Doliny Drapieżników",
    ranga: "Baron",
    kategoriaRodu: "Ród Ziemski",
    koronaImg: "../KRA/korona barona.png",

    n11_title: "Baron Doliny Drapieżników",
    n12_creationOrder: "Postanowienie Krula Multikont nr 10/T/2026 z dnia 26.02.2026 r.",
    classes: {
      publicFunction: false,
      landAndBusiness: true,
      honorary: false
    },
    n14_ranga: "Baron",
    n15_publicEstate: "Brak",
    n16_businessEstate: "Gospodarstwo Hodowlane i Rezerwat Łowiecki Doliny Drapieżników",
    n17_publicLegalBasis: "Nie dotyczy",
    n18_ringDesc: "Srebrny sygnet z nefrytem",
    n19_dates: "26.02.2026 r./nie dotyczy",

    n21_holderName: "Gromosław",
    n22_grantOrder: "Postanowienie Krula Multikont nr 16/N/2026 z dnia 26.02.2026 r.",
    n23_prevHolders: "Brak",
    n24_heir: "Brak",
    n25_individualPrivileges: "Prawo jurysdykcji bartnej w granicach posiadłości",

    n31_usedHerbImg: null,
    n31_usedHerbDesc: "Brak",
    n32_usageTitle: "Baron",
    n33_otherTitles: "Brak",

    n41_houseCategory: "Ród Ziemski (głowa rodu w randze Barona)",
    n42_vassalStatus: "Bezpośrednia zależność lenna od Krula Multikont (art. 36b ust. 1 in fine Dekretu – z uwagi na brak właściwego terytorialnie Wielkiego Rodu).",
    n43_houseHerbImg: null,
    n43_houseHerbDesc: "Brak",
    n44_houseMembers: [
      "Gromosław",
      "Mściwój"
    ],
    n45_houseSeat: "Twierdza Wilczy Szczerb"
  }
];