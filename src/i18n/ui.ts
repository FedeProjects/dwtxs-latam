import {
  CATEGORIES,
  KEY_SPECS,
  SPEC_KEYS,
  SPEC_SECTIONS,
  SPEC_VALUE_KEYS,
  type Category,
  type KeySpec,
  type SpecKey,
  type SpecSection,
  type SpecValueKey,
} from '../content/specs';

export const languages = {
  pt: 'Português',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';
export const langs = Object.keys(languages) as Lang[];

/** BCP 47 tags, for `<html lang>`, `hreflang` and number formatting. */
export const locales: Record<Lang, string> = {
  pt: 'pt-BR',
  es: 'es',
};

// ---------------------------------------------------------------------------
// General UI strings. `pt` defines the keys; `es` must provide every one.
// ---------------------------------------------------------------------------

const uiPt = {
  'site.name': 'DWTXS LATAM',
  'nav.home': 'Início',
  'nav.machines': 'Máquinas',
  'nav.accessories': 'Acessórios',
  'nav.about': 'Sobre nós',
  'nav.contact': 'Contato',
  'model.keySpecs': 'Dados principais',
  'model.specSheet': 'Ficha técnica',
  'model.specNote':
    'Especificações de referência, sujeitas a alteração pelo fabricante sem aviso prévio.',
};

type UiKey = keyof typeof uiPt;

const uiEs: Record<UiKey, string> = {
  'site.name': 'DWTXS LATAM',
  'nav.home': 'Inicio',
  'nav.machines': 'Máquinas',
  'nav.accessories': 'Accesorios',
  'nav.about': 'Sobre nosotros',
  'nav.contact': 'Contacto',
  'model.keySpecs': 'Datos principales',
  'model.specSheet': 'Ficha técnica',
  'model.specNote':
    'Especificaciones de referencia, sujetas a cambios por parte del fabricante sin previo aviso.',
};

export const ui: Record<Lang, Record<UiKey, string>> = { pt: uiPt, es: uiEs };

// ---------------------------------------------------------------------------
// Catalog labels: categories and spec sheet (sections, row labels, text values).
// ---------------------------------------------------------------------------

type CatalogLabels = {
  categories: Record<Category, string>;
  sections: Record<SpecSection, string>;
  keys: Record<SpecKey, string>;
  values: Record<SpecValueKey, string>;
  keySpecs: Record<KeySpec, string>;
};

const catalogPt: CatalogLabels = {
  categories: {
    conventional: 'Convencional',
    'maxi-rig': 'Maxi-Rig',
    'all-terrain': 'All Terrain',
  },
  sections: {
    dimensions: 'Dimensões e peso',
    operatorStation: 'Posto do operador',
    powerPack: 'Unidade de potência',
    engine: 'Motor',
    hydraulics: 'Sistema hidráulico',
    undercarriage: 'Material rodante',
    mast: 'Mastro de perfuração',
    rotaryDrive: 'Cabeçote rotativo',
    carriage: 'Carro de avanço',
    wrench: 'Morsas',
    stakeDown: 'Ancoragem',
    pipeLoader: 'Carregador de hastes',
    crane: 'Guindaste',
    lighting: 'Iluminação',
    mudPump: 'Bomba de lama',
    drillPipe: 'Hastes de perfuração',
    pilotBit: 'Broca piloto',
    tools: 'Ferramentas',
  },
  keys: {
    dimensions: 'Comprimento × largura × altura',
    weight: 'Peso',
    entryAngle: 'Ângulo de entrada',
    cabin: 'Cabine',
    consoleRotation: 'Rotação do console',
    controlSystem: 'Sistema de controle',
    display: 'Monitor',
    controls: 'Comandos',
    engineMake: 'Marca',
    ratedPower: 'Potência nominal',
    ratedSpeed: 'Rotação nominal',
    fuelTank: 'Tanque de combustível',
    maxPressureRotary: 'Pressão máx. (rotação e carro)',
    maxPressureControl: 'Pressão máx. (sistema de controle)',
    hydraulicTank: 'Tanque hidráulico',
    structure: 'Estrutura',
    travel: 'Deslocamento',
    travelSpeed: 'Velocidade de deslocamento (frente e ré)',
    track: 'Esteira',
    trackWidth: 'Largura da sapata',
    rearStabilizer: 'Estabilizadores traseiros',
    fluidChannel: 'Canal de fluido',
    mastTransmission: 'Transmissão',
    rodSupport: 'Suporte de hastes',
    hoseCarrier: 'Porta-mangueiras',
    setupMode: 'Elevação do mastro',
    mastStand: 'Apoio do mastro',
    rotaryTorque: 'Torque',
    rotaryTorqueOuter: 'Torque (haste externa)',
    rotaryTorqueInner: 'Torque (haste interna)',
    rotarySpeed: 'Rotação',
    rotarySpeedOuter: 'Rotação (haste externa)',
    rotarySpeedInner: 'Rotação (haste interna)',
    rotaryTransmission: 'Transmissão',
    rotaryShaft: 'Eixo rotativo (rosca)',
    thrustPullback: 'Força máx. de empuxo/tração',
    carriageSpeed: 'Velocidade máx. do carro',
    carriageStroke: 'Curso máx. do carro',
    wrenchType: 'Tipo',
    slidingOnMast: 'Deslizante no mastro',
    breakoutTorque: 'Torque máx. de desaperto',
    threadGreasing: 'Lubrificação de roscas',
    clampRange: 'Faixa de fixação',
    anchoring: 'Tipo de ancoragem',
    anchorHoles: 'Pontos de ancoragem',
    extraBeamBars: 'Barras de apoio adicionais',
    pipeLoaderType: 'Tipo',
    rodBoxCapacity: 'Capacidade do magazine (hastes)',
    craneCapacity: 'Capacidade de elevação',
    craneControl: 'Comando',
    lights: 'Luzes',
    mudPumpType: 'Tipo',
    mudPumpFlow: 'Vazão',
    mudPumpPressure: 'Pressão máx.',
    gearShift: 'Troca de marchas',
    drillPipe: 'Haste (Ø × comprimento)',
    outerRod: 'Haste externa (Ø × comprimento)',
    innerRod: 'Haste interna (Ø × comprimento)',
    pipeThread: 'Rosca',
    beaconHousing: 'Alojamento da sonda',
    backreamerDiameters: 'Diâmetros de alargador',
  },
  values: {
    yes: 'Sim',
    automatic: 'Automática',
    sunshieldCanopy: 'Estrutura com toldo',
    closedCabinAc: 'Cabine fechada com ar-condicionado',
    fullClosedCabinAc: 'Cabine totalmente fechada, climatizada com ar-condicionado',
    containerRoomAc: 'Sala de operação tipo contêiner com ar-condicionado',
    electroHydraulic: 'Eletrônico e hidráulico',
    plcSelfDiagnostic: 'CLP eletrônico com autodiagnóstico',
    digitalSelfDiagnostic: 'Sistema digital eletrônico com autodiagnóstico',
    touchScreen10: 'Tela sensível ao toque de 10"',
    colorScreen10x3: '3 monitores coloridos de 10"',
    touchScreen10x3: '3 telas sensíveis ao toque de 10"',
    twoJoysticks: '2 joysticks',
    electroHydJoysticks: '2 joysticks eletro-hidráulicos',
    joysticksLevers: 'Joysticks e alavancas',
    boxWeldedFrame: 'Chassi soldado tipo caixa',
    selfPropelledCrawler: 'Autopropelido sobre esteiras',
    rubberTrack: 'De borracha',
    steelTrackRubberPad: 'De aço com sapatas de borracha',
    steelTrack: 'De aço',
    vertical: 'Verticais',
    rackPinion: 'Cremalheira e pinhão',
    fullLengthChain: 'Corrente porta-cabos em todo o comprimento',
    singleCylinder: 'Cilindro simples',
    doubleCylinder: 'Cilindro duplo',
    cylinder: 'Cilindro',
    gearbox: 'Caixa de engrenagens',
    clampJaw: 'Mordente de aperto',
    tripleJaw: 'Morsa tripla',
    quadJaw: 'Morsa quádrupla',
    hydraulicDoubleAnchoring: 'Hidráulica dupla',
    manualAnchoring: 'Manual',
    automaticPipeFeeding: 'Alimentação automática de hastes',
    singleRodLoader: 'Carregador de uma haste',
    outdoors: 'Externo',
    outsideRoom: 'Fora da cabine',
    roomWrenchRotary: 'Cabine, morsas e cabeçote',
    onBoard: 'Embarcada',
    wirelessWireline: 'Compatível com sonda sem fio ou com cabo',
  },
  keySpecs: {
    thrustPullback: 'Empuxo/tração',
    rotaryTorque: 'Torque máx.',
    enginePower: 'Potência do motor',
    weight: 'Peso',
    maxBackreamer: 'Alargador máx.',
    mudPumpFlow: 'Vazão da bomba de lama',
  },
};

const catalogEs: CatalogLabels = {
  categories: {
    conventional: 'Convencional',
    'maxi-rig': 'Maxi-Rig',
    'all-terrain': 'All Terrain',
  },
  sections: {
    dimensions: 'Dimensiones y peso',
    operatorStation: 'Puesto del operador',
    powerPack: 'Unidad de potencia',
    engine: 'Motor',
    hydraulics: 'Sistema hidráulico',
    undercarriage: 'Tren de rodaje',
    mast: 'Mástil de perforación',
    rotaryDrive: 'Cabezal rotativo',
    carriage: 'Carro de avance',
    wrench: 'Morsas',
    stakeDown: 'Anclaje',
    pipeLoader: 'Cargador de barras',
    crane: 'Grúa',
    lighting: 'Iluminación',
    mudPump: 'Bomba de lodo',
    drillPipe: 'Barras de perforación',
    pilotBit: 'Broca piloto',
    tools: 'Herramientas',
  },
  keys: {
    dimensions: 'Largo × ancho × alto',
    weight: 'Peso',
    entryAngle: 'Ángulo de entrada',
    cabin: 'Cabina',
    consoleRotation: 'Rotación de la consola',
    controlSystem: 'Sistema de control',
    display: 'Pantalla',
    controls: 'Mandos',
    engineMake: 'Marca',
    ratedPower: 'Potencia nominal',
    ratedSpeed: 'Régimen nominal',
    fuelTank: 'Tanque de combustible',
    maxPressureRotary: 'Presión máx. (rotación y carro)',
    maxPressureControl: 'Presión máx. (sistema de control)',
    hydraulicTank: 'Tanque hidráulico',
    structure: 'Estructura',
    travel: 'Traslación',
    travelSpeed: 'Velocidad de traslación (avance y retroceso)',
    track: 'Oruga',
    trackWidth: 'Ancho de zapata',
    rearStabilizer: 'Estabilizadores traseros',
    fluidChannel: 'Canal de fluido',
    mastTransmission: 'Transmisión',
    rodSupport: 'Soporte de barras',
    hoseCarrier: 'Portamangueras',
    setupMode: 'Elevación del mástil',
    mastStand: 'Apoyo del mástil',
    rotaryTorque: 'Torque',
    rotaryTorqueOuter: 'Torque (barra exterior)',
    rotaryTorqueInner: 'Torque (barra interior)',
    rotarySpeed: 'Velocidad de rotación',
    rotarySpeedOuter: 'Velocidad de rotación (barra exterior)',
    rotarySpeedInner: 'Velocidad de rotación (barra interior)',
    rotaryTransmission: 'Transmisión',
    rotaryShaft: 'Eje rotativo (rosca)',
    thrustPullback: 'Fuerza máx. de empuje/tiro',
    carriageSpeed: 'Velocidad máx. del carro',
    carriageStroke: 'Recorrido máx. del carro',
    wrenchType: 'Tipo',
    slidingOnMast: 'Deslizante sobre el mástil',
    breakoutTorque: 'Torque máx. de desenrosque',
    threadGreasing: 'Engrase de roscas',
    clampRange: 'Rango de sujeción',
    anchoring: 'Tipo de anclaje',
    anchorHoles: 'Puntos de anclaje',
    extraBeamBars: 'Barras de apoyo adicionales',
    pipeLoaderType: 'Tipo',
    rodBoxCapacity: 'Capacidad del cargador (barras)',
    craneCapacity: 'Capacidad de elevación',
    craneControl: 'Mando',
    lights: 'Luces',
    mudPumpType: 'Tipo',
    mudPumpFlow: 'Caudal',
    mudPumpPressure: 'Presión máx.',
    gearShift: 'Cambio de marchas',
    drillPipe: 'Barra (Ø × largo)',
    outerRod: 'Barra exterior (Ø × largo)',
    innerRod: 'Barra interior (Ø × largo)',
    pipeThread: 'Rosca',
    beaconHousing: 'Alojamiento de la sonda',
    backreamerDiameters: 'Diámetros de ensanchador',
  },
  values: {
    yes: 'Sí',
    automatic: 'Automático',
    sunshieldCanopy: 'Estructura con toldo parasol',
    closedCabinAc: 'Cabina cerrada con aire acondicionado',
    fullClosedCabinAc: 'Cabina totalmente cerrada, climatizada con aire acondicionado',
    containerRoomAc: 'Sala de operación tipo contenedor con aire acondicionado',
    electroHydraulic: 'Electrónico e hidráulico',
    plcSelfDiagnostic: 'PLC electrónico con autodiagnóstico',
    digitalSelfDiagnostic: 'Sistema digital electrónico con autodiagnóstico',
    touchScreen10: 'Pantalla táctil de 10"',
    colorScreen10x3: '3 monitores a color de 10"',
    touchScreen10x3: '3 pantallas táctiles de 10"',
    twoJoysticks: '2 joysticks',
    electroHydJoysticks: '2 joysticks electrohidráulicos',
    joysticksLevers: 'Joysticks y palancas',
    boxWeldedFrame: 'Chasis soldado tipo cajón',
    selfPropelledCrawler: 'Autopropulsado sobre orugas',
    rubberTrack: 'De goma',
    steelTrackRubberPad: 'De acero con zapatas de goma',
    steelTrack: 'De acero',
    vertical: 'Verticales',
    rackPinion: 'Cremallera y piñón',
    fullLengthChain: 'Cadena portacables en todo el largo',
    singleCylinder: 'Cilindro simple',
    doubleCylinder: 'Doble cilindro',
    cylinder: 'Cilindro',
    gearbox: 'Caja de engranajes',
    clampJaw: 'Mordaza de sujeción',
    tripleJaw: 'Morsa triple',
    quadJaw: 'Morsa cuádruple',
    hydraulicDoubleAnchoring: 'Hidráulico doble',
    manualAnchoring: 'Manual',
    automaticPipeFeeding: 'Alimentación automática de barras',
    singleRodLoader: 'Cargador de una barra',
    outdoors: 'Exterior',
    outsideRoom: 'Fuera de la cabina',
    roomWrenchRotary: 'Cabina, morsas y cabezal',
    onBoard: 'Incorporada',
    wirelessWireline: 'Compatible con sonda inalámbrica o por cable',
  },
  keySpecs: {
    thrustPullback: 'Empuje/tiro',
    rotaryTorque: 'Torque máx.',
    enginePower: 'Potencia del motor',
    weight: 'Peso',
    maxBackreamer: 'Ensanchador máx.',
    mudPumpFlow: 'Caudal de bomba de lodo',
  },
};

export const catalog: Record<Lang, CatalogLabels> = { pt: catalogPt, es: catalogEs };

// ---------------------------------------------------------------------------
// Build-time guard: `astro build` does not type-check, so fail loudly here if a
// translation is missing or empty in any language.
// ---------------------------------------------------------------------------

function assertComplete() {
  const missing: string[] = [];
  const check = (
    lang: Lang,
    group: string,
    dict: Record<string, string>,
    keys: readonly string[],
  ) => {
    for (const k of keys) if (!dict[k]?.trim()) missing.push(`${lang}.${group}.${k}`);
  };
  for (const lang of langs) {
    check(lang, 'ui', ui[lang], Object.keys(uiPt));
    check(lang, 'categories', catalog[lang].categories, CATEGORIES);
    check(lang, 'sections', catalog[lang].sections, SPEC_SECTIONS);
    check(lang, 'keys', catalog[lang].keys, SPEC_KEYS);
    check(lang, 'values', catalog[lang].values, SPEC_VALUE_KEYS);
    check(lang, 'keySpecs', catalog[lang].keySpecs, KEY_SPECS);
  }
  if (missing.length) throw new Error(`Missing translations: ${missing.join(', ')}`);
}

assertComplete();
