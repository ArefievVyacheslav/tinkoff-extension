// ДЛЯ ОБСЁРВЕРОВ
const options = {
    childList: true,
    attributes: true,
    subtree: true
}
const priceOptions = {
    attributes: true
}

// КНОПКИ КУПИТЬ ПРОДАТЬ СОСТОЯНИЕ СТРАНИЦЫ
let buyButton,
    sellButton,
    loaded = false,
    currentValue = 0,
    movement = null


// ПРАЙС ОБСЁРВЕР
const priceObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        // ПОЛУЧАЮ НОВОЕ ЗНАЧЕНИЕ ЦЕНЫ
        const newValue = parseFloat(mutation.target.innerHTML.replace(' ₽', '').replace(',', '.'))
        // ЕСЛИ ЦЕНА РАЗЛИЧАЕТСЯ
        if (currentValue !== newValue) {
            // ЕСЛИ ЦЕНА РАЗЛИЧАЕТСЯ
            if (currentValue !== newValue) {
                // ЗАПИСЫВАЮ СИГНАЛ В movement
                movement = currentValue !== 0 && currentValue > newValue ? '🔴' : '🟢'
            }
            // ФИКСИРУЮ РАЗНИЦУ
            const difference = newValue - currentValue
            // ЗАПИСЫВАЮ НОВУЮ ЦЕНУ
            currentValue = newValue
            console.log(movement + ' ' + currentValue);
        }
    })
})


// САМ ОБСЁРВЕР
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        // НАХОЖУ БЛОК ЦЕНЫ
        const price = document.querySelector("div[class*='src-containers-Animated-styles-clickable-1VhfN src-containers-Animated-styles-defaultHighlighted'], " +
            "div[class*='src-containers-Animated-styles-clickable-1VhfN src-containers-Animated-styles-loss'], " +
            "div[class*='src-containers-Animated-styles-clickable-1VhfN src-containers-Animated-styles-profit']");

        if (price && !loaded) {
            buyButton = document.querySelector('.pro-button.pro-disabled.pro-fill.pro-intent-success')
            sellButton = document.querySelector('.pro-button.pro-disabled.pro-fill.pro-intent-danger')
            // ЕСЛИ КНОПКИ ПОЯВИЛИСЬ
            if (buyButton && sellButton) {

                console.log(price.innerHTML);
                // ОТКЛЮЧАЮ НАБЛЮДАТЕЛЬ
                observer.disconnect()
                // ЗАДАЮ СОСТОЯНИЕ ЗАГРУЖЕНО!!!
                loaded = true
                // ЗАПУСКАЮ СЛЕЖКУ ЗА ЦЕНОЙ
                priceObserver.observe(price, priceOptions)
            }
        }
    })
})

observer.observe(document.body, options)

console.log('Im work!');

