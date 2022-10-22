'use strict'

//verificar se  o usuario deu enter com a palavra do search

const searchImages = async (text) => {
    //consumindo a api
    const key = '30788460-317c618ed813ce114d3d4fac1'
    const url = `https://pixabay.com/api/?key=${key}&q=${text}`
    const response = await fetch(url)
    return response.json()
}

const createCard = ({webformatURL, pageURL}) => {
    const card = document.createElement('div')
    card.classList.add('card-container')
    card.innerHTML = `
        <a href='${pageURL}' class="card-image">
            <img src=${webformatURL}>
        </a>
    `
    return card
}

const loadGallery = async (text) => {
    const container = document.querySelector('.container-gallery')
    const{hits} = await searchImages (text)
    //CRIACAO DOS CARDS .map é para listar as imagens uma a uma
    const cards = hits.map(createCard)
    container.replaceChildren(...cards)
    console.log(cards)
}                        //hits é para receber a quantidade de imagens que a api manda

const handleKeypress = ({key, target}) => {
    if(key == 'Enter'){
        loadGallery(target.value)
    }
}

document.querySelector('#search-input')
        .addEventListener('keypress', handleKeypress)