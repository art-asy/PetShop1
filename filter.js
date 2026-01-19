document.addEventListener('DOMContentLoaded', () => {
    const filterItems = document.querySelectorAll('.filter-circle-item');
    
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.querySelector('.filter-label').textContent.trim();
            
            filterItems.forEach(el => el.querySelector('.circle-icon').style.border = 'none');
            filterCards(selectedCategory);
        });
    });

    function filterCards(category) {
        
        let cards = document.querySelectorAll('.pets-grid .pet-card'); // головна
        if (cards.length === 0) {
            cards = document.querySelectorAll('.blog-grid .breed-card'); // Блог
        }

        const categoryMap = {
            'Cats': 'Коти',
            'Dogs': 'Собаки',
            'Birds': 'Птахи',
            'Rodents': 'Гризуни',
            'Fish': 'Риби',
            'Reptiles': 'Рептилії',
            'Інше': 'Інше'
        };

        const targetSpecies = categoryMap[category] || category; 

        cards.forEach(card => {
        });
        
        if (typeof window.loadPets === 'function') {
            renderFilteredPets(targetSpecies);
        } else if (typeof window.loadBreeds === 'function') {
            renderFilteredBreeds(targetSpecies);
        }
    }
});


function renderFilteredPets(species) {
    const petsGrid = document.getElementById('pets-grid');
    if (!petsGrid) return;
    
    petsGrid.innerHTML = '';
    
    let allPets = window.LocalDB.getPets();
    
    if (species && species !== 'Інше') { 
         allPets = allPets.filter(pet => pet.breeds.species === species);
    }
    
    if (allPets.length === 0) {
        petsGrid.innerHTML = '<p style="padding:20px">Нікого не знайдено в цій категорії.</p>';
        return;
    }

    allPets.forEach(pet => {
        const breedName = pet.breeds?.name || 'Unknown';
        const imageUrl = pet.photo_urls[0] || '1/dog.png';
        const isLiked = window.LocalDB.isFavorite(pet.id);
        const likeIcon = isLiked ? '1/Like2.png' : '1/Like1.png';

        const cardHTML = `
            <a href="pet-details.html?id=${pet.id}" class="pet-card">
                <div class="pet-card-image-area" style="background-image: url('${imageUrl}');">
                    <button class="like-button" style="background-image: url('${likeIcon}')" onclick="toggleLike(event, '${pet.id}', 'Home')"></button>
                </div>
                <div class="pet-card-info">
                    <div class="pet-card-text">
                        <span class="pet-title">${breedName}</span>
                        <span class="pet-age">${pet.age}</span>
                    </div>
                    <div class="price-badge">${pet.price} $</div>
                </div>
            </a>
        `;
        petsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function renderFilteredBreeds(species) {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    let allBreeds = window.LocalDB.getBreeds();
    
    if (species && species !== 'Інше') {
        allBreeds = allBreeds.filter(breed => breed.species === species);
    }

    if (allBreeds.length === 0) {
        grid.innerHTML = '<p style="padding:20px">Порід не знайдено.</p>';
        return;
    }

    allBreeds.forEach(breed => {
        const isLiked = window.LocalDB.isFavorite(breed.id);
        const likeIcon = isLiked ? '1/LikeW2.png' : '1/LikeW1.png';

        const cardHTML = `
            <a href="breed-details.html?id=${breed.id}" class="breed-card" style="background: linear-gradient(0.02deg, rgba(142, 131, 169, 0.9) 0.02%, rgba(201, 195, 222, 0.4) 60.09%, rgba(201, 195, 222, 0.1) 99.98%), url('${breed.image_url}'); background-size: cover; background-position: center;">
                <button class="like-button" style="background-image: url('${likeIcon}')" onclick="toggleLike(event, '${breed.id}', 'Blog', true)"></button>
                <span class="breed-title">${breed.name}</span>
            </a>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}