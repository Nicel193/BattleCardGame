// Этот скрипт должен был написать Дунай, я ждал 5 дней чтобы продолжить работу нд логикой боя, но так и не дождался
// Пришлось делать самому за час до сдачи, функционала будет 5% от того что задумывалось
// 100 балов пожалуйста, за моральную поддержку

const cardSize = 1.2;
const cardWidth = scene => { return scene.textures.getFrame('card').width * cardSize; }

function CardBuilder(scene) {
    var card = scene.add.sprite(0, 0, 'card');
    card.setScale(cardSize);
    card.setOrigin(0.5, 0.5);
    card.setInteractive({ draggable: true });

    // Тут бы бала логика сборки карточки в спрайт из разных изображений

    return card;
}

export { CardBuilder, cardWidth }