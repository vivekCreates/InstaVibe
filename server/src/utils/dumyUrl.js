

export function dumyAvatar() {
    let url = ''
    for (let i = 0; i <20; i++) {
    const letter = 'abcdefghi1jklmnopqrstuvwxyz_)(*&^%$#@!'
    url+=letter[Math.floor(Math.random()*letter.length)]   
    }

    return `http://dumy.com/${url}`
}