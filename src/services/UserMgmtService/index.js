import { urls } from '../../utils/constants';

export const getAllUsers = async () => {
    const users=await fetch(urls.allUserDetailsUrl, {
        method: 'GET',
        headers: {
            "content-type": 'application/json',
            "accept": 'application/json'
        },
    }).then(response => response.json())
        .catch(err => {
            return [];
        });
        console.log(users)
        return users;
}





export const postUserToDB = async (cardNo, empName,startDate,endDate,type) => {
  const user= await fetch(urls.addUserToDB, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            username:empName,
            hardwareId:cardNo,
            //cardId:cardNo,
            userType:type,
           // endsAt:endDate
        })
    })
        .then(resp => resp.json())
   return user;     
}


export const createUsers=(users,setFname,fname,handleClick)=>{
    fetch(urls.addUsersToDB,{
        method:'POST',
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization":"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qaEZNa016TmpjeE4wVTVRVFEzTXpGQ1FqTXdNRUV5UWpsRFFVUTNPRGc1TmtNNFEwTXpPQSJ9.eyJodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcl9tZXRhZGF0YSI6InNyZWV0ZWpyZWRkeTE5OThAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtdmctMTY2dnAuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAxMjIzNTAzMDMyMzc1NjIzMTgwIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkiLCJodHRwczovL2Rldi12Zy0xNjZ2cC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTg0NTI4NDg0LCJleHAiOjE1ODQ2MTQ4ODQsImF6cCI6Imd3SUFXcFV2YWZIc3UyS3FrdmltVWh4QzhLcGhrbnNjIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.mjpLryjZ5clPNgTQGjLmnuwnqo0tmzijg7LtIWmKdeUS4yqt0OubxUWe7Q9kI14JNy7ZMLUYZ79S0HUmJqPO99zoojgM96acCzr_GML53J-Iel1ZTRHWQ0RdLmm41G4oEZV2MjkhzgeQY_W6nDzuKrvibOtkLPHYrr3NZVwCLCtShT4nE1RxYmgih45plAeTaWU9GEIiUHs9oJTSoAeaD3GpSI7zb9L01fYl2jP4wYiCv018hrYpcKHYoN0jrcjPaW9dZR_dI2_xIt9-04yVCbBZwODXOWy7vsHiW1KgdJeJpnRdsuq8dLMaa_XgFPiv5o2U_Hv2CfN3ifsBTgxFlA"
        },
        body: JSON.stringify({
            usersList:users
        })
    }).then(data=>data.json()).then(data=>setFname(!fname)).then(x=>handleClick())
}


export const getUser=(userId)=>{
    fetch(urls.allUserDetailsUrl+`/${userId}`,{
        method:'get',
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        }

    }).then(data=>data.json());
}