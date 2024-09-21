export const genCollectionInfo = ({
  end_electricity,
  begin_electricity,
  end_water,
  begin_water,
  electricity_unit_price,
  water_unit_price,
  rent_fee,
  other_fee,
  deduction,
}: {
  end_electricity: number,
  begin_electricity: number,
  end_water: number,
  begin_water: number,
  electricity_unit_price: number,
  water_unit_price: number,
  rent_fee: number,
  other_fee: number,
  deduction: number
}) => {
  const noOfElectricity = end_electricity - begin_electricity
  const noOfWater = end_water - begin_water
  const amountElectricity = noOfElectricity * electricity_unit_price
  const amountWater = noOfWater * water_unit_price

  const amountDue = rent_fee + amountElectricity + amountWater + other_fee - deduction
  return {
    noOfElectricity,
    noOfWater,
    amountDue,
    amountElectricity,
    amountWater,
  }
}