const main = document.getElementById('content-in-main')
const highHeader = document.getElementById('high-header')
const header = document.querySelector('header')
const ParallaxScrollingOut = document.getElementById('Parallax-scrolling-static');
const buttonReturn = document.createElement('button');
buttonReturn.id = 'return-home';

function getHomeFunction() {

    home.style.color = 'deepskyblue'
    liveReport.style.color = 'black'
    About.style.color = 'black'

    if (highHeader !== '') {
        highHeader.innerHTML = ''
    }

    highHeader.innerText = 'Coins'

    if (ParallaxScrollingOut !== '') {
        ParallaxScrollingOut.innerHTML = ''
    }

    fetchFn();
}

let numberOfButtonsActivated = 0
let anArrayOfSelectedCurrencies = []
let anArrayOfSelectedCurrencies2

//search
const searchButton = document.getElementById('search-button')
const searchInput = document.getElementById('input-search')

searchButton.addEventListener('click', function () {

    const valueSearch = searchInput.value;
    main.style.flexWrap = 'wrap'

    fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(response => response.json())
        .then(coinsList => {
            const coin = coinsList.find(coin => coin.symbol.toLowerCase() === valueSearch.toLowerCase());

            if (coin) {

                const name = coin.name
                const symbol = coin.symbol
                const id = coin.id

                console.log(name, symbol, id)

                if (main !== '' || ParallaxScrollingOut !== '') {
                    main.innerHTML = ''
                    ParallaxScrollingOut.innerHTML = ''
                }

                highHeader.innerText = 'Results'

                createMainCoinCard(name, symbol, id)

                buttonReturn.innerText = 'Return home'
                buttonReturn.addEventListener('click', getHomeFunction)
                main.appendChild(buttonReturn)

            } else {

                if (main !== '' || ParallaxScrollingOut !== '') {
                    main.innerHTML = ''
                    ParallaxScrollingOut.innerHTML = ''
                }

                main.innerText = 'No Results :('

                buttonReturn.innerText = 'Return home'
                buttonReturn.addEventListener('click', getHomeFunction)
                main.appendChild(buttonReturn)
            }
            valueSearch = ''
        })

        .catch(error => console.error('Error fetching coin list:', error));
});

//end-of-search

//main-page

const home = document.getElementById('home')

function ParallaxScrollingFn() {
    const ParallaxScrolling = document.createElement('div')
    ParallaxScrolling.id = 'Parallax-scrolling'

    const ScrollDown = document.createElement('span')
    ScrollDown.id = 'scroll-down'
    ScrollDown.innerText = 'Scroll down ▽'


    ParallaxScrolling.appendChild(ScrollDown)
    ParallaxScrollingOut.appendChild(ParallaxScrolling)
}

window.onload = function () {


    if (highHeader !== '') {
        highHeader.innerHTML = ''
    }

    highHeader.innerText = 'Coins'

    ParallaxScrollingFn()

    fetchFn();
};

async function fetchFn() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        const json = await response.json();
        printCoins(json);

    } catch (error) {
        error = 'Something wrong'
        console.error(error);

        errorFn()
    }
}

function errorFn() {

    if (main !== '' || ParallaxScrollingOut !== '') {
        main.innerHTML = ''
        ParallaxScrollingOut.innerHTML = ''
    }

    main.innerText = 'Something wrong Now :('

    buttonReturn.innerText = 'Try again'
    buttonReturn.addEventListener('click', () => {
        location.reload()
    })
    main.appendChild(buttonReturn)
}

home.addEventListener('click', getHomeFunction);

function printCoins(data) {

    if (main !== '') {
        main.innerHTML = ''
    }

    for (let i = 0; i < 100; i++) {
        let name = data[i].name
        let symbol = data[i].symbol
        let id = data[i].id

        createMainCoinCard(name, symbol, id)
    }
}

let theLastClick

