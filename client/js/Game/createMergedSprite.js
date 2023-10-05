import Phaser from 'phaser';

export function createMergedSprite(scene, backgroundTexture, healthTexture, manaTexture, x, y) {
  const width =  100;
  const height =  300;
  
  const canvasTexture = scene.textures.createCanvas('mergedTexture', width, height);
  const context = canvasTexture.context;
  
  context.drawImage(backgroundTexture.getSourceImage(), 0, 0, width, height);
  
  context.drawImage(healthTexture.getSourceImage(), healthX, healthY, healthWidth, healthHeight);
  
  context.drawImage(manaTexture.getSourceImage(), manaX, manaY, manaWidth, manaHeight);
  
  canvasTexture.refresh();

  const mergedSprite = scene.add.sprite(x, y, 'mergedTexture');
  return mergedSprite;
}
