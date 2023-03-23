//Type of help offered / requested by advertisement
export enum AdvertisementHelpType {
  //Type of help which would be chosen when someone wants to offer car, driver capabilities or both
  RIDE='ride',
  //The most general type of material help
  //Should be used when no other kind of material help is suitable
  //It also should be used when help contains more than one kind of material
  MATERIAL='material',
  FOOD_AND_WATER='food_and_water',
  //Equipment used during response to emergency.
  //Example given: fire extinguisher, drone, bulldozers, cranes, radios...
  EMERGENCY_RESPONSE_EQUIPMENT='emergency_response_equipment',
  //All kind of drugs, medical equipment (although it some of these would fit category above, I would like it to be there)
  MEDICAL_SUPPLIES='medical_supplies',
  //When someone offers his physical strength to solve the problem...
  MANUAL_WORK='manual_work',
  //Doctors, nurses, paramedical, ... who can offer help (mostly) during their free time
  MEDICAL_ASSISTANCE='medical_assistance',
  //People who can offer psychological assistance to people
  PSYCHOLOGICAL_HELP='psychological_help',
  //Help with administration during disaster (filling papers, talking with office guys...)
  ADMINISTRATION='administration',
  OTHER='other'
}