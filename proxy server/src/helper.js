
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
const querySerialize = (obj) => {
  return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
}

module.exports={
    bodyEncode,querySerialize
}