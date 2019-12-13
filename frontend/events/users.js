import axios from 'axios'

let getSessionUsers = (id) => {
    axios.get(`/users/${id}`).then(users => {

        users.data.map(user => {
            //select score container from page
            let score = document.querySelector(".score")

            //create score player element
            let scorePlayer = document.createElement("div")
            scorePlayer.classList.add("score__player")

            //create username element
            let scorePlayerUsername = document.createElement("p")
            scorePlayerUsername.classList.add("score__player--username")

            //append text to username element
            let node = document.createTextNode(user.User.username)
            scorePlayerUsername.appendChild(node)

            //append username element to container
            scorePlayer.appendChild(scorePlayerUsername)

            //append to DOM
            score.appendChild(scorePlayer)
        })
    })
}

module.exports = {
    getSessionUsers
}