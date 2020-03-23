import { urls } from '../../utils/constants';

export const getAllCards = async () => {
   const cards=await  fetch(urls.allCardDetailsUrl, {
        method: 'GET',
        headers: {
            "content-type": 'application/json',
            "accept": 'application/json'
        },
    }).then(response => response.json())
        .catch(err => {
            return [];
        });
        return cards;
}

export const postCardToDB = async (cardNo,empName) => {
    const card=await fetch(urls.addCardToDB, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            hardwareId: cardNo,
            status: 'assigned'
        })
    })
        .then(resp => resp.json())
        return card;
}

export const getCard=(cardId)=>{
fetch(urls.allCardDetailsUrl+`/${cardId}`,{
    method:'get',
    headers: {
        "content-type": "application/json",
        "accept": "application/json"
    }
}).then(data=>data.json());
}