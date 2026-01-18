// --- ДАНІ (DEFAULTS) ---

const defaultUsers = [
    { id: '192f02ef-dede-4356-bde3-fd85edf03f06', login: 'kitty_cat', password: 'password123', avatar_url: null },
    { id: '58c7c80c-8b88-43e7-92f5-acba78860baa', login: 'dog_lover_99', password: 'password123', avatar_url: null },
    { id: '8558920d-85f3-4267-89b8-65506d45c64e', login: 'happypaws', password: 'password123', avatar_url: null },
    { id: 'c4e98220-9b28-4bed-84db-696c142dde79', login: 'admin_pet', password: 'password123', avatar_url: null },
    { id: 'd858ce07-6a8f-46bf-992d-1c4c6f00d194', login: 'breeder_master', password: 'password123', avatar_url: null }
];

let users = JSON.parse(localStorage.getItem('petmarket_users')) || defaultUsers;
function saveUsers() { localStorage.setItem('petmarket_users', JSON.stringify(users)); }

let favorites = JSON.parse(localStorage.getItem('petmarket_favorites')) || [];
function saveFavorites() { localStorage.setItem('petmarket_favorites', JSON.stringify(favorites)); }

// ІСТОРІЯ ПЕРЕГЛЯДІВ
let recentlyViewed = JSON.parse(localStorage.getItem('petmarket_recent')) || [];
function saveRecent() { localStorage.setItem('petmarket_recent', JSON.stringify(recentlyViewed)); }

let CURRENT_USER_ID = localStorage.getItem('petmarket_user_id') || null;

