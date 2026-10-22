/* ==========================================================================
   MAPA ŚWIATA FELOROST — dane
   Wersja: 1.0 — KONTYNENTY, PAŃSTWA I KORONA
   Układ wg wskazówek:
   - Vermindor: największy, od prawej krawędzi, podłużny w lewo; wyraźna
     północ i część południowo-wschodnia.
   - Multikonia: pod Vermindorem, pozioma, mniej więcej o połowę mniejsza.
   - Mythrandia: najdalej na zachód, podłużna z północy na południe.
   ========================================================================== */
window.SWIAT = (function () {

  const meta = {
    title: "Felorost",
    subtitle: "Interaktywna mapa świata",
    version: "1.0",
    canvas: { w: 3600, h: 2200 },
    note: "Wersja 1.0 — kontynenty, państwa i Korona Krulestwa Multikont."
  };

  const continents = [
    {
      id: "vermindor",
      name: "Vermindor",
      type: "kontynent",
      category: "kontynent",
      d: "M 930,620 C 950,540 1010,490 1100,465 C 1190,440 1270,410 1350,380 C 1430,350 1500,330 1560,310 C 1620,290 1680,300 1740,330 C 1800,360 1840,380 1900,360 C 1960,340 1980,240 2030,170 C 2080,100 2160,95 2220,150 C 2280,205 2300,300 2360,320 C 2420,340 2480,300 2540,310 C 2600,320 2660,360 2720,350 C 2780,340 2840,300 2900,300 C 2960,300 3020,330 3080,350 C 3140,370 3200,360 3260,380 C 3320,400 3380,420 3430,460 C 3480,500 3500,560 3490,620 C 3480,680 3440,730 3420,790 C 3400,850 3420,910 3390,970 C 3360,1030 3300,1070 3240,1110 C 3180,1150 3110,1180 3030,1170 C 2950,1160 2880,1120 2800,1100 C 2720,1080 2650,1090 2570,1070 C 2490,1050 2420,1010 2340,990 C 2260,970 2180,980 2100,960 C 2020,940 1950,900 1870,880 C 1790,860 1710,870 1630,850 C 1550,830 1480,790 1400,770 C 1320,750 1240,760 1160,740 C 1080,720 1000,740 960,700 C 935,675 920,660 930,620 Z",
      label: { x: 2180, y: 560, size: 58 },
      wiki: "vermindor",
      description: "Największy kontynent Felorostu, rozciągający się z zachodu na wschód. Ma wyraźnie zarysowaną północ oraz część południowo-wschodnią. Obejmuje Wielką Pustynię, Wielki Wulkan, Azurową Dolinę i wschodnie góry Imperium Felorków."
    },
    {
      id: "multikonia",
      name: "Multikonia",
      type: "kontynent",
      category: "kontynent",
      d: "M 1180,1430 C 1230,1370 1310,1340 1400,1330 C 1490,1320 1570,1350 1660,1340 C 1750,1330 1830,1290 1920,1290 C 2010,1290 2090,1320 2180,1320 C 2270,1320 2350,1290 2440,1300 C 2530,1310 2610,1350 2690,1370 C 2770,1390 2840,1430 2890,1490 C 2940,1550 2960,1620 2940,1690 C 2920,1760 2870,1820 2800,1860 C 2730,1900 2650,1910 2560,1930 C 2470,1950 2380,1960 2290,1950 C 2200,1940 2110,1910 2020,1900 C 1930,1890 1840,1910 1750,1890 C 1660,1870 1580,1830 1500,1810 C 1420,1790 1340,1800 1270,1760 C 1200,1720 1170,1650 1160,1580 C 1150,1510 1140,1470 1180,1430 Z",
      label: { x: 2050, y: 1610, size: 46 },
      wiki: "multikonia",
      description: "Kontynent położony na południe od Vermindoru, poziomy i mniej więcej o połowę mniejszy. Leży tu Tarkwinogród — stolica Korony Krulestwa Multikont."
    },
    {
      id: "mythrandia-kontynent",
      name: "Mythrandia",
      type: "kontynent",
      category: "kontynent",
      d: "M 340,300 C 390,270 450,270 500,295 C 550,320 580,370 610,420 C 640,470 670,520 675,580 C 680,640 650,700 660,760 C 670,820 700,880 690,940 C 680,1000 640,1050 650,1110 C 660,1170 690,1220 680,1280 C 670,1340 630,1390 620,1450 C 610,1510 630,1570 610,1630 C 590,1690 540,1730 490,1760 C 440,1790 380,1790 330,1760 C 280,1730 250,1680 235,1620 C 220,1560 230,1500 220,1440 C 210,1380 185,1330 195,1270 C 205,1210 240,1160 235,1100 C 230,1040 200,990 210,930 C 220,870 255,820 250,760 C 245,700 215,650 225,590 C 235,530 270,480 290,430 C 310,380 300,330 340,300 Z",
      label: { x: 445, y: 1030, size: 44 },
      wiki: "mythrandia-kontynent",
      description: "Kontynent na dalekim zachodzie, rozciągający się z północy na południe. Kolonizowany przez felorki leśne i morskie; w 29 TE powstała tam Federacja Mythrandii."
    }
  ];

  // Państwa i księstwa pochodzą z danych mapy (MAPA/data/entries.js).
  const mapEntries = window.FELOROST_ENTRIES || { states: [], duchies: [] };
  const mapStates = (mapEntries.states || []).map(function (s) {
    return Object.assign({}, s, {
      type: (s.type || "Państwo").toLowerCase(),
      category: s.category || "panstwo",
      mapId: s.id
    });
  });
  const mapDuchies = (mapEntries.duchies || []).map(function (d) {
    return Object.assign({}, d, {
      type: "księstwo",
      category: "korona",
      mapId: d.id
    });
  });
  const mapPlaces = mapStates.concat(mapDuchies);
  const mapIds = {};
  mapPlaces.forEach(function (e) { mapIds[e.id] = true; });
  const baseContinents = continents.filter(function (c) { return !mapIds[c.id]; });

  const islands = [];
  const regions = [];
  const places = mapPlaces;
  const bishoprics = [];
  const terrain = { mountains: [], forests: [], deserts: [], swamps: [], volcano: null };
  const rivers = [];

  const seaLabels = [
    { x: 1950, y: 1245, text: "MORZE", size: 40, rotate: 0, cls: "sea" },
    { x: 820, y: 1250, text: "OCEAN", size: 40, rotate: -90, cls: "sea" }
  ];

  function allEntries() {
    return baseContinents.concat(regions, places, bishoprics);
  }
  function byId(id) {
    return allEntries().find(function (e) { return e.id === id; });
  }

  return {
    meta: meta,
    continents: baseContinents,
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
