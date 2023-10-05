export default class Card {
    constructor(type, attribute_score, mana_card) {
      this.type = type;
      this.attribute_score = attribute_score;
      this.mana_card = mana_card;
    

    this.images = {
      'heal': ['heal_image1.png', 'heal_image2.png', 'heal_image3.png'], 
      'power up': ['power_up_image1.png', 'power_up_image2.png'], 
      'damage': ['damage_image1.png', 'damage_image2.png'], 
      'armor': ['armor_image1.png', 'armor_image2.png'] 
  };
}
  getImageArray() {
    return this.images[this.type] || []; 
  }
}

   