// --- ДАНІ ПРО ТВАРИН ТА ПОРОДИ (СТАТИЧНІ) ---
const breeds = [
    // КОТИ
    { id: '11f2b25f-575a-4bdd-9ecf-0a510008d5bf', name: 'Перська', species: 'Коти', care_difficulty: 'Висока', life_span: '10-15 років', price_range: '400-900$', full_description: 'Перська кішка — одна з найстаріших і найпопулярніших порід. Відрізняється довгою пухнастою шерстю та спокійним характером.', temperament: 'Спокійний', trainability: 'Середня', size: 'Середній', faq_json: [{q: 'Чи сильно линяють?', a: 'Так, потребують щоденного вичісування.'}], image_url: '1/cat.png' },
    { id: '19504f5c-f46d-429a-816c-beb346b6a7ce', name: 'Норвезька лісова', species: 'Коти', care_difficulty: 'Середня', life_span: '14-16 років', price_range: '500-1000$', full_description: 'Велика порода кішок з густою водовідштовхувальною шерстю.', temperament: 'Незалежний', trainability: 'Низька', size: 'Великий', faq_json: [], image_url: '1/cat.png' },
    { id: '31cf75a7-59dd-4b96-87f7-d54a50a8a501', name: 'Бенгальська', species: 'Коти', care_difficulty: 'Середня', life_span: '12-16 років', price_range: '800-2000$', full_description: 'Кішка з виглядом леопарда і характером домашнього улюбленця.', temperament: 'Активний', trainability: 'Висока', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    { id: '446aacbb-54f9-4e43-9164-16856dd6e9ec', name: 'Сфінкс', species: 'Коти', care_difficulty: 'Висока', life_span: '12-15 років', price_range: '600-1200$', full_description: 'Кішка без шерсті, але з гарячим серцем. Дуже тактильні.', temperament: 'Ласкавий', trainability: 'Середня', size: 'Середній', faq_json: [{q: 'Чи мерзнуть?', a: 'Так, потрібен одяг.'}], image_url: '1/cat.png' },
    { id: '4633d238-87b7-4ed6-97a5-10b87ec462dd', name: 'Сіамська', species: 'Коти', care_difficulty: 'Низька', life_span: '15-20 років', price_range: '300-800$', full_description: 'Балакучі кішки.', temperament: 'Гучний', trainability: 'Висока', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    { id: '58ff0361-b3e4-4617-b8c6-76486b400fb9', name: 'Абіссинська', species: 'Коти', care_difficulty: 'Середня', life_span: '12-15 років', price_range: '500-1100$', full_description: 'Активна кішка.', temperament: 'Активний', trainability: 'Висока', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    { id: '6dac466e-b392-4160-8fe4-bc18ee5cf8bc', name: 'Ангорська', species: 'Коти', care_difficulty: 'Середня', life_span: '12-16 років', price_range: '300-600$', full_description: 'Елегантна кішка.', temperament: 'Спокійний', trainability: 'Середня', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    { id: '833e6f66-e484-4832-8c15-2438548269ac', name: 'Бурманська', species: 'Коти', care_difficulty: 'Низька', life_span: '13-16 років', price_range: '500-900$', full_description: 'Кішка-компаньйон.', temperament: 'Соціальний', trainability: 'Висока', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    { id: '8f02cec0-f51a-47fa-89b5-1b9fbadfeab6', name: 'Британська короткошерста', species: 'Коти', care_difficulty: 'Низька', life_span: '12-14 років', price_range: '400-1000$', full_description: 'Плюшевий ведмедик.', temperament: 'Флегматичний', trainability: 'Низька', size: 'Великий', faq_json: [], image_url: '1/cat.png' },
    { id: '96c0366e-484e-4465-a478-950688993773', name: 'Мейн-кун', species: 'Коти', care_difficulty: 'Середня', life_span: '12-15 років', price_range: '500-1500$', full_description: 'Ніжний велетень.', temperament: 'Добрий', trainability: 'Середня', size: 'Дуже великий', faq_json: [], image_url: '1/cat.png' },
    { id: 'b3d346de-28af-4cf4-a5f8-4602b17fff03', name: 'Рэгдолл', species: 'Коти', care_difficulty: 'Низька', life_span: '12-17 років', price_range: '700-1500$', full_description: 'Кішка-"лялька".', temperament: 'Спокійний', trainability: 'Низька', size: 'Великий', faq_json: [], image_url: '1/cat.png' },
    { id: 'ba5fa390-2067-45b6-b1dd-34640850d4a3', name: 'Оцикет', species: 'Коти', care_difficulty: 'Низька', life_span: '12-15 років', price_range: '600-1200$', full_description: 'Виглядає як дикий кіт.', temperament: 'Активний', trainability: 'Висока', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    { id: 'cb766226-a4bd-4061-bfec-4703e601ff58', name: 'Сибірська', species: 'Коти', care_difficulty: 'Низька', life_span: '12-15 років', price_range: '400-900$', full_description: 'Аборигенна порода.', temperament: 'Незалежний', trainability: 'Середня', size: 'Великий', faq_json: [], image_url: '1/cat.png' },
    { id: 'eebfff0d-eec2-46bc-8dfa-5315df978bbd', name: 'Російська блакитна', species: 'Коти', care_difficulty: 'Низька', life_span: '15-18 років', price_range: '400-800$', full_description: 'Граціозна кішка.', temperament: 'Сором\'язливий', trainability: 'Середня', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    { id: 'faa9f0c9-4cd2-4abc-b381-5ab080ce71bc', name: 'Шотландська висловуха', species: 'Коти', care_difficulty: 'Низька', life_span: '12-15 років', price_range: '300-700$', full_description: 'Кішка з кумедними вушками.', temperament: 'Спокійний', trainability: 'Низька', size: 'Середній', faq_json: [], image_url: '1/cat.png' },
    // СОБАКИ
    { id: '15c1ffa2-38cb-4f2c-9667-de764ec518df', name: 'Мопс', species: 'Собаки', care_difficulty: 'Низька', life_span: '12-15 років', price_range: '500-1200$', full_description: 'Декоративна собака.', temperament: 'Грайливий', trainability: 'Середня', size: 'Малий', faq_json: [{q: 'Чи хропуть?', a: 'Так.'}], image_url: '1/dog.png' },
    { id: '1890f3c8-eeda-4758-9af4-29bc397ba011', name: 'Хаскі', species: 'Собаки', care_difficulty: 'Висока', life_span: '12-15 років', price_range: '400-1200$', full_description: 'Їздова собака.', temperament: 'Енергійний', trainability: 'Висока', size: 'Середній', faq_json: [{q: 'Скільки гуляти?', a: 'Багато.'}], image_url: '1/Husky dogs.jpg' },
    { id: '322e3fac-76b4-4b62-8d94-48ff7fb570aa', name: 'Коргі', species: 'Собаки', care_difficulty: 'Середня', life_span: '12-15 років', price_range: '800-2000$', full_description: 'Улюбленці королеви.', temperament: 'Доброзичливий', trainability: 'Висока', size: 'Малий', faq_json: [], image_url: '1/dog.png' },
    { id: '3e04b7f5-8b02-4214-93ad-005f9d117f01', name: 'Німецька вівчарка', species: 'Собаки', care_difficulty: 'Середня', life_span: '9-13 років', price_range: '500-1500$', full_description: 'Службова собака.', temperament: 'Врівноважений', trainability: 'Дуже висока', size: 'Великий', faq_json: [], image_url: '1/dog.png' },
    { id: '3f71dd60-723f-4c0e-b6dd-9a4a01d59ffc', name: 'Доберман', species: 'Собаки', care_difficulty: 'Висока', life_span: '10-13 років', price_range: '700-1800$', full_description: 'Охоронець.', temperament: 'Пильний', trainability: 'Висока', size: 'Великий', faq_json: [], image_url: '1/dog.png' },
    { id: '449974f1-4380-4ca8-9768-4ec93d876b07', name: 'Ши-тцу', species: 'Собаки', care_difficulty: 'Висока', life_span: '10-16 років', price_range: '500-1300$', full_description: 'Собака-лев.', temperament: 'Гордий', trainability: 'Низька', size: 'Малий', faq_json: [], image_url: '1/dog.png' },
    { id: '4deb9f71-9fcd-4c02-92c6-6b03c873cccc', name: 'Лабрадор', species: 'Собаки', care_difficulty: 'Низька', life_span: '10-12 років', price_range: '500-1400$', full_description: 'Сімейна собака.', temperament: 'Дружній', trainability: 'Висока', size: 'Великий', faq_json: [], image_url: '1/dog.png' },
    { id: '54dad0f3-c843-4e3d-883b-1f606a7da31a', name: 'Пудель', species: 'Собаки', care_difficulty: 'Висока', life_span: '12-15 років', price_range: '600-1500$', full_description: 'Розумна порода.', temperament: 'Розумний', trainability: 'Дуже висока', size: 'Різний', faq_json: [], image_url: '1/dog.png' },
    { id: '66cb8bbd-209a-4a9e-aaa3-21241d6219af', name: 'Чихуахуа', species: 'Собаки', care_difficulty: 'Низька', life_span: '12-20 років', price_range: '300-1000$', full_description: 'Найменша порода.', temperament: 'Зухвалий', trainability: 'Середня', size: 'Дуже малий', faq_json: [], image_url: '1/dog.png' },
    { id: '9586e3de-d67c-4afc-b14f-04a11111dbc6', name: 'Золотистий ретривер', species: 'Собаки', care_difficulty: 'Низька', life_span: '10-12 років', price_range: '600-1800$', full_description: 'Добряк.', temperament: 'Лагідний', trainability: 'Висока', size: 'Великий', faq_json: [], image_url: '1/dog.png' },
    { id: 'a936db7a-841a-4e85-8f54-577409a6bbed', name: 'Бігль', species: 'Собаки', care_difficulty: 'Середня', life_span: '12-15 років', price_range: '400-900$', full_description: 'Мисливець.', temperament: 'Веселий', trainability: 'Середня', size: 'Середній', faq_json: [], image_url: '1/dog.png' },
    { id: 'b57ca34a-6067-47a6-bfe6-53d5fea67f1f', name: 'Йоркширський тер\'єр', species: 'Собаки', care_difficulty: 'Висока', life_span: '13-16 років', price_range: '400-1100$', full_description: 'Маленький тер\'єр.', temperament: 'Жвавий', trainability: 'Середня', size: 'Малий', faq_json: [], image_url: '1/dog.png' },
    { id: 'caeebea3-4201-4727-b262-79eff5b6aed9', name: 'Французький бульдог', species: 'Собаки', care_difficulty: 'Низька', life_span: '10-12 років', price_range: '800-2500$', full_description: 'Компаньйон.', temperament: 'Грайливий', trainability: 'Середня', size: 'Малий', faq_json: [], image_url: '1/dog.png' },
    { id: 'ea2ba34d-f62f-4c88-86c1-60ff6fcdee5f', name: 'Джек-рассел тер\'єр', species: 'Собаки', care_difficulty: 'Середня', life_span: '13-16 років', price_range: '300-800$', full_description: 'Вічний двигун.', temperament: 'Гіперактивний', trainability: 'Висока', size: 'Малий', faq_json: [], image_url: '1/dog.png' },
    { id: 'fc281c16-0a07-46a5-8f16-7098e66de358', name: 'Ротвейлер', species: 'Собаки', care_difficulty: 'Середня', life_span: '8-10 років', price_range: '600-1500$', full_description: 'Захисник.', temperament: 'Серйозний', trainability: 'Висока', size: 'Великий', faq_json: [], image_url: '1/dog.png' },
    // ІНШІ
    { id: 'bird-001', name: 'Хвилястий папуга', species: 'Птахи', care_difficulty: 'Низька', size: 'Малий', price_range: '10-50$', full_description: 'Маленький, але дуже балакучий папуга.', faq_json: [], image_url: '1/bird.png' },
    { id: 'bird-002', name: 'Какаду', species: 'Птахи', care_difficulty: 'Висока', size: 'Великий', price_range: '1000-3000$', full_description: 'Великий папуга з чубчиком. Дуже розумний.', faq_json: [], image_url: '1/bird.png' },
    { id: 'rodent-001', name: 'Хом\'як', species: 'Гризуни', care_difficulty: 'Низька', size: 'Дуже малий', price_range: '5-20$', full_description: 'Милий пухнастик, активний вночі.', faq_json: [], image_url: '1/rodent.png' },
    { id: 'rodent-002', name: 'Шиншила', species: 'Гризуни', care_difficulty: 'Середня', size: 'Малий', price_range: '50-150$', full_description: 'М\'яка тваринка з Анд. Любить купатися в піску.', faq_json: [], image_url: '1/rodent.png' },
    { id: 'fish-001', name: 'Золота рибка', species: 'Риби', care_difficulty: 'Середня', size: 'Малий', price_range: '5-50$', full_description: 'Класична акваріумна рибка.', faq_json: [], image_url: '1/fish.png' },
    { id: 'reptile-001', name: 'Черепаха', species: 'Рептилії', care_difficulty: 'Середня', size: 'Середній', price_range: '5-200$', full_description: 'Сухопутна або водяна рептилія з панциром.', faq_json: [], image_url: '1/reptile.png' },
    { id: 'other-001', name: 'Лисиця Фенек', species: 'Інше', care_difficulty: 'Висока', size: 'Малий', price_range: '1500-3000$', full_description: 'Маленька лисичка з великими вухами.', faq_json: [], image_url: '1/other.png' },
    { id: 'other-002', name: 'Руда Лисиця', species: 'Інше', care_difficulty: 'Дуже висока', size: 'Середній', price_range: '500-1000$', full_description: 'Домашня лисиця, потребує вольєру.', faq_json: [], image_url: '1/other.png' }
];

const defaultPets = [
    { id: '3e12665b-fe63-4227-b302-c3cb6c8e7af1', owner_id: '58c7c80c-8b88-43e7-92f5-acba78860baa', breed_id: '322e3fac-76b4-4b62-8d94-48ff7fb570aa', price: 1500, description: 'Активний хлопчик.', gender: 'Male', color: 'Рудий', eye_color: 'Карий', age: '5 місяців', city: 'Одеса', is_vaccinated: true, is_pedigree: false, is_microchipped: false, is_neutered: false, is_parasite_treated: false, has_vet_passport: true, photo_urls: [] },
    { id: '4cc7d864-8da0-4a4b-a906-11e26c94cce8', owner_id: 'd858ce07-6a8f-46bf-992d-1c4c6f00d194', breed_id: '3e04b7f5-8b02-4214-93ad-005f9d117f01', price: 1000, description: 'Розумний пес.', gender: 'Male', color: 'Чорний', eye_color: 'Карий', age: '6 місяців', city: 'Дніпро', is_vaccinated: true, is_pedigree: true, is_microchipped: true, is_neutered: true, is_parasite_treated: true, has_vet_passport: true, photo_urls: [] },
    { id: '7232369a-5a77-445d-a79d-c837326c1f47', owner_id: 'c4e98220-9b28-4bed-84db-696c142dde79', breed_id: '96c0366e-484e-4465-a478-950688993773', price: 800, description: 'Лагідний котик.', gender: 'Male', color: 'Сірий', eye_color: 'Зелений', age: '4 місяці', city: 'Київ', is_vaccinated: true, is_pedigree: false, is_microchipped: false, is_neutered: false, is_parasite_treated: true, has_vet_passport: true, photo_urls: [] },
    { id: '7d937b36-9681-48f5-9c9a-55da541667b4', owner_id: '8558920d-85f3-4267-89b8-65506d45c64e', breed_id: '1890f3c8-eeda-4758-9af4-29bc397ba011', price: 1200, description: 'Красуня.', gender: 'Female', color: 'Чорно-білий', eye_color: 'Блакитний', age: '2 місяці', city: 'Львів', is_vaccinated: true, is_pedigree: false, is_microchipped: true, is_neutered: false, is_parasite_treated: true, has_vet_passport: true, photo_urls: [] },
    { id: 'cb937b08-784f-4601-ac5e-d1a381b0ace5', owner_id: '192f02ef-dede-4356-bde3-fd85edf03f06', breed_id: '446aacbb-54f9-4e43-9164-16856dd6e9ec', price: 700, description: 'Ніжна дівчинка.', gender: 'Female', color: 'Рожевий', eye_color: 'Жовтий', age: '3 місяці', city: 'Харків', is_vaccinated: false, is_pedigree: false, is_microchipped: false, is_neutered: false, is_parasite_treated: false, has_vet_passport: true, photo_urls: [] },
    { id: 'p6', owner_id: '58c7c80c-8b88-43e7-92f5-acba78860baa', breed_id: '9586e3de-d67c-4afc-b14f-04a11111dbc6', price: 1400, description: 'Золотистий.', gender: 'Male', color: 'Золотистий', eye_color: 'Карий', age: '3 місяці', city: 'Київ', is_vaccinated: true, is_pedigree: true, is_microchipped: true, is_neutered: false, is_parasite_treated: true, has_vet_passport: true, photo_urls: [] },
    { id: 'p7', owner_id: '192f02ef-dede-4356-bde3-fd85edf03f06', breed_id: '15c1ffa2-38cb-4f2c-9667-de764ec518df', price: 600, description: 'Мопсик.', gender: 'Female', color: 'Бежевий', eye_color: 'Карий', age: '1 рік', city: 'Одеса', is_vaccinated: true, is_pedigree: false, is_microchipped: false, is_neutered: true, is_parasite_treated: true, has_vet_passport: true, photo_urls: [] },
    { id: 'p_bird1', owner_id: 'c4e98220-9b28-4bed-84db-696c142dde79', breed_id: 'bird-001', price: 20, description: 'Папужка.', gender: 'Male', color: 'Синій', eye_color: 'Чорний', age: '6 місяців', city: 'Київ', is_vaccinated: false, is_pedigree: false, is_microchipped: false, is_neutered: false, is_parasite_treated: false, has_vet_passport: false, photo_urls: [] },
    { id: 'p_rodent1', owner_id: '8558920d-85f3-4267-89b8-65506d45c64e', breed_id: 'rodent-001', price: 10, description: 'Хомка.', gender: 'Male', color: 'Рудий', eye_color: 'Чорний', age: '2 місяці', city: 'Одеса', is_vaccinated: false, is_pedigree: false, is_microchipped: false, is_neutered: false, is_parasite_treated: false, has_vet_passport: false, photo_urls: [] },
    // --- НОВІ ЛИСИЧКИ ---
    { id: 'fox_1', owner_id: 'd858ce07-6a8f-46bf-992d-1c4c6f00d194', breed_id: 'other-001', price: 2500, description: 'Домашній фенек.', gender: 'Female', color: 'Пісочний', eye_color: 'Темний', age: '4 місяці', city: 'Київ', is_vaccinated: true, is_pedigree: true, is_microchipped: true, is_neutered: false, is_parasite_treated: true, has_vet_passport: true, photo_urls: [] },
    { id: 'fox_2', owner_id: 'd858ce07-6a8f-46bf-992d-1c4c6f00d194', breed_id: 'other-002', price: 800, description: 'Руда красуня.', gender: 'Male', color: 'Рудий', eye_color: 'Зелений', age: '5 місяців', city: 'Львів', is_vaccinated: true, is_pedigree: false, is_microchipped: true, is_neutered: true, is_parasite_treated: true, has_vet_passport: true, photo_urls: [] }
];

// --- ВАЖЛИВО: Перевірка на "зламану" базу (якщо там менше 5 тварин, перезаписуємо) ---
let pets = JSON.parse(localStorage.getItem('petmarket_pets')) || [];
if (pets.length < 5) {
    pets = defaultPets;
    localStorage.setItem('petmarket_pets', JSON.stringify(pets));
}

function savePets() { localStorage.setItem('petmarket_pets', JSON.stringify(pets)); }

function saveUsers() { localStorage.setItem('petmarket_users', JSON.stringify(users)); }
function saveFavorites() { localStorage.setItem('petmarket_favorites', JSON.stringify(favorites)); }
function saveRecent() { localStorage.setItem('petmarket_recent', JSON.stringify(recentlyViewed)); }

// --- ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ КАРТИНКИ ---
function getSpeciesImage(species) {
    if(!species) return '1/dog.png';
    const s = species.toLowerCase();
    if(s.includes('кот') || s.includes('cat') || s.includes('коти')) return '1/cat.png';
    if(s.includes('собак') || s.includes('dog')) return '1/dog.png';
    if(s.includes('птах') || s.includes('bird')) return '1/bird.png';
    if(s.includes('гризун') || s.includes('rodent')) return '1/rodent.png';
    if(s.includes('риб') || s.includes('fish')) return '1/fish.png';
    if(s.includes('рептил') || s.includes('reptile')) return '1/reptile.png';
    return '1/other.png';
}

window.LocalDB = {
    loginUser: function(login, password) {
        users = JSON.parse(localStorage.getItem('petmarket_users')) || defaultUsers;
        const user = users.find(u => u.login === login && u.password === password);
        if (user) {
            CURRENT_USER_ID = user.id;
            localStorage.setItem('petmarket_user_id', user.id);
            localStorage.setItem('petmarket_user_login', user.login);
            return user;
        }
        return null;
    },

    registerUser: function(login, password) {
        users = JSON.parse(localStorage.getItem('petmarket_users')) || defaultUsers;
        const exists = users.some(u => u.login === login);
        if (exists) return null;
        const newUser = { id: 'user_' + Date.now(), login: login, password: password, avatar_url: null };
        users.push(newUser);
        saveUsers();
        CURRENT_USER_ID = newUser.id;
        localStorage.setItem('petmarket_user_id', newUser.id);
        localStorage.setItem('petmarket_user_login', newUser.login);
        return newUser;
    },

    logoutUser: function() {
        CURRENT_USER_ID = null;
        localStorage.removeItem('petmarket_user_id');
        localStorage.removeItem('petmarket_user_login');
    },

    getCurrentUser: function() {
        const id = localStorage.getItem('petmarket_user_id');
        if (id) {
            CURRENT_USER_ID = id;
            let user = users.find(u => u.id === id);
            if (!user) user = { id: id, login: localStorage.getItem('petmarket_user_login') || 'User', password: '', avatar_url: null };
            return user;
        }
        return null;
    },

    // --- ОБНОВЛЕННАЯ ЛОГИКА ПОЛУЧЕНИЯ ЖИВОТНЫХ ---
    getPets: function() {
        return pets.map(pet => {
            // Если это кастомное объявление
            if (pet.is_custom) {
                const img = getSpeciesImage(pet.custom_species);
                return { 
                    ...pet, 
                    photo_urls: [img], 
                    breeds: { name: pet.custom_breed_name, species: pet.custom_species } 
                };
            }
            
            // Стандартное объявление
            const breed = breeds.find(b => b.id === pet.breed_id);
            let imageUrl = '1/dog.png';
            if (pet.photo_urls && pet.photo_urls.length > 0) imageUrl = pet.photo_urls[0];
            else if (breed) {
                imageUrl = breed.image_url || getSpeciesImage(breed.species);
            }
            return { ...pet, photo_urls: [imageUrl], breeds: breed ? { name: breed.name, species: breed.species } : { name: 'Невідомо', species: '' } };
        });
    },

    getPetById: function(id) {
        const pet = pets.find(p => p.id === id);
        if (!pet) return null;

        if (pet.is_custom) {
            const img = getSpeciesImage(pet.custom_species);
            return { 
                ...pet, 
                photo_urls: [img], 
                breeds: { name: pet.custom_breed_name, species: pet.custom_species, faq_json: [] } 
            };
        }

        const breed = breeds.find(b => b.id === pet.breed_id);
        let imageUrl = '1/dog.png';
        if (pet.photo_urls && pet.photo_urls.length > 0) imageUrl = pet.photo_urls[0];
        else if (breed) {
             imageUrl = breed.image_url || getSpeciesImage(breed.species);
        }
        return { ...pet, photo_urls: [imageUrl], breeds: breed ? { name: breed.name, species: breed.species, faq_json: breed.faq_json || [] } : { name: 'Невідомо', species: '', faq_json: [] } };
    },

    addPet: function(petData) {
        const newId = 'pet_' + Date.now();
        const newPet = {
            id: newId,
            owner_id: CURRENT_USER_ID,
            ...petData
        };
        pets.push(newPet);
        savePets();
        return newPet;
    },

    getUserPets: function(userId) {
        // Используем getPets() чтобы сразу получить обработанные данные (с именами пород)
        const all = this.getPets();
        return all.filter(p => p.owner_id === userId);
    },

    getBreeds: function() { return breeds; }, // Упростил для краткости
    getBreedById: function(id) { return breeds.find(b => b.id === id); },
    
    // Остальные функции (история, лайки, фильтры) без изменений
    addToRecentlyViewed: function(id, type) {
        let recent = JSON.parse(localStorage.getItem('petmarket_recent')) || [];
        recent = recent.filter(item => item.id !== id);
        recent.unshift({ id: id, type: type });
        if (recent.length > 15) recent.pop();
        saveRecent();
    },
    getRecentlyViewed: function() {
        const recent = JSON.parse(localStorage.getItem('petmarket_recent')) || [];
        return recent.map(item => {
            if (item.type === 'pet') {
                return this.getPetById(item.id) ? { ...this.getPetById(item.id), type: 'pet' } : null;
            } else {
                return this.getBreedById(item.id) ? { ...this.getBreedById(item.id), type: 'breed' } : null;
            }
        }).filter(item => item !== null);
    },
    isFavorite: function(targetId) { return favorites.some(f => f.user_id === CURRENT_USER_ID && f.target_id === targetId); },
    toggleFavorite: function(targetId, category) {
        const index = favorites.findIndex(f => f.user_id === CURRENT_USER_ID && f.target_id === targetId);
        if (index !== -1) { favorites.splice(index, 1); saveFavorites(); return false; }
        else { favorites.push({ user_id: CURRENT_USER_ID, target_id: targetId, category: category, created_at: new Date().toISOString() }); saveFavorites(); return true; }
    },
    getUserFavorites: function() { return favorites.filter(f => f.user_id === CURRENT_USER_ID); },
    
    filterPets: function(filters) {
        let all = this.getPets();
        return all.filter(p => {
            if (filters.searchQuery) {
                const q = filters.searchQuery.toLowerCase();
                const textMatch = p.breeds.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q));
                if (!textMatch) return false;
            }
            if (filters.priceMin && p.price < parseFloat(filters.priceMin)) return false;
            if (filters.priceMax && p.price > parseFloat(filters.priceMax)) return false;
            if (filters.gender && filters.gender !== 'Any') { if (p.gender !== filters.gender) return false; }
            if (filters.species && filters.species !== 'Інше') {
                 const map = { 'Cats': 'Коти', 'Dogs': 'Собаки', 'Birds': 'Птахи', 'Rodents': 'Гризуни', 'Fish': 'Риби', 'Reptiles': 'Рептилії' };
                 const search = map[filters.species] || filters.species;
                 if (p.breeds.species !== search && !p.breeds.species.includes(search)) return false;
            }
            return true;
        });
    },
    filterBreeds: function(filters) {
        // Упрощенная фильтрация для пород
        let all = this.getBreeds();
        return all.filter(b => {
            if (filters.searchQuery && !b.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
            if (filters.species && filters.species !== 'Інше') {
                 const map = { 'Cats': 'Коти', 'Dogs': 'Собаки' }; // и т.д.
                 const search = map[filters.species] || filters.species;
                 if (b.species !== search) return false;
            }
            return true;
        });
    }
};