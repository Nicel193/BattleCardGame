function createSpritesFromImage(texture, elementCount) {
  const imageWidth = texture.width;
  const imageHeight = texture.height;

  const spriteWidth = imageWidth / elementCount;
  const spriteHeight = imageHeight;

  const sprites = [];

  for (let i = 0; i < elementCount; i++) {
    const x = i * spriteWidth;
    const y = 0;

    const sprite = new Phaser.GameObjects.Sprite(null, x + spriteWidth / 2, y + spriteHeight / 2, texture.key);
    sprite.setOrigin(0.5);
    sprite.setFrame(i);

    sprites.push(sprite);
  }

  return sprites;
}

// Test data for Ruslan
// const elementCount = 24; 
// const textureKey = 'Elements'; 
// const sprites = createSpritesFromImage(this.textures.get(textureKey), elementCount);

