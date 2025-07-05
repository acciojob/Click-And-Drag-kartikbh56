document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const cubes = document.querySelectorAll('.cube');

    let activeCube = null;
    let offsetX, offsetY;

    // Initial positioning of cubes in a grid
    const cubeWidth = 100;
    const cubeHeight = 100;
    const gap = 10;
    const containerPadding = 10;
    const cubesPerRow = Math.floor((container.clientWidth - (2 * containerPadding)) / (cubeWidth + gap));

    cubes.forEach((cube, index) => {
        const row = Math.floor(index / cubesPerRow);
        const col = index % cubesPerRow;

        let initialLeft = containerPadding + col * (cubeWidth + gap);
        let initialTop = containerPadding + row * (cubeHeight + gap);

        // Ensure cubes don't overflow initially if container is too small
        if (initialLeft + cubeWidth > container.clientWidth - containerPadding) {
            initialLeft = container.clientWidth - containerPadding - cubeWidth;
        }
        if (initialTop + cubeHeight > container.clientHeight - containerPadding) {
            initialTop = container.clientHeight - containerPadding - cubeHeight;
        }

        cube.style.left = `${initialLeft}px`;
        cube.style.top = `${initialTop}px`;
    });

    cubes.forEach(cube => {
        cube.addEventListener('mousedown', (e) => {
            activeCube = cube;
            activeCube.classList.add('dragging');

            // Calculate the offset from the mouse pointer to the cube's top-left corner
            offsetX = e.clientX - activeCube.getBoundingClientRect().left;
            offsetY = e.clientY - activeCube.getBoundingClientRect().top;

            // Prevent default drag behavior to avoid issues
            e.preventDefault();
        });
    });

    container.addEventListener('mousemove', (e) => {
        if (!activeCube) return;

        // Calculate new position
        let newX = e.clientX - container.getBoundingClientRect().left - offsetX;
        let newY = e.clientY - container.getBoundingClientRect().top - offsetY;

        // Get container boundaries
        const containerRect = container.getBoundingClientRect();
        const cubeRect = activeCube.getBoundingClientRect();

        // Boundary conditions:
        // Left boundary
        if (newX < 0) {
            newX = 0;
        }
        // Right boundary
        if (newX + cubeRect.width > containerRect.width) {
            newX = containerRect.width - cubeRect.width;
        }
        // Top boundary
        if (newY < 0) {
            newY = 0;
        }
        // Bottom boundary
        if (newY + cubeRect.height > containerRect.height) {
            newY = containerRect.height - cubeRect.height;
        }

        activeCube.style.left = `${newX}px`;
        activeCube.style.top = `${newY}px`;
    });

    container.addEventListener('mouseup', () => {
        if (activeCube) {
            activeCube.classList.remove('dragging');
            activeCube = null;
        }
    });

    // Handle mouseleave from container to release cube if dragged outside and then mouseup occurs
    container.addEventListener('mouseleave', () => {
        if (activeCube) {
            activeCube.classList.remove('dragging');
            activeCube = null;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelector('.items');

    let isDown = false;
    let startX;
    let scrollLeft;

    items.addEventListener('mousedown', (e) => {
        isDown = true;
        items.classList.add('active');
        startX = e.pageX - items.offsetLeft;
        scrollLeft = items.scrollLeft;
    });

    items.addEventListener('mouseleave', () => {
        isDown = false;
        items.classList.remove('active');
    });

    items.addEventListener('mouseup', () => {
        isDown = false;
        items.classList.remove('active');
    });

    items.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - items.offsetLeft;
        const walk = (x - startX); // You can multiply for speed
        items.scrollLeft = scrollLeft - walk;
    });
});
