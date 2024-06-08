document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.draggable');
    const boatContainer = document.getElementById('boat-container');
    const leftBank = document.getElementById('left-bank');
    const rightBank = document.getElementById('right-bank');
    let boatOnLeft = true;

    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    boatContainer.addEventListener('dragover', dragOver);
    boatContainer.addEventListener('drop', drop);

    leftBank.addEventListener('dragover', dragOver);
    leftBank.addEventListener('drop', drop);

    rightBank.addEventListener('dragover', dragOver);
    rightBank.addEventListener('drop', drop);

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target.closest('.bank') || event.target.closest('#boat-container');

        if (dropzone) {
            dropzone.appendChild(draggableElement);
            draggableElement.style.position = 'relative';
            draggableElement.style.bottom = '0';
            draggableElement.style.left = '0';
            draggableElement.style.margin = '5px';
            checkGameState();
        }
    }

    document.getElementById('move-button').addEventListener('click', moveBoat);

    function moveBoat() {
        if (boatOnLeft) {
            boatContainer.style.left = 'calc(100% - 100px)'; // 오른쪽으로 이동
            boatOnLeft = false;
        } else {
            boatContainer.style.left = '0'; // 왼쪽으로 이동
            boatOnLeft = true;
        }
        checkGameState();
    }

    function checkGameState() {
        const wolf = document.getElementById('wolf');
        const sheep = document.getElementById('sheep');
        const cabbage = document.getElementById('cabbage');
        const shipman = document.getElementById('shipman');

        const leftBankItems = Array.from(leftBank.children);
        const rightBankItems = Array.from(rightBank.children);
        const boatItems = Array.from(boatContainer.children);

        if (boatOnLeft) {
            if (isGameOver(leftBankItems, boatItems.includes(shipman))) return;
        } else {
            if (isGameOver(rightBankItems, boatItems.includes(shipman))) return;
        }

        if (boatItems.includes(wolf) && boatItems.includes(sheep) && !boatItems.includes(shipman) ||
            boatItems.includes(sheep) && boatItems.includes(cabbage) && !boatItems.includes(shipman)) {
            alert('게임 오버!');
        }
    }

    function isGameOver(bankItems, shipmanOnBank) {
        const wolf = document.getElementById('wolf');
        const sheep = document.getElementById('sheep');
        const cabbage = document.getElementById('cabbage');

        if (!shipmanOnBank) {
            if (bankItems.includes(wolf) && bankItems.includes(sheep) && !bankItems.includes(cabbage) ||
                bankItems.includes(sheep) && bankItems.includes(cabbage) && !bankItems.includes(wolf)) {
                alert('게임 오버!');
                return true;
            }
        }
        return false;
    }
});
