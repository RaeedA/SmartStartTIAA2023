export async function CallAPI(url, message) {
    const response = await fetch("http://localhost:3001/" + url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
    return response.json()
}