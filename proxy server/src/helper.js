
const bodyEncode = (username,password) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "");
    urlencoded.append("scope", "");
    urlencoded.append("client_id", "");
    urlencoded.append("client_secret", "");
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    return urlencoded
}


module.exports={
    bodyEncode
}