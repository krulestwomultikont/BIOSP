/* ==========================================================================
   MAPA ŚWIATA FELOROST — dane
   Wersja: 0.1 (pierwszy szkic kanoniczny)
   Źródła: Lore Świata Multikont, oś czasu BIOSP, KRA (rody wielkie i wasalne),
           Konstytucja Korony Krulestwa Multikont, ustawa o KKK.
   Uwaga: kształty i współrzędne są robocze — łatwe do korygowania w tym pliku.
   ========================================================================== */
window.SWIAT = (function () {

  const meta = {
    title: "Felorost",
    subtitle: "Interaktywna mapa świata",
    version: "0.1",
    canvas: { w: 2100, h: 1500 },
    note: "Pierwszy szkic kanoniczny. Położenia i kształty krain są robocze i będą sukcesywnie poprawiane."
  };

  /* ------------------------------------------------------------------------
     KONTYNENTY (baza lądowa)
     ------------------------------------------------------------------------ */
  const continents = [
    {
      id: "vermindor",
      name: "Vermindor",
      type: "kontynent",
      d: "M 150,260 C 130,340 165,430 200,500 C 235,570 220,660 250,740 C 280,820 295,905 355,975 C 415,1045 500,1095 590,1105 C 655,1112 705,1092 735,1058 C 765,1024 800,1018 835,1050 C 875,1087 915,1092 945,1060 C 970,1033 960,990 945,950 C 930,910 905,870 890,825 C 875,780 865,735 855,690 C 845,645 830,600 820,555 C 810,510 805,465 795,420 C 785,375 775,330 745,295 C 710,255 650,215 575,205 C 495,195 425,215 345,215 C 265,215 180,200 150,260 Z",
      label: { x: 470, y: 178, size: 40 },
      wiki: "vermindor",
      description: "Kontynent, na którym narodziły się felorki, molempopule i torroserpensy. Obejmuje Wielką Pustynię, Wielki Wulkan, Azurową Dolinę oraz wschodnie góry Imperium Felorków."
    },
    {
      id: "multikonia",
      name: "Multikonia",
      type: "kontynent",
      d: "M 1100,220 C 1190,170 1310,155 1430,180 C 1540,205 1640,180 1730,225 C 1810,265 1855,340 1838,430 C 1822,515 1860,590 1872,675 C 1884,760 1848,845 1795,905 C 1740,967 1700,1040 1625,1092 C 1548,1145 1450,1168 1355,1140 C 1260,1112 1210,1040 1170,960 C 1130,880 1085,820 1062,740 C 1040,660 1020,575 1042,495 C 1064,415 1040,330 1080,265 C 1090,248 1095,232 1100,220 Z",
      label: { x: 1470, y: 198, size: 40 },
      wiki: "multikonia",
      description: "Kontynent, na którym leży Tarkwinogród — stolica Korony Krulestwa Multikont. Obejmuje centralne prowincje, księstwa Korony oraz wschodnie i południowe krainy."
    },
    {
      id: "mythandria",
      name: "Mythandria",
      type: "kontynent",
      d: "M 1180,1318 C 1255,1278 1360,1268 1455,1288 C 1550,1308 1628,1298 1678,1338 C 1718,1370 1700,1422 1640,1442 C 1558,1468 1460,1452 1368,1452 C 1278,1452 1198,1442 1160,1402 C 1130,1372 1142,1340 1180,1318 Z",
      label: { x: 1430, y: 1328, size: 34 },
      wiki: "mythandria",
      description: "Kontynent kolonizowany przez felorki leśne i morskie. W 29 TE powstała tam Federacja Mythrandii."
    }
  ];

  /* ------------------------------------------------------------------------
     WYSPY I ARCHIPELAGI (baza lądowa)
     ------------------------------------------------------------------------ */
  const islands = [
    { id: "arch-torroserpens", name: "Archipelag Północny", d: "M 300,120 C 330,95 380,98 400,120 C 420,142 390,165 355,160 C 320,155 280,145 300,120 Z M 420,95 C 455,75 500,82 515,105 C 530,128 500,150 465,145 C 430,140 395,120 420,95 Z M 520,130 C 550,112 590,118 600,140 C 610,162 580,180 550,175 C 520,170 495,150 520,130 Z" },
    { id: "arch-blekitne", name: "Błękitne Wyspy", d: "M 820,1100 C 850,1080 890,1082 910,1105 C 930,1128 905,1155 870,1150 C 835,1145 795,1125 820,1100 Z M 900,1160 C 930,1142 965,1148 975,1170 C 985,1192 955,1210 925,1204 C 895,1198 875,1180 900,1160 Z M 780,1170 C 805,1152 840,1158 848,1180 C 856,1202 828,1218 800,1212 C 772,1206 758,1188 780,1170 Z" },
    { id: "arch-trzech-gwiazd", name: "Archipelag Trzech Gwiazd", d: "M 1955,640 C 1990,620 2030,628 2045,655 C 2060,682 2030,705 1995,698 C 1960,691 1925,665 1955,640 Z M 1990,730 C 2020,712 2055,718 2065,742 C 2075,766 2048,785 2018,778 C 1988,771 1965,752 1990,730 Z M 1940,760 C 1965,745 1995,750 2003,770 C 2011,790 1988,805 1962,800 C 1936,795 1918,778 1940,760 Z" },
    { id: "arch-centralny", name: "Archipelag Wysp Centralnych", d: "M 930,560 C 955,540 985,545 995,568 C 1005,591 980,610 952,604 C 924,598 908,580 930,560 Z M 960,640 C 985,622 1015,628 1023,650 C 1031,672 1005,690 978,684 C 951,678 938,660 960,640 Z M 905,650 C 925,636 950,640 956,658 C 962,676 940,690 918,685 C 896,680 885,664 905,650 Z" }
  ];

  /* ------------------------------------------------------------------------
     KRAINY, KSIĘSTWA, PROWINCJE, PAŃSTWA
     ------------------------------------------------------------------------ */
  const regions = [
    /* --- VERMINDOR --- */
    {
      id: "halgrand", name: "Halgrand", type: "kraina", parent: "vermindor", color: "#8d6e63",
      d: "M 200,270 L 330,250 L 390,310 L 380,400 L 310,440 L 230,410 L 185,340 Z",
      label: { x: 288, y: 310 }, capital: "Halgrand", ruler: "",
      wiki: "halgrand",
      description: "Kraina, w której w 114 PE felorki morskie i leśne założyły Felorskie Dominium — pierwszą wielką cywilizację morską Felorostu."
    },
    {
      id: "kolonie-zachodnie", name: "Kolonie Zachodnie", type: "kraina", parent: "vermindor", color: "#bcaaa4",
      d: "M 185,430 L 280,440 L 310,520 L 300,640 L 270,730 L 210,740 L 175,640 L 165,520 Z",
      label: { x: 235, y: 585 }, capital: "Port Kolonii",
      wiki: "kolonie-zachodnie",
      description: "Zachodnie wybrzeże Vermindoru, kolonizowane od 137 PE przez Felorskie Dominium. Po upadku Dominium północne kolonie zajęli torroserpensowie, a południowe utworzyły Cesarstwo Binturonga."
    },
    {
      id: "torroserpensy", name: "Królestwo Torroserpensów", type: "królestwo", parent: "vermindor", color: "#4fc3f7",
      d: "M 400,230 L 560,210 L 690,240 L 740,310 L 700,370 L 580,390 L 460,370 L 400,310 Z",
      label: { x: 560, y: 252 }, capital: "Stolica Torroserpensów",
      wiki: "krolestwo-torroserpensow",
      description: "Królestwo inteligentnych ryboludów z północnego Vermindoru. W 177 PE torroserpensowie zostali wyparci na północny archipelag, a w 27 DE ich król okazał się ukrytym anime-demonem."
    },
    {
      id: "wielka-pustynia", name: "Wielka Pustynia Vermindoru", type: "kraina", parent: "vermindor", color: "#e6c98a",
      d: "M 330,400 L 470,370 L 620,395 L 700,460 L 720,570 L 690,700 L 600,770 L 480,790 L 370,740 L 300,650 L 290,520 Z",
      label: { x: 505, y: 585 }, capital: "Pustynne państwa-miasta",
      wiki: "wielka-pustynia-vermindoru",
      description: "Serce Vermindoru. Tu w 5 PE powstało Pierwsze Imperium Felorków, a w 131 PE resztki felorków pustynnych założyły pustynne państwa-miasta. Miejsce wielkich wojen z anime-demonami."
    },
    {
      id: "gory-wschodnie", name: "Góry Wschodnie", type: "kraina", parent: "vermindor", color: "#78909c",
      d: "M 700,330 L 780,320 L 830,400 L 840,520 L 830,640 L 810,760 L 760,820 L 710,780 L 700,660 L 690,540 L 690,420 Z",
      label: { x: 770, y: 555 }, capital: "",
      wiki: "gory-wschodnie",
      description: "Wschodni łańcuch górski Vermindoru, wchodzący w skład Imperium Felorków. Oddziela Wielką Pustynię od Azurowej Doliny."
    },
    {
      id: "marchia-wschodnia", name: "Marchia Wschodnia", type: "państwo", parent: "vermindor", color: "#a1887f",
      d: "M 690,820 L 780,810 L 810,870 L 800,950 L 740,990 L 670,960 L 650,900 Z",
      label: { x: 722, y: 858 }, capital: "Dwór Marchii Wschodniej",
      wiki: "marchia-wschodnia",
      description: "Lennicze państwo Królestwa Azurii, zamieszkane przez felorki. Oddziela Azurową Dolinę od dzikich plemion."
    },
    {
      id: "azurowa-dolina", name: "Azurowa Dolina", type: "kraina", parent: "vermindor", color: "#7cb342",
      d: "M 790,840 L 870,840 L 900,900 L 895,970 L 850,1010 L 790,990 L 770,920 Z",
      label: { x: 835, y: 884 }, capital: "Kapitol", ruler: "Król Bożydar Miszczu",
      wiki: "azurowa-dolina",
      description: "Zielona, żyzna dolina na wschodzie Vermindoru, otoczona górami. Powstała w 2 DE z rytuału Nulzorossa; w 26 TE oddana Lewosławianom. Siedziba Królestwa Azurii i Patriarchatu Lewosławia."
    },
    {
      id: "storisis", name: "Storisis", type: "prowincja", parent: "vermindor", color: "#90a4ae",
      d: "M 745,800 L 790,795 L 805,830 L 785,860 L 748,855 L 735,825 Z",
      label: { x: 770, y: 802 }, capital: "Storisis", ruler: "Korona Krulestwa Multikont",
      wiki: "storisis",
      description: "Prowincja Korony Krulestwa Multikont położona obok Azurowej Doliny, w łańcuchu górskim graniczącym z Królestwem Azurii. Jedna z dziesięciu prowincji Korony."
    },
    {
      id: "zakon-templariuszy", name: "Zakon Templariuszy Adanosa", type: "terytorium", parent: "vermindor", color: "#c0a060",
      d: "M 735,1045 L 820,1035 L 875,1070 L 890,1120 L 840,1150 L 760,1145 L 715,1105 Z",
      label: { x: 805, y: 1052 }, capital: "Siedziba Zakonu",
      wiki: "zakon-templariuszy-adanosa",
      description: "Zakon rycerski założony w 70 TE na południowo-wschodnim półwyspie Vermindoru, poświęcony Adanosowi — bogu harmonii, wód i natury."
    },
    {
      id: "blekitne-wyspy", name: "Błękitne Wyspy", type: "państwo", parent: "vermindor", color: "#7e57c2",
      d: "M 820,1100 C 850,1080 890,1082 910,1105 C 930,1128 905,1155 870,1150 C 835,1145 795,1125 820,1100 Z M 900,1160 C 930,1142 965,1148 975,1170 C 985,1192 955,1210 925,1204 C 895,1198 875,1180 900,1160 Z M 780,1170 C 805,1152 840,1158 848,1180 C 856,1202 828,1218 800,1212 C 772,1206 758,1188 780,1170 Z",
      label: { x: 860, y: 1102 }, capital: "Omyria", ruler: "Wielki Egzarcha Orrvin",
      wiki: "blekitne-wyspy",
      description: "Wyspy na południe od Azurii. Siedziba Lewosławnego Egzarchatu Omyrii — autonomicznego państwa kościelnego, które po konklawe 2019 r. uzyskało szeroką autonomię od Patriarchatu Lewosławia."
    },

    /* --- MULTIKONIA --- */
    {
      id: "wyzyny-polnocne", name: "Prowincja Wyżyny Północne", type: "prowincja", parent: "multikonia", color: "#5d6d7e",
      d: "M 1120,240 L 1280,215 L 1420,240 L 1460,320 L 1420,400 L 1280,420 L 1160,390 L 1100,320 Z",
      label: { x: 1260, y: 276 }, capital: "Twierdza Wyżywnik",
      wiki: "wyzyny-polnocne",
      description: "Północna prowincja Korony, obejmująca wyżyny i twierdzę Wyżywnik. Jedna z dziesięciu prowincji Korony Krulestwa Multikont."
    },
    {
      id: "pogranicze-sowie", name: "Prowincja Pogranicze Sowie", type: "prowincja", parent: "multikonia", color: "#7f8c8d",
      d: "M 1460,230 L 1640,220 L 1710,280 L 1700,360 L 1600,400 L 1500,390 L 1450,320 Z",
      label: { x: 1555, y: 268 }, capital: "Stanica Pogranicza",
      wiki: "pogranicze-sowie",
      description: "Prowincja graniczna na północnym wschodzie Multikonii, z siedzibą urzędu w Stanicy Pogranicza."
    },
    {
      id: "imperium-felorkow", name: "Imperium Felorków", type: "państwo", parent: "multikonia", color: "#b03a2e",
      d: "M 1700,230 L 1860,245 L 1900,330 L 1880,450 L 1790,500 L 1700,470 L 1660,380 Z",
      label: { x: 1785, y: 330 }, capital: "Stolica Imperium", ruler: "Król Imperium Felorków",
      wiki: "imperium-felorkow",
      description: "Państwo założone przez Rebranda Żelaznego (0–20 TE), obejmujące wschodnie góry Vermindoru, Azurową Dolinę i wschodnią Multikonię. W 26 TE Azurowa Dolina została oddana Lewosławianom."
    },
    {
      id: "binturonga", name: "Księstwo Binturonga", type: "księstwo", parent: "multikonia", color: "#2e7d32",
      d: "M 1430,390 L 1590,380 L 1660,450 L 1650,560 L 1560,620 L 1450,610 L 1390,530 L 1400,450 Z",
      label: { x: 1510, y: 455 }, capital: "Gród Klanu Felorków Leśnych", ruler: "Diuk Kalozoross III Strażnik Lasu",
      wiki: "ksiestwo-binturonga",
      description: "Wielki Ród Binturonga, wywodzący się z Cesarstwa Binturonga (7 DE). Obejmuje Puszczę Binturonga i podlega zwierzchnictwu klanów leśnych na prawie obyczajowym."
    },
    {
      id: "kwiatosmok", name: "Księstwo Kwiatosmoka", type: "księstwo", parent: "multikonia", color: "#8e5bb5",
      d: "M 1640,460 L 1830,470 L 1870,560 L 1850,680 L 1760,730 L 1660,710 L 1610,620 L 1615,520 Z",
      label: { x: 1715, y: 505 }, capital: "Twierdza Twitter", ruler: "Diuk Lavaszu",
      wiki: "ksiestwo-kwiatosmoka",
      description: "Wielki Ród Kwiatosmoka. Obejmuje Twierdzę Twitter, Twierdzę Smutku i Rozpaczy oraz siedzibę Zakonu Wyznawców Decarda Caina. W jego skład wchodzą Ziemie Twitterowska, Fejsbukowska, Youtubowska i Discordowska."
    },
    {
      id: "swinkow", name: "Księstwo Świnków", type: "księstwo", parent: "multikonia", color: "#c96a8a",
      d: "M 1165,500 L 1290,490 L 1345,550 L 1340,650 L 1270,700 L 1180,685 L 1145,600 Z",
      label: { x: 1240, y: 545 }, capital: "Świdnik", ruler: "Diuk Bolszewicki Tata Świnka",
      wiki: "ksiestwo-swinkow",
      description: "Wielki Ród Świnków, najstarszy ród Korony. Siedziba w Dworku w Świdniku, majątek Świdnik-Agro. W skład rodu wchodzą Bracia Świnkowie."
    },
    {
      id: "zlotokloska", name: "Prowincja Złotokłoska", type: "prowincja", parent: "multikonia", color: "#e0b84a",
      d: "M 1345,490 L 1460,480 L 1510,545 L 1500,625 L 1430,660 L 1360,640 L 1340,560 Z",
      label: { x: 1405, y: 512 }, capital: "Twierdza Złotokłos",
      wiki: "prowincja-zlotokloska",
      description: "Prowincja rolnicza w centralnej Multikonii, z twierdzą Złotokłos. Jedna z trzech prowincji okalających stolicę Korony."
    },
    {
      id: "tarkwinogrod", name: "Dystrykt Stołeczny Tarkwinogród", type: "dystrykt", parent: "multikonia", color: "#c0392b",
      d: "M 1340,650 L 1430,645 L 1460,690 L 1445,745 L 1370,760 L 1325,710 Z",
      label: { x: 1392, y: 672 }, capital: "Tarkwinogród", ruler: "Krul Artur I Gryfion",
      wiki: "tarkwinogrod",
      description: "Stolica Korony Krulestwa Multikont i jej dystrykt stołeczny. Dawna Lewosławna Republika Trójmiasta, wcielona do Krulestwa w 78 TE i przemianowana na Tarkwinogród w 79 TE."
    },
    {
      id: "starorudzka", name: "Prowincja Starorudzka", type: "prowincja", parent: "multikonia", color: "#9c6b3f",
      d: "M 1180,700 L 1300,690 L 1340,750 L 1330,830 L 1240,860 L 1165,810 L 1150,740 Z",
      label: { x: 1245, y: 728 }, capital: "Starorud",
      wiki: "prowincja-starorudzka",
      description: "Prowincja w centralnej Multikonii. Jedna z trzech prowincji okalających stolicę Korony."
    },
    {
      id: "margarity", name: "Księstwo Margarity", type: "księstwo", parent: "multikonia", color: "#6aa84f",
      d: "M 1045,690 L 1140,680 L 1180,740 L 1170,830 L 1100,880 L 1030,850 L 1010,770 Z",
      label: { x: 1090, y: 742 }, capital: "Bagienny klasztor Rycerzy Margarity", ruler: "Diuszessa Margarita",
      wiki: "ksiestwo-margarity",
      description: "Wielki Ród Margarity, sprawujący jurysdykcję zakonną nad bagnami zachodniej Multikonii. W skład rodu wchodzą Kunegunda, Brat Mateusz, Brat Janusz i Brat Zygfryd."
    },
    {
      id: "strigallorow", name: "Księstwo Strigallorów", type: "księstwo", parent: "multikonia", color: "#d4a017",
      d: "M 1360,880 L 1500,860 L 1580,910 L 1590,1010 L 1520,1090 L 1410,1095 L 1340,1020 L 1330,930 Z",
      label: { x: 1455, y: 928 }, capital: "Sowigród", ruler: "Diuk Puchacz Potężny",
      wiki: "ksiestwo-strigallorow",
      description: "Wielki Ród Strigallorów, półboskich sowich wojowników. Siedziba w zamku w Sowigrodzie, majątek Złota Dolina. Strigallorowie są równoprawnym narodem Korony."
    },
    {
      id: "marchia-dorzecza", name: "Marchia Dorzecza Zachodniego", type: "marchia", parent: "multikonia", color: "#27ae60",
      d: "M 1460,720 L 1580,710 L 1640,770 L 1630,860 L 1550,900 L 1470,880 L 1435,800 Z",
      label: { x: 1520, y: 752 }, capital: "Dwór Marchii Dorzecza Zachodniego",
      wiki: "marchia-dorzecza-zachodniego",
      description: "Marchia rolnicza nad rzekami wschodniej Multikonii, z siedzibą urzędu w Dworze Marchii. Wchodzi w skład dziedzictwa Hrabiny Jadwigi Artrupovic."
    },
    {
      id: "kirina", name: "Księstwo Kirina", type: "księstwo", parent: "multikonia", color: "#1f8a9c",
      d: "M 1590,800 L 1720,790 L 1810,840 L 1820,930 L 1750,1000 L 1650,1010 L 1580,950 L 1565,870 Z",
      label: { x: 1700, y: 852 }, capital: "Zamek Siedmiu Wirów", ruler: "Diuk Archadius Błękitny Smok",
      wiki: "ksiestwo-kirina",
      description: "Najmłodszy Wielki Ród Korony, ustanowiony 11.10.2026. Obejmuje Zamek Siedmiu Wirów, Gród nad Bursztynowym Brzegiem oraz Ziemię Srebrnej Łuski, Ziemię Bursztynowego Brzegu i Krainę Siedmiu Wirów."
    },
    {
      id: "mglistogran", name: "Ziemia Mglistograni", type: "kraina", parent: "multikonia", color: "#8e9eab",
      d: "M 1570,1010 L 1690,1000 L 1770,1040 L 1780,1110 L 1700,1150 L 1600,1140 L 1545,1080 Z",
      label: { x: 1650, y: 1125 }, capital: "Dwór Ziemi Mglistograni",
      wiki: "ziemia-mglistograni",
      description: "Kraina mgieł na południowym wschodzie Multikonii, zdobyta przez Trójmiasto w 48 TE wraz z Dorzeczem Zachodnim i Archipelagiem Trzech Gwiazd."
    },
    {
      id: "suma", name: "Księstwo Suma", type: "księstwo", parent: "multikonia", color: "#1f6f8b",
      d: "M 930,560 C 955,540 985,545 995,568 C 1005,591 980,610 952,604 C 924,598 908,580 930,560 Z M 960,640 C 985,622 1015,628 1023,650 C 1031,672 1005,690 978,684 C 951,678 938,660 960,640 Z M 905,650 C 925,636 950,640 956,658 C 962,676 940,690 918,685 C 896,680 885,664 905,650 Z",
      label: { x: 965, y: 565 }, capital: "Zamek Centralnej Wyspy Archipelagu", ruler: "Diuk Arniel Artrupovic",
      wiki: "ksiestwo-suma",
      description: "Wielki Ród Suma, władający Archipelagiem Wysp Centralnych. Siedziba w Zamku Centralnej Wyspy Archipelagu; gospodarka oparta na przetwórstwie rybnym."
    },
    {
      id: "archipelag-trzech-gwiazd", name: "Archipelag Trzech Gwiazd", type: "prowincja", parent: "multikonia", color: "#2980b9",
      d: "M 1955,640 C 1990,620 2030,628 2045,655 C 2060,682 2030,705 1995,698 C 1960,691 1925,665 1955,640 Z M 1990,730 C 2020,712 2055,718 2065,742 C 2075,766 2048,785 2018,778 C 1988,771 1965,752 1990,730 Z M 1940,760 C 1965,745 1995,750 2003,770 C 2011,790 1988,805 1962,800 C 1936,795 1918,778 1940,760 Z",
      label: { x: 1995, y: 725 }, capital: "Port Centralny Archipelagu",
      wiki: "archipelag-trzech-gwiazd",
      description: "Wyspy wschodnie Multikonii, zdobyte przez Trójmiasto w 48 TE. Ośrodki portowe, łowiska i przetwórstwo rybne; siedziba biskupstwa Archipelagu Trzech Gwiazd."
    },
    {
      id: "federacja-mythrandii", name: "Federacja Mythrandii", type: "państwo", parent: "mythandria", color: "#16a085",
      d: "M 1180,1318 C 1255,1278 1360,1268 1455,1288 C 1550,1308 1628,1298 1678,1338 C 1718,1370 1700,1422 1640,1442 C 1558,1468 1460,1452 1368,1452 C 1278,1452 1198,1442 1160,1402 C 1130,1372 1142,1340 1180,1318 Z",
      label: { x: 1430, y: 1408 }, capital: "Stolica Federacji",
      wiki: "federacja-mythrandii",
      description: "Federacja felorków leśnych i morskich, powstała w 29 TE w Mythrandii. Utrzymuje szlaki handlowe łączące Vermindor, Multikonię i Mythandrię."
    }
  ];

  /* ------------------------------------------------------------------------
     MIEJSCA (miasta, zamki, twierdze, klasztory, porty, ziemie)
     ------------------------------------------------------------------------ */
  const places = [
    /* Vermindor */
    { id: "halgrand-port", name: "Port Halgrand", type: "miasto", x: 290, y: 365, region: "halgrand", rank: 2, wiki: "halgrand-port", description: "Port i dawna stolica Felorskiego Dominium w Halgrandzie." },
    { id: "port-kolonii", name: "Port Kolonii Zachodnich", type: "port", x: 225, y: 590, region: "kolonie-zachodnie", rank: 3, wiki: "port-kolonii", description: "Port na zachodnim wybrzeżu Vermindoru, pozostałość kolonii Felorskiego Dominium." },
    { id: "stolica-torroserpensow", name: "Stolica Torroserpensów", type: "miasto", x: 560, y: 290, region: "torroserpensy", rank: 2, wiki: "stolica-torroserpensow", description: "Stolica Królestwa Torroserpensów w północnym Vermindorze." },
    { id: "molempopule", name: "Podziemne Królestwo Molempopuli", type: "podziemia", x: 500, y: 320, region: "wielka-pustynia", rank: 2, wiki: "molempopule", description: "Państwo siedmiu klanów molempopuli, założone w 17 PE pod Vermindorem." },
    { id: "wielki-wulkan", name: "Wielki Wulkan Vermindoru", type: "landmark", x: 520, y: 470, region: "wielka-pustynia", rank: 1, wiki: "wielki-wulkan", description: "Wulkan, w którym felorki wulkaniczne odprawiały rytualne ofiary ku czci Ursona. Miejsce ostatecznego wyginięcia tej rasy w 153 PE." },
    { id: "pustynne-miasta", name: "Pustynne państwa-miasta", type: "region", x: 470, y: 620, region: "wielka-pustynia", rank: 3, wiki: "pustynne-panstwa-miasta", description: "Państwa-miasta założone w 131 PE przez resztki felorków pustynnych." },
    { id: "dwor-marchii-wschodniej", name: "Dwór Marchii Wschodniej", type: "dwor", x: 720, y: 900, region: "marchia-wschodnia", rank: 3, wiki: "dwor-marchii-wschodniej", description: "Siedziba władz Marchii Wschodniej, lenniczego państwa Królestwa Azurii." },
    { id: "kapitol", name: "Kapitol", type: "stolica", x: 840, y: 920, region: "azurowa-dolina", rank: 1, wiki: "kapitol", description: "Stolica Królestwa Azurii, położona w środku Azurowej Doliny." },
    { id: "patriarchat", name: "Patriarchat Lewosławia", type: "państwo", x: 856, y: 946, region: "azurowa-dolina", rank: 2, wiki: "patriarchat-lewoslawia", description: "Autonomiczne państwo kościelne w Kapitolu, siedziba Patriarchy Lewosławia. Obejmuje Pałac Patriarchy i Bazylikę św. Artrupa." },
    { id: "bazylika", name: "Bazylika św. Artrupa", type: "świątynia", x: 850, y: 932, region: "azurowa-dolina", rank: 2, wiki: "bazylika-sw-artrupa", description: "Największa świątynia lewosławna, miejsce konklawe i modlitw Patriarchy." },
    { id: "storisis-grod", name: "Gród Storisis", type: "gród", x: 770, y: 842, region: "storisis", rank: 3, wiki: "storisis", description: "Główny gród prowincji Storisis, w górach przy Azurowej Dolinie." },
    { id: "templariusze", name: "Siedziba Zakonu Templariuszy", type: "klasztor", x: 805, y: 1090, region: "zakon-templariuszy", rank: 3, wiki: "siedziba-templariuszy", description: "Siedziba Zakonu Templariuszy Adanosa na południowo-wschodnim półwyspie Vermindoru." },
    { id: "omyria", name: "Omyria", type: "miasto", x: 878, y: 1150, region: "blekitne-wyspy", rank: 2, wiki: "omyria", description: "Stolica Lewosławnego Egzarchatu Omyrii na Błękitnych Wyspach." },

    /* Multikonia */
    { id: "tarkwinogrod", name: "Tarkwinogród", type: "stolica", x: 1385, y: 700, region: "tarkwinogrod", rank: 1, wiki: "tarkwinogrod", description: "Stolica Korony Krulestwa Multikont. Dawne Trójmiasto, przemianowane w 79 TE. Siedziba Krula, Senatu, Rady Lordów i Wysokiego Trybunału." },
    { id: "swidnik", name: "Świdnik", type: "miasto", x: 1240, y: 580, region: "swinkow", rank: 2, wiki: "swidnik", description: "Miasto w Księstwie Świnków, siedziba Dworku rodu i przedsiębiorstwa Świdnik-Agro." },
    { id: "swidnik-dolny", name: "Świdnik Dolny", type: "zamek", x: 1220, y: 630, region: "swinkow", rank: 3, wiki: "swidnik-dolny", description: "Zamek prowincjonalny Prowincji Dolnoświdnickiej." },
    { id: "zlotoklos", name: "Twierdza Złotokłos", type: "twierdza", x: 1420, y: 560, region: "zlotokloska", rank: 3, wiki: "zlotoklos", description: "Twierdza i siedziba urzędu Prowincji Złotokłoskiej." },
    { id: "starorud", name: "Starorud", type: "miasto", x: 1260, y: 770, region: "starorudzka", rank: 3, wiki: "starorud", description: "Ośrodek Prowincji Starorudzkiej." },
    { id: "bagienny-klasztor", name: "Bagienny klasztor Rycerzy Margarity", type: "klasztor", x: 1100, y: 780, region: "margarity", rank: 2, wiki: "bagienny-klasztor", description: "Siedziba Wielkiego Rodu Margarity i rycerzy zakonnych na bagnach zachodniej Multikonii." },
    { id: "klasztor-wysp-bagiennych", name: "Klasztor Wysp Bagiennych", type: "klasztor", x: 1120, y: 900, region: "margarity", rank: 3, wiki: "klasztor-wysp-bagiennych", description: "Klasztor na Wyspach Bagiennych, siedziba baronii Brat Mateusza." },
    { id: "klasztor-bagien-zachodnich", name: "Klasztor Krainy Bagien Zachodnich", type: "klasztor", x: 1050, y: 820, region: "margarity", rank: 3, wiki: "klasztor-bagien-zachodnich", description: "Klasztor w Krainie Bagien Zachodnich, siedziba baronii Brat Janusza." },
    { id: "sowigrod", name: "Sowigród", type: "miasto", x: 1450, y: 960, region: "strigallorow", rank: 2, wiki: "sowigrod", description: "Siedziba Diuka Strigallorów, Puchacza Potężnego. Miasto z zamkiem rodu." },
    { id: "zamek-siedmiu-wirow", name: "Zamek Siedmiu Wirów", type: "zamek", x: 1680, y: 880, region: "kirina", rank: 2, wiki: "zamek-siedmiu-wirow", description: "Główna siedziba Diuka Kirina, Archadiusa Błękitnego Smoka." },
    { id: "bursztynowy-brzeg", name: "Zamek nad Bursztynowym Brzegiem", type: "zamek", x: 1760, y: 950, region: "kirina", rank: 3, wiki: "bursztynowy-brzeg", description: "Zamek i warsztaty bursztynowe w Ziemi Bursztynowego Brzegu." },
    { id: "binturonga-grod", name: "Gród Klanu Felorków Leśnych", type: "gród", x: 1510, y: 500, region: "binturonga", rank: 2, wiki: "grod-klanu-felorkow-lesnych", description: "Siedziba Diuka Binturonga w Puszczy Binturonga." },
    { id: "twierdza-twitter", name: "Twierdza Twitter", type: "twierdza", x: 1720, y: 580, region: "kwiatosmok", rank: 2, wiki: "twierdza-twitter", description: "Główna twierdza Księstwa Kwiatosmoka i siedziba Diuka Lavaszu." },
    { id: "twierdza-smutku", name: "Twierdza Smutku i Rozpaczy", type: "twierdza", x: 1780, y: 660, region: "kwiatosmok", rank: 2, wiki: "twierdza-smutku-i-rozpaczy", description: "Twierdza w Księstwie Kwiatosmoka, siedziba biskupstwa Kardynała Mikara." },
    { id: "suma-zamek", name: "Zamek Centralnej Wyspy Archipelagu", type: "zamek", x: 965, y: 600, region: "suma", rank: 2, wiki: "zamek-centralnej-wyspy", description: "Siedziba Diuka Sumy, Arniela Artrupovica, na centralnej wyspie archipelagu." },
    { id: "stanica-pogranicza", name: "Stanica Pogranicza", type: "twierdza", x: 1570, y: 310, region: "pogranicze-sowie", rank: 3, wiki: "stanica-pogranicza", description: "Siedziba urzędu Prowincji Pogranicze Sowie." },
    { id: "twierdza-wyzywnik", name: "Twierdza Wyżywnik", type: "twierdza", x: 1280, y: 320, region: "wyzyny-polnocne", rank: 3, wiki: "twierdza-wyzywnik", description: "Twierdza i siedziba urzędu Prowincji Wyżyny Północne." },
    { id: "port-centralny", name: "Port Centralny Archipelagu", type: "port", x: 2000, y: 670, region: "archipelag-trzech-gwiazd", rank: 2, wiki: "port-centralny-archipelagu", description: "Główny port Archipelagu Trzech Gwiazd." },
    { id: "dwor-marchii", name: "Dwór Marchii Dorzecza Zachodniego", type: "dwor", x: 1540, y: 800, region: "marchia-dorzecza", rank: 3, wiki: "dwor-marchii-dorzecza", description: "Siedziba urzędu Marchii Dorzecza Zachodniego." },
    { id: "dwor-mglistogran", name: "Dwór Ziemi Mglistograni", type: "dwor", x: 1660, y: 1070, region: "mglistogran", rank: 3, wiki: "dwor-ziemi-mglistograni", description: "Siedziba urzędu Ziemi Mglistograni." },
    { id: "grod-lasow-poludniowych", name: "Gród w Lasach Południowych", type: "gród", x: 1500, y: 1050, region: "mglistogran", rank: 3, wiki: "grod-lasow-poludniowych", description: "Gród w Lasach Południowych, siedziba biskupstwa Lasów Południowych." },
    { id: "grod-pomorze", name: "Gród nad Pomorzem Południowym", type: "gród", x: 1620, y: 1000, region: "mglistogran", rank: 3, wiki: "grod-pomorza-poludniowego", description: "Gród nad Pomorzem Południowym." },
    { id: "twierdza-wilczy-szczerb", name: "Twierdza Wilczy Szczerb", type: "twierdza", x: 1320, y: 980, region: "strigallorow", rank: 3, wiki: "twierdza-wilczy-szczerb", description: "Twierdza w Dolinie Drapieżników, siedziba baronii." },
    { id: "ganozewsz", name: "Ganozewsz", type: "miasto", x: 1480, y: 590, region: "binturonga", rank: 3, wiki: "ganozewsz", description: "Miasto i siedziba biskupstwa Ganozewsza, związane z rodem Galbrannora." },
    { id: "gory-pryzmatyczne", name: "Góry Pryzmatyczne", type: "góry", x: 1600, y: 300, region: "pogranicze-sowie", rank: 3, wiki: "gory-pryzmatyczne", description: "Góry w północno-wschodniej Multikonii, siedziba biskupstwa Gór Pryzmatycznych." },
    { id: "ksiezycowy-polnoc", name: "Księżycowy Półwysep", type: "kraina", x: 1220, y: 950, region: "strigallorow", rank: 3, wiki: "ksiezycowy-polwysep", description: "Półwysep na południu Multikonii, siedziba biskupstwa Księżycowego Półwyspu." },
    { id: "ziemia-twitterowska", name: "Ziemia Twitterowska", type: "ziemia", x: 1700, y: 560, region: "kwiatosmok", rank: 3, wiki: "ziemia-twitterowska", description: "Ziemia w Księstwie Kwiatosmoka, z Twierdzą Twitter." },
    { id: "ziemia-fejsbukowska", name: "Ziemia Fejsbukowska", type: "ziemia", x: 1780, y: 540, region: "kwiatosmok", rank: 3, wiki: "ziemia-fejsbukowska", description: "Ziemia w Księstwie Kwiatosmoka." },
    { id: "ziemia-youtubowska", name: "Ziemia Youtubowska", type: "ziemia", x: 1680, y: 680, region: "kwiatosmok", rank: 3, wiki: "ziemia-youtubowska", description: "Ziemia w Księstwie Kwiatosmoka, siedziba biskupstwa Ziemi Youtubowskiej." },
    { id: "ziemia-discordowska", name: "Ziemia Discordowska", type: "ziemia", x: 1800, y: 640, region: "kwiatosmok", rank: 3, wiki: "ziemia-discordowska", description: "Ziemia w Księstwie Kwiatosmoka, siedziba biskupstwa Ziemi Discordowskiej." },
    { id: "federacja-mythrandii-grod", name: "Stolica Federacji Mythrandii", type: "miasto", x: 1430, y: 1370, region: "federacja-mythrandii", rank: 2, wiki: "stolica-federacji-mythrandii", description: "Stolica Federacji Mythrandii, ośrodek handlu między kontynentami." }
  ];

  /* ------------------------------------------------------------------------
     BISKUPSTWA (13 stolic kościelnych)
     ------------------------------------------------------------------------ */
  const bishoprics = [
    { id: "bp-tarkwinogrod", name: "Arcybiskupstwo Tarkwinogrodu", see: "Tarkwinogród", holder: "Moswades", rank: "Arcybiskup (Prymas)", x: 1385, y: 700, region: "tarkwinogrod", wiki: "arcybiskupstwo-tarkwinogrodu", description: "Stolica prymasowska Koronnego Kościoła Ignistrigona. Katedra w Tarkwinogrodzie." },
    { id: "bp-tarkwinogrod-zach", name: "Biskupstwo Tarkwinogrodu Zachodniego", see: "Tarkwinogród Zachodni", holder: "Erard", rank: "Biskup katedralny", x: 1330, y: 720, region: "tarkwinogrod", wiki: "biskupstwo-tarkwinogrodu-zachodniego", description: "Biskupstwo katedralne w zachodniej części stołecznego dystryktu." },
    { id: "bp-swidnik", name: "Biskupstwo Świdnika", see: "Świdnik", holder: "Raflod", rank: "Biskup katedralny", x: 1240, y: 580, region: "swinkow", wiki: "biskupstwo-swidnika", description: "Biskupstwo w Świdniku, w Księstwie Świnków." },
    { id: "bp-gory-pryzmatyczne", name: "Biskupstwo Gór Pryzmatycznych", see: "Góry Pryzmatyczne", holder: "Ox", rank: "Biskup katedralny", x: 1600, y: 300, region: "pogranicze-sowie", wiki: "biskupstwo-gor-pryzmatycznych", description: "Biskupstwo w Górach Pryzmatycznych, na północnym wschodzie Multikonii." },
    { id: "bp-ganozewsz", name: "Biskupstwo Ganozewsza", see: "Ganozewsz", holder: "Rotrdum", rank: "Biskup katedralny", x: 1480, y: 590, region: "binturonga", wiki: "biskupstwo-ganozewsza", description: "Biskupstwo w Ganozewszu, związane z rodem Markiza Galbrannora." },
    { id: "bp-sowigrod", name: "Biskupstwo Sowigrodu", see: "Sowigród", holder: "Avenal", rank: "Biskup katedralny", x: 1450, y: 960, region: "strigallorow", wiki: "biskupstwo-sowigrodu", description: "Biskupstwo w Sowigrodzie, w Księstwie Strigallorów." },
    { id: "bp-archipelag", name: "Biskupstwo Archipelagu Trzech Gwiazd", see: "Archipelag Trzech Gwiazd", holder: "Bertrand", rank: "Biskup katedralny", x: 2000, y: 670, region: "archipelag-trzech-gwiazd", wiki: "biskupstwo-archipelagu-trzech-gwiazd", description: "Biskupstwo na wyspach wschodniej Multikonii." },
    { id: "bp-lasy-poludniowe", name: "Biskupstwo Lasów Południowych", see: "Lasy Południowe", holder: "Grildar", rank: "Biskup katedralny", x: 1500, y: 1050, region: "mglistogran", wiki: "biskupstwo-lasow-poludniowych", description: "Biskupstwo w Lasach Południowych." },
    { id: "bp-ksiezycowy", name: "Biskupstwo Księżycowego Półwyspu", see: "Księżycowy Półwysep", holder: "Brat Zygfryd", rank: "Biskup katedralny", x: 1220, y: 950, region: "strigallorow", wiki: "biskupstwo-ksiezycowego-polkwyspu", description: "Biskupstwo na Księżycowym Półwyspie, w jurysdykcji zakonnej Margarity." },
    { id: "bp-bursztynowy", name: "Biskupstwo Bursztynowego Brzegu", see: "Bursztynowy Brzeg", holder: "Garrig", rank: "Biskup katedralny", x: 1760, y: 950, region: "kirina", wiki: "biskupstwo-bursztynowego-brzegu", description: "Biskupstwo w Ziemi Bursztynowego Brzegu, w Księstwie Kirina." },
    { id: "bp-discord", name: "Biskupstwo Ziemi Discordowskiej", see: "Ziemia Discordowska", holder: "Gergard", rank: "Biskup katedralny", x: 1800, y: 640, region: "kwiatosmok", wiki: "biskupstwo-ziemi-discordowskiej", description: "Biskupstwo w Ziemi Discordowskiej, w Księstwie Kwiatosmoka." },
    { id: "bp-youtube", name: "Biskupstwo Ziemi Youtubowskiej", see: "Ziemia Youtubowska", holder: "Thorgrim", rank: "Biskup katedralny", x: 1680, y: 680, region: "kwiatosmok", wiki: "biskupstwo-ziemi-youtubowskiej", description: "Biskupstwo w Ziemi Youtubowskiej, w Księstwie Kwiatosmoka." },
    { id: "bp-smutek", name: "Biskupstwo Twierdzy Smutku i Rozpaczy", see: "Twierdza Smutku i Rozpaczy", holder: "Mikar", rank: "Biskup katedralny (Kardynał)", x: 1780, y: 660, region: "kwiatosmok", wiki: "biskupstwo-twierdzy-smutku-i-rozpaczy", description: "Biskupstwo Kardynała Mikara w Twierdzy Smutku i Rozpaczy." }
  ];

  /* ------------------------------------------------------------------------
     TEREN (generowany jako glify)
     ------------------------------------------------------------------------ */
  const terrain = {
    mountains: [
      /* Góry Wschodnie (Vermindor) */
      { x: 720, y: 380, s: 1.0 }, { x: 740, y: 430, s: 1.1 }, { x: 760, y: 480, s: 1.0 },
      { x: 780, y: 530, s: 1.2 }, { x: 790, y: 580, s: 1.0 }, { x: 800, y: 630, s: 1.1 },
      { x: 790, y: 680, s: 1.0 }, { x: 780, y: 730, s: 1.1 }, { x: 760, y: 780, s: 1.0 },
      /* wokół Azurowej Doliny */
      { x: 790, y: 830, s: 0.8 }, { x: 810, y: 850, s: 0.9 }, { x: 830, y: 870, s: 0.8 },
      { x: 850, y: 890, s: 0.9 }, { x: 870, y: 910, s: 0.8 }, { x: 885, y: 940, s: 0.9 },
      { x: 885, y: 975, s: 0.8 }, { x: 870, y: 1000, s: 0.9 }, { x: 845, y: 1015, s: 0.8 },
      /* Góry Pryzmatyczne */
      { x: 1560, y: 285, s: 1.0 }, { x: 1590, y: 305, s: 1.1 }, { x: 1620, y: 325, s: 1.0 },
      { x: 1645, y: 350, s: 1.0 }, { x: 1620, y: 375, s: 0.9 }, { x: 1590, y: 395, s: 1.0 },
      /* Wyżyny Północne */
      { x: 1190, y: 300, s: 0.8 }, { x: 1225, y: 315, s: 0.9 }, { x: 1260, y: 330, s: 0.8 },
      { x: 1295, y: 315, s: 0.9 }, { x: 1330, y: 300, s: 0.8 }, { x: 1365, y: 315, s: 0.8 },
      /* wschód Multikonii (Imperium) */
      { x: 1695, y: 285, s: 1.0 }, { x: 1730, y: 305, s: 1.1 }, { x: 1765, y: 325, s: 1.0 },
      { x: 1800, y: 345, s: 1.1 }, { x: 1835, y: 365, s: 1.0 }, { x: 1845, y: 405, s: 0.9 },
      /* południe Multikonii */
      { x: 1400, y: 1010, s: 0.9 }, { x: 1435, y: 1030, s: 1.0 }, { x: 1470, y: 1015, s: 0.9 }
    ],
    forests: [
      /* Puszcza Binturonga */
      { x: 1450, y: 445, s: 1.0 }, { x: 1490, y: 465, s: 1.1 }, { x: 1530, y: 445, s: 1.0 },
      { x: 1570, y: 480, s: 1.1 }, { x: 1510, y: 525, s: 1.0 }, { x: 1470, y: 505, s: 1.0 },
      { x: 1550, y: 545, s: 1.1 }, { x: 1590, y: 515, s: 1.0 },
      /* Lasy Południowe */
      { x: 1480, y: 1000, s: 1.0 }, { x: 1520, y: 1020, s: 1.1 }, { x: 1560, y: 1000, s: 1.0 },
      { x: 1600, y: 1030, s: 1.1 }, { x: 1540, y: 1060, s: 1.0 }, { x: 1500, y: 1040, s: 1.0 },
      /* Halgrand */
      { x: 250, y: 300, s: 0.9 }, { x: 285, y: 320, s: 1.0 }, { x: 320, y: 300, s: 0.9 },
      { x: 305, y: 350, s: 0.9 },
      /* wschód Multikonii */
      { x: 1710, y: 450, s: 1.0 }, { x: 1745, y: 470, s: 1.0 }, { x: 1780, y: 455, s: 0.9 }
    ],
    deserts: [
      { x: 380, y: 450 }, { x: 430, y: 480 }, { x: 480, y: 450 }, { x: 530, y: 490 },
      { x: 580, y: 460 }, { x: 620, y: 500 }, { x: 400, y: 540 }, { x: 450, y: 570 },
      { x: 500, y: 540 }, { x: 550, y: 580 }, { x: 600, y: 550 }, { x: 650, y: 590 },
      { x: 420, y: 630 }, { x: 480, y: 660 }, { x: 540, y: 630 }, { x: 600, y: 670 },
      { x: 650, y: 640 }, { x: 380, y: 700 }, { x: 440, y: 720 }, { x: 500, y: 700 },
      { x: 560, y: 730 }, { x: 620, y: 710 }
    ],
    swamps: [
      { x: 1070, y: 750 }, { x: 1100, y: 775 }, { x: 1130, y: 800 }, { x: 1090, y: 825 },
      { x: 1120, y: 850 }, { x: 1050, y: 800 }, { x: 1060, y: 845 }, { x: 1110, y: 880 }
    ],
    volcano: { x: 520, y: 470, s: 1.2 }
  };

  /* ------------------------------------------------------------------------
     RZEKI
     ------------------------------------------------------------------------ */
  const rivers = [
    { d: "M 800,700 C 820,760 830,800 840,860 C 850,920 855,960 850,1000" },
    { d: "M 700,500 C 680,560 660,620 640,680 C 620,740 600,800 600,860" },
    { d: "M 500,500 C 520,560 540,620 560,680 C 580,740 600,800 620,860" },
    { d: "M 1400,400 C 1380,480 1360,560 1340,640 C 1320,720 1300,800 1280,880" },
    { d: "M 1700,400 C 1680,480 1660,560 1640,640 C 1620,720 1600,800 1600,860" },
    { d: "M 1250,380 C 1240,460 1220,540 1200,620" }
  ];

  /* ------------------------------------------------------------------------
     ETYKIETY MORZA
     ------------------------------------------------------------------------ */
  const seaLabels = [
    { x: 960, y: 900, text: "MORZE", size: 30, rotate: 0, cls: "sea" },
    { x: 1030, y: 1245, text: "MORZE POŁUDNIOWE", size: 20, rotate: 0, cls: "sea" },
    { x: 80, y: 760, text: "OCEAN", size: 24, rotate: -90, cls: "sea" },
    { x: 2012, y: 880, text: "OCEAN WSCHODNI", size: 16, rotate: 90, cls: "sea" }
  ];

  /* ------------------------------------------------------------------------
     API
     ------------------------------------------------------------------------ */
  function allEntries() {
    return continents.concat(regions, places, bishoprics);
  }
  function byId(id) {
    return allEntries().find(function (e) { return e.id === id; });
  }

  return {
    meta: meta,
    continents: continents,
    islands: islands,
    regions: regions,
    places: places,
    bishoprics: bishoprics,
    terrain: terrain,
    rivers: rivers,
    seaLabels: seaLabels,
    allEntries: allEntries,
    byId: byId
  };
})();
