const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

class Api {

    constructor({ dataUrl, token }) {
        this._dataUrl = dataUrl;
        this._token = `Bearer ${token}`
    }

    //Получение постов

    getPostsList(page = 1) {
        return fetch(`${this._dataUrl}/posts?page=${page}`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce);
    }

    getUserInfo() {
        return fetch(`${this._dataUrl}/users/me`, {
            headers: {
                authorization: this._token,
            }, 
        }).then(onResponce);
    }

    editUserDataInfo(data) {
        return fetch(`${this._dataUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }
    
    editUserAvatar(avatar) {
        return fetch(`${this._dataUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(avatar)
        }).then(onResponce)
    }

    editUserInfo(data, avatar) {
        return Promise.all([this.editUserInfo(data), this.editUserAvatar(avatar)]);
    }

    getAppInfo() {
        return Promise.all([this.getPostsList(), this.getUserInfo()]);
    }

    getPostById(postId) {
        return fetch(`${this._dataUrl}/posts/${postId}`, {
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce);
    }

    setNewPost(data) {
        return fetch(`${this._dataUrl}/posts`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(onResponce);
    }

    getPostComments(postId) {
        return fetch(`${this._dataUrl}/posts/comments/${postId}`, {
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce)
    }

    getLikePost(postID) {
        return fetch(`${this._dataUrl}/posts/likes/${postID}`, {
            method: "PUT",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce);
    }

    deleteLikePost(postID) {
        return fetch(`${this._dataUrl}/posts/likes/${postID}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce);
    }

    changeLikePostStatus(postId, like) {
		return fetch(`${this._dataUrl}/posts/likes/${postId}`, {
			method: like ? "DELETE" : "PUT",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
		}).then(onResponce);
	}

    deletePost(postID) {
        return fetch(`${this._dataUrl}/posts/${postID}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce);
    }

    search(searchQuery) {
        return fetch(`${this._dataUrl}/posts/search/?query=${searchQuery}`, {
            headers: {
                authorization: this._token,
            }
        }).then(onResponce);
    }
}

const config = {
    dataUrl: 'https://api.react-learning.ru/v2/group-10',
    // dataUrl: 'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyMTgxNzU5Yjk4YjAzOGY3N2IyN2MiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzYxODg2LCJleHAiOjE3MDcyOTc4ODZ9.kbO5ITay5Wc1iGc28jtfJQ6VVMk3StpsVWNFql8W7TE'
}

const api = new Api(config);

export default api;