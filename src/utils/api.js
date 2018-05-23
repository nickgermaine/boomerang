import axios from 'axios';

let host = 'http://localhost:3000/api/';
let mailhost = 'http://localhost:8080/';

const api = {
    RegisterUser: (data, success) => {
        axios.post(`${host}users/`, data)
            .then(res => {
                success(res);
            })
    },
    LoginUser: (data, success) => {
        axios.post(`${host}users/login?include=user`, data, {params: {
            include: JSON.stringify({"user": "Profile"})

        }})
            .then(res => {
                success(res);
            })
    },
    getFolders: (user, success) => {
        axios.get(`${mailhost}get-folders?user=${user.username}&password=${user.password}`)
            .then(res => {
                success(res);
            })
    },

    getContacts: (user, success) => {
        axios.get(`${mailhost}get-contacts?user=${user.username}&password=${user.password}`)
            .then(res => {
                success(res);
            })
    },

    pollFolder: (box, user, success) => {
        axios.get(`${mailhost}poll-folder?box=${box}&user=${user.username}&password=${user.password}`)
            .then(res => {
                success(res);
            })
    },
    getMailboxMessages: (box, user, success) => {
        axios.get(`${mailhost}get-box-messages?box=${box}&user=${user.username}&password=${user.password}`)
            .then(res => {
                success(res);
            })
    },
    getRelatedMessages: (references, user, id, box, success) => {
        axios.get(`${mailhost}get-related-messages?user=${user.username}&password=${user.password}&references=${references}&id=${id}&box=${box}`)
            .then(res => {
                success(res);
            })
    },
    sendMessage: (message, user, success) => {
        axios.post(`${mailhost}send`, JSON.stringify({message: message,
            user: user
        }))
            .then(res => {
                success(res);
            })
    },
    markMessagesDone: (ids, user, success) => {
        axios.get(`${mailhost}mark-done?user=${user.username}&password=${user.password}&box=INBOX&ids=${ids.join(',')}`)
            .then(res => {
                success(res);
            })
    },
    getMessages: (user, pass, success) => {
        console.log("getting emails");
        axios.get(`${mailhost}get-messages?user=${user}&password=${pass}`)
            .then(res => {
                success(res);
            }).catch(err => {
                console.log("ERROR", err);
        })

        /*
        axios.get(`http://localhost:8080/get-messages?user=${user}&password=${pass}`)
            .then(res => {
                console.log("RES", res);
                success(res);
            })
            */
    },
    updateProfile: (profile, success) => {
      axios.patch(`${host}Profiles/${profile.id}`, profile, {params: {
          filter: JSON.stringify({
              include: {"user": {"Post": [{"Comments": {"user": "Profile"}}, "Likes", {"user": "Profile"}]}}
          })
      }})
          .then(res => {
              success(res);
          })
    },
    getProfile: (username, userId, success) => {
        if (username) {
            axios.get(`${host}Profiles/findOne`, {
                params: {
                    filter: JSON.stringify({
                        where: {
                            username: username
                        },
                        include: {"user": {"Post": [{"Comments": {"user": "Profile"}}, "Likes", {"user": "Profile"}]}}
                    })
                }
            })
                .then(res => {
                    success(res);
                })
        }else{
            axios.get(`${host}Profiles`, {params: {
                filter: JSON.stringify({
                    where: {
                        userId: userId
                    },
                    include: {"user": {"Post": [{"Comments": {"user": "Profile"}}, "Likes", {"user": "Profile"}]}}
                })
            }})
                .then(
                    res => {
                        success(res);
                    }
                )
        }
    },
    addPost: (data, success) => {
        axios.post(`${host}Posts`, data, {params: {
            filter: JSON.stringify({
                include: [{"Comments": {"user": "Profile"}}, "Likes", {"user": "Profile"}]
            })
        }})
            .then(res => {
                success(res);
            })
    },
    addComment: (comment, success) => {
        axios.post(`${host}Comments`, comment, {params: {
            filter: JSON.stringify({
                include: {"user": "Profile"}
            })
        }})
            .then(res => {
                success(res);
            })
    },
    deleteComment: (id, success) => {
        axios.delete(`${host}Comments/${id}`)
            .then(res => {
                success(res);
            })
    }

};

export default api;