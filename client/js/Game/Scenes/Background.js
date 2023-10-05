const CreateBackground = scene => {
    const sceneWidth = scene.sys.game.config.width;
    const sceneHeight = scene.sys.game.config.height;
    const background = scene.add.image(0, 0, 'backgroundImg').setOrigin(0, 0);
    background.setScale(sceneWidth / background.width, sceneHeight / background.height);
    background.setDepth(-1);
}

export default CreateBackground;