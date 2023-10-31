const ramenVolumes = ["小盛り", "並盛り", "大盛り"];
const ramenToppings = ["にんにく", "生姜", "生クリーム", "チョコレート"];

export type FieldDataItem = {
  name: string;
  options1?: typeof ramenVolumes;
  options2?: typeof ramenToppings;
};

export const nameOnlyFieldData: FieldDataItem[] = [
  { name: "この中に無い" },
  { name: "おまかせ" },
];

export const ramenFieldData: FieldDataItem[] = [
  { name: "塩", options1: ramenVolumes, options2: ramenToppings },
  { name: "味噌", options1: ramenVolumes, options2: ramenToppings },
  { name: "醤油", options1: ramenVolumes, options2: ramenToppings },
  ...nameOnlyFieldData,
];