function createMainCoinCard(name, symbol, id) {

    let coinCard = document.createElement('div')
    coinCard.className = 'coin-card-out'
    coinCard.id = id;

    let inCardTitle = document.createElement('h1')
    inCardTitle.innerText = name

    let inCardSymbol = document.createElement('h2')
    inCardSymbol.innerText = symbol

    let upCard = document.createElement('div')
    upCard.className = 'up-card'
    upCard.appendChild(inCardTitle);
    upCard.appendChild(inCardSymbol);


    let buttonInfo = document.createElement('button')
    buttonInfo.className = `button-info`
    buttonInfo.innerText = '>'

    let buttonToggle = document.createElement('label');
    buttonToggle.className = 'switch';

    const checkBoxInput = document.createElement('input')
    checkBoxInput.type = 'checkbox'
    checkBoxInput.className = `checkboxOO-${id}`

    const slider = document.createElement('span')
    slider.className = 'slider round'

    buttonToggle.appendChild(checkBoxInput)
    buttonToggle.appendChild(slider)

    if (anArrayOfSelectedCurrencies.includes(name)) {
        checkBoxInput.checked = true;
    } else {
        checkBoxInput.checked = false;
    }

    checkBoxInput.addEventListener('click', function () {

        numberOfButtonsActivated = anArrayOfSelectedCurrencies.length

        const checked = checkBoxInput.checked
        let index = anArrayOfSelectedCurrencies.indexOf(name);


        if (checked === true) {
            numberOfButtonsActivated++

            if (numberOfButtonsActivated <= 5) {
                anArrayOfSelectedCurrencies.unshift(name)
            }

        }
        else {
            numberOfButtonsActivated--

            if (index !== -1) {
                anArrayOfSelectedCurrencies.splice(index, 1);
            }


        }

        if (numberOfButtonsActivated > 5) {
            theLastClick = name
            checkBoxInput.checked = false
            numberOfButtonsActivated = 5
            callPopup(name)
        }
    })

    let DownCard = document.createElement('div')
    DownCard.className = 'down-card'
    DownCard.appendChild(buttonToggle);
    DownCard.appendChild(buttonInfo);

    let Collapse = document.createElement('div')
    Collapse.className = `Collapse-open`
    Collapse.id = `collapse-${id}`;

    buttonInfo.addEventListener('click', function () {
        fetchData(id)
    })
    buttonInfo.addEventListener('mouseover', function () {
        buttonInfo.innerText = 'More Info >'
    })
    buttonInfo.addEventListener('mouseleave', function () {
        buttonInfo.innerText = '>'
    })

    coinCard.appendChild(upCard)
    coinCard.appendChild(DownCard)
    coinCard.appendChild(Collapse)

    main.appendChild(coinCard)

    main.id = 'main-with-coins'
}

function callPopup() {
    const popup = document.getElementById('popup')
    popup.style.display = 'flex'

    const popupOk = document.getElementById('agree-popup')
    const popupCancel = document.getElementById('close-popup')
    const popupMiddle = document.getElementById('middle-in-popup')

    if (popupMiddle !== '') {
        popupMiddle.innerHTML = ''
    }

    arraysButtonsAndNameForPopup(popupMiddle)

    popupOk.addEventListener('mouseover', function () {
        popupOk.innerText = 'Save changes'
        popupOk.style.padding = '14px 15px 14px 15px'
    })
    popupOk.addEventListener('mouseleave', function () {
        popupOk.innerText = 'V'
        popupOk.style.padding = '14px 40px 14px 15px'
    })
    popupOk.addEventListener('click', () => {
        clickInPopupOk(popup)
    })

    popupCancel.addEventListener('mouseover', function () {
        popupCancel.innerText = 'Cancel'
        popupCancel.style.padding = '14px 15px 14px 20px'
    })
    popupCancel.addEventListener('mouseleave', function () {
        popupCancel.innerText = 'X'
        popupCancel.style.padding = '14px 15px 14px 30px'
    })
    popupCancel.addEventListener('click', () => {
        closePopupWithOutChange(popup)
    })
}

function arraysButtonsAndNameForPopup(div) {
    for (const element of anArrayOfSelectedCurrencies) {
        const divOutButtonAndName = document.createElement('div')
        divOutButtonAndName.className = 'OutButtonAndName'

        const buttonName = document.createElement('span')
        buttonName.innerText = element

        const buttonToggle = document.createElement('label');
        buttonToggle.className = 'switch';

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.className = `checkboxOO-${element}`
        input.checked = true


        input.addEventListener('click', () => {

            anArrayOfSelectedCurrencies2 = anArrayOfSelectedCurrencies

            let index = anArrayOfSelectedCurrencies2.indexOf(element);

            if (input.checked === true) {
                anArrayOfSelectedCurrencies2.push(element)
            }
            else {

                if (index !== -1) {
                    anArrayOfSelectedCurrencies2.splice(index, 1);
                }

                console.log(anArrayOfSelectedCurrencies2)
            }
        })

        const span = document.createElement('span')
        span.className = 'slider round'

        buttonToggle.appendChild(input)
        buttonToggle.appendChild(span)

        divOutButtonAndName.appendChild(buttonName)
        divOutButtonAndName.appendChild(buttonToggle)

        div.appendChild(divOutButtonAndName)
    }
}

