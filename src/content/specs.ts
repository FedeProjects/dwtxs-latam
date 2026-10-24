// Whitelists for the machine spec sheet. The content schema validates YAML against these lists,
// and the i18n dictionary must provide a label for every entry (see src/i18n/ui.ts).

export const SPEC_SECTIONS = [
  'dimensions',
  'operatorStation',
  'powerPack',
  'engine',
  'hydraulics',
  'undercarriage',
  'mast',
  'rotaryDrive',
  'carriage',
  'wrench',
  'stakeDown',
  'pipeLoader',
  'crane',
  'lighting',
  'mudPump',
  'drillPipe',
  'pilotBit',
  'tools',
] as const;

export const SPEC_KEYS = [
  // generic
  'dimensions',
  'weight',
  'entryAngle',
  // operator station
  'cabin',
  'consoleRotation',
  'controlSystem',
  'display',
  'controls',
  // engine
  'engineMake',
  'ratedPower',
  'ratedSpeed',
  'fuelTank',
  // hydraulics
  'maxPressureRotary',
  'maxPressureControl',
  'hydraulicTank',
  // undercarriage
  'structure',
  'travel',
  'travelSpeed',
  'track',
  'trackWidth',
  'rearStabilizer',
  // mast
  'fluidChannel',
  'mastTransmission',
  'rodSupport',
  'hoseCarrier',
  'setupMode',
  'mastStand',
  // rotary drive
  'rotaryTorque',
  'rotaryTorqueOuter',
  'rotaryTorqueInner',
  'rotarySpeed',
  'rotarySpeedOuter',
  'rotarySpeedInner',
  'rotaryTransmission',
  'rotaryShaft',
  // carriage
  'thrustPullback',
  'carriageSpeed',
  'carriageStroke',
  // wrench
  'wrenchType',
  'slidingOnMast',
  'breakoutTorque',
  'threadGreasing',
  'clampRange',
  // stake down
  'anchoring',
  'anchorHoles',
  'extraBeamBars',
  // pipe loader
  'pipeLoaderType',
  'rodBoxCapacity',
  // crane
  'craneCapacity',
  'craneControl',
  // lighting
  'lights',
  // mud pump
  'mudPumpType',
  'mudPumpFlow',
  'mudPumpPressure',
  'gearShift',
  // drill pipe
  'drillPipe',
  'outerRod',
  'innerRod',
  'pipeThread',
  // pilot bit
  'beaconHousing',
  // tools
  'backreamerDiameters',
] as const;

/** Text values that must be translated (spec sheet values that are words, not numbers or codes). */
export const SPEC_VALUE_KEYS = [
  'yes',
  'automatic',
  'sunshieldCanopy',
  'closedCabinAc',
  'fullClosedCabinAc',
  'containerRoomAc',
  'electroHydraulic',
  'plcSelfDiagnostic',
  'digitalSelfDiagnostic',
  'touchScreen10',
  'colorScreen10x3',
  'touchScreen10x3',
  'twoJoysticks',
  'electroHydJoysticks',
  'joysticksLevers',
  'boxWeldedFrame',
  'selfPropelledCrawler',
  'rubberTrack',
  'steelTrackRubberPad',
  'steelTrack',
  'vertical',
  'rackPinion',
  'fullLengthChain',
  'singleCylinder',
  'doubleCylinder',
  'cylinder',
  'gearbox',
  'clampJaw',
  'tripleJaw',
  'quadJaw',
  'hydraulicDoubleAnchoring',
  'manualAnchoring',
  'automaticPipeFeeding',
  'singleRodLoader',
  'outdoors',
  'outsideRoom',
  'roomWrenchRotary',
  'onBoard',
  'wirelessWireline',
] as const;

/** Specs shown on cards and used to compare models. */
export const KEY_SPECS = [
  'thrustPullback',
  'rotaryTorque',
  'enginePower',
  'weight',
  'maxBackreamer',
  'mudPumpFlow',
] as const;

export const CATEGORIES = ['conventional', 'maxi-rig', 'all-terrain'] as const;

export type SpecSection = (typeof SPEC_SECTIONS)[number];
export type SpecKey = (typeof SPEC_KEYS)[number];
export type SpecValueKey = (typeof SPEC_VALUE_KEYS)[number];
export type KeySpec = (typeof KEY_SPECS)[number];
export type Category = (typeof CATEGORIES)[number];