function clickInPopupOk(popupClose) {

    if (anArrayOfSelectedCurrencies2.length <= 4) {
        anArrayOfSelectedCurrencies2.unshift(theLastClick)
    }

    anArrayOfSelectedCurrencies = anArrayOfSelectedCurrencies2
    popupClose.style.display = 'none'

    fetchFn()
}

function closePopupWithOutChange(popupClose) {
    numberOfButtonsActivated = 5
    popupClose.style.display = 'none'
}

function fetchData(id) {

    const Collapse = document.getElementById(`collapse-${id}`);
    createProgressBar(Collapse)

    caches.open('my-cache').then(function (cache) {
        cache.match(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(function (response) {
                if (response) {
                    console.log('from cache')
                    getAPIFromCache(id);
                } else {
                    console.log('from API')
                    callAPI(id);
                }
            })
            .catch(function (error) {
                console.error('Error checking cache:', error);
            });
    });
}

function callAPI(id) {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(response => response.json())
        .then(json => {
            clearInterval(progressInterval);
            CollapseDetail(json);
            cacheData(json.id);
        })
        .catch(error => console.error('Error fetching data from API:', error));
}

function cacheData(id) {
    caches.open('my-cache').then(function (cache) {
        cache.add(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(() => console.log('Data cached'))
            .catch(() => console.error('Error caching data'));
    });
}

function getAPIFromCache(id) {
    caches.open('my-cache').then(function (cache) {
        cache.match(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(response => response.json())
            .then(json => {
                clearInterval(progressInterval);
                CollapseDetail(json);
            })
            .catch(error => console.error('Error getting data from cache:', error));
    });
}


function CollapseDetail(data) {
    const coinData = {
        id: data.id,
        img: data.image.large,
        usd: data.market_data.current_price.usd,
        eur: data.market_data.current_price.eur,
        ils: data.market_data.current_price.ils
    }
    createCollapse(coinData)
}

function createCollapse(coinData) {

    const Collapse = document.getElementById(`collapse-${coinData.id}`);

    if (Collapse.innerHTML !== '') {
        Collapse.innerHTML = ''
    }

    let CollapseIn = document.createElement('div')
    CollapseIn.className = 'Collapse-open-in'

    const profileCoin = document.createElement('img')
    profileCoin.className = 'img-collapse'
    profileCoin.src = coinData?.img;
    profileCoin.alt = `the picture can't update`

    const currencyPrices = document.createElement('ul')
    currencyPrices.className = 'currency-price'
    currencyPrices.innerHTML = `<li><span class="coins-price-tittle">USD:</span> ${coinData?.usd} <span class="sign">$</span></li>
                                <li><span class="coins-price-tittle">EUR:</span> ${coinData?.eur} <span class="sign">€</span></li>
                                <li><span class="coins-price-tittle">ILS:</span> ${coinData?.ils} <span class="sign">₪</span></li>`

    CollapseIn.appendChild(profileCoin)
    CollapseIn.appendChild(currencyPrices)

    Collapse.appendChild(CollapseIn)

    openCollapse(Collapse, coinData.id)
}

function openCollapse(element, id) {
    if (element.style.display === "flex") {
        element.style.display = "none"
        setInterval(function () {
            deleteDetailsFromCache(id);
        }, 120000);
    } else {
        element.style.display = "flex";
    }
}

function deleteDetailsFromCache(id) {
    caches.open('my-cache').then(function (cache) {
        cache.delete(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(() => console.log('Data deleted from cache'))
            .catch(error => console.error('Error deleting data from cache:', error));
    });
}

//end-of-main-page

//about-page

const About = document.getElementById('about')

About.addEventListener('click', function () {
    home.style.color = 'black'
    liveReport.style.color = 'black'
    About.style.color = 'deepskyblue'

    if (highHeader !== '') {
        highHeader.innerHTML = ''
    }

    highHeader.innerText = 'About Me ;)'

    if (ParallaxScrollingOut !== '') {
        ParallaxScrollingOut.innerHTML = ''
    }

    aboutPage();
});

function aboutPage() {
    if (main !== '') {
        main.innerHTML = ''
    }

    createAboutElements()
}

function createAboutElements() {

    const mainDiv = document.createElement('div')
    mainDiv.id = 'all-about-content'

    const profileDiv = document.createElement('div')
    profileDiv.id = 'about-profile'

    const profile = document.createElement('div')
    profile.id = 'profile'

    const profileText = document.createElement('div')
    profileText.innerHTML = `
    <span> Tzipi Farbstein </span>
    <span> 0583211059 </span>
    <span> tzipif0583211059@gmail.com </span>
    <span> 21 Haadmor misadigura street </span>
    <span> Ramat Shlomo </span>
    <span> Jerusalem </span>
    `

    profileDiv.appendChild(profile)
    profileDiv.appendChild(profileText)

    const aboutMe = document.createElement('p')
    aboutMe.id = 'about-me'

    const aboutSite = document.createElement('p')
    aboutSite.id = 'about-site'

    aboutMe.innerText = `Hi, I'm Tzipi
    Glad to meet you here,
    with the coins
    - You know, money is good for everyone ;)
    Did you want to know a little about me? So...
    I am 20 years old.
    I am still unmarried
    Israeli citizen.
    A resident of Jerusalem.
    Lives in the Ramat Shlomo neighborhood.
    Love programming languages, love design
    – and the most fun?! combine them together - - - `

    aboutSite.innerText = `
    And what about the site you are browsing now?
    So - this site was built by me as a study project at John Bryce College, and is carried out according to a characterization given to students
    The site is built in the basic client-side programming languages: HTML, CSS and JavaScript.
    As you must have seen, on this website you can get live and updated information about the popular bitcoin coins, which coins have you chosen to follow??
    Do you like secrets? Well, I find out: this site is actually a SingalPage site built from a single page. You didn't think, huh?!
    This.
    Glad we met.
    And keep loving money. but...
    Don't forget to use it too, and have fun with it ;)
   `

    mainDiv.appendChild(profileDiv)
    mainDiv.appendChild(aboutMe)
    mainDiv.appendChild(aboutSite)

    main.appendChild(mainDiv)
}

//end-of-about-page

//live-report-page

const liveReport = document.getElementById('lr')

liveReport.addEventListener('click', function () {
    home.style.color = 'black'
    liveReport.style.color = 'deepskyblue'
    About.style.color = 'black'

    if (highHeader !== '') {
        highHeader.innerHTML = ''
    }

    highHeader.innerText = 'Live Reports'

    if (ParallaxScrollingOut !== '') {
        ParallaxScrollingOut.innerHTML = ''
    }

    liveReports();
});

function liveReports() {

    if (main !== '') {
        main.innerHTML = ''
    }

    main.innerText = 'liveReports' + ' ' + anArrayOfSelectedCurrencies
}

//end-of-live-report-page

//progress-bar

function createProgressBar(parentElement) {
    const progressBar = document.createElement('div');
    progressBar.id = 'myProgress';

    const progress = document.createElement('div');
    progress.id = 'myBar';

    progressBar.appendChild(progress);
    parentElement.appendChild(progressBar);

    move(progress);
}

let progressInterval;

function move(progressElement) {
    let width = 1;
    progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
        } else {
            width++;
            progressElement.style.width = width + '%';
        }
    }, 100);
}

function createCollapse(coinData) {
    const Collapse = document.getElementById(`collapse-${coinData.id}`);

    if (Collapse.innerHTML !== '') {
        Collapse.innerHTML = '';
    }
    const progressBar = document.getElementById('myProgress');
    if (progressBar) {
        progressBar.remove();
    }

    let CollapseIn = document.createElement('div');
    CollapseIn.className = 'Collapse-open-in';

    const profileCoin = document.createElement('img');
    profileCoin.className = 'img-collapse';
    profileCoin.src = coinData?.img;
    profileCoin.alt = `the picture can't update`;

    const currencyPrices = document.createElement('ul');
    currencyPrices.className = 'currency-price';
    currencyPrices.innerHTML = `<li><span class="coins-price-tittle">USD:</span> ${coinData?.usd} <span class="sign">$</span></li>
                                <li><span class="coins-price-tittle">EUR:</span> ${coinData?.eur} <span class="sign">€</span></li>
                                <li><span class="coins-price-tittle">ILS:</span> ${coinData?.ils} <span class="sign">₪</span></li>`;

    CollapseIn.appendChild(profileCoin);
    CollapseIn.appendChild(currencyPrices);

    Collapse.appendChild(CollapseIn);

    openCollapse(Collapse, coinData.id);
}