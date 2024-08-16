const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

// const getToken = () => {
//   return {
//     headers: {
//       "Content-Type": "application/json",
//       authorization: sessionStorage.getItem("token"),
//     },
//   };
// };

const config = {
  // dataUrl: "https://api.react-learning.ru/v2/group-10",
  dataUrl: 'https://api.react-learning.ru',
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyMTgxNzU5Yjk4YjAzOGY3N2IyN2MiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNzIzODAyNTA5LCJleHAiOjE3NTUzMzg1MDl9.K33gze6T1GwkRLGkeWr3YT6OAac0vl_C0-L6B9SqkNM",
  // headers: {
  //   "Content-Type": "application/json",
  //   authorization: sessionStorage.getItem("token"),
  // },
  // freshToken: getToken,
};

class Api {
  constructor({ dataUrl, 
                // headers, 
                // freshToken,
                token }) {
    this._dataUrl = dataUrl;
    // this._headers = headers;
    // this._freshToken = freshToken;
    this._token = `Bearer ${token}`;
  }

  //Получение постов

  getPostsList() {
    return fetch(`${this._dataUrl}/posts`, {
        headers: {
            authorization: this._token,
        },
    }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._dataUrl}/users/me`, {
      // ...this._freshToken(),
      headers: {
        authorization: this._token,
    },
    }).then(onResponce);
  }

  editUserDataInfo(data) {
    return fetch(`${this._dataUrl}/users/me`, {
      method: "PATCH",
      // ...this._freshToken(),
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  editUserAvatar(avatar) {
    return fetch(`${this._dataUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
      body: JSON.stringify(avatar),
    }).then(onResponce);
  }

  editUserInfo(data, avatar) {
    return Promise.all([this.editUserInfo(data), this.editUserAvatar(avatar)]);
  }

  getAppInfo() {
    return Promise.all([this.getPostsList(), this.getUserInfo()]);
  }

  getPostById(postId) {
    return fetch(`${this._dataUrl}/posts/${postId}`, {
      // ...this._freshToken(),

      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },    }).then(onResponce);
  }

  setNewPost(data) {
    return fetch(`${this._dataUrl}/posts`, {
      method: "POST",
      // ...this._freshToken(),
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  editPostById(postId, data) {
    return fetch(`${this._dataUrl}/posts/${postId}`, {
      method: "PATCH",
      // ...this._freshToken(),
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  getAllComments() {
    return fetch(`${this._dataUrl}/posts/comments`, {
      // ...this._freshToken(),
            headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  getPostComments(postId) {
    return fetch(`${this._dataUrl}/posts/comments/${postId}`, {
      // ...this._freshToken(),
            headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  addNewComment(postId, text) {
    return fetch(`${this._dataUrl}/posts/comments/${postId}`, {
      method: "POST",
      // ...this._freshToken(),
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
      body: JSON.stringify(text),
    }).then(onResponce);
  }

  deleteComment(postId, commentId) {
    return fetch(`${this._dataUrl}/posts/comments/${postId}/${commentId}`, {
      method: "DELETE",
      // ...this._freshToken(),
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  getInfoAboutUser(userId) {
    return fetch(`${this._dataUrl}/users/${userId}`, {
      // ...this._freshToken(),
            headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  getLikePost(postID) {
    return fetch(`${this._dataUrl}/posts/likes/${postID}`, {
      method: "PUT",
      // ...this._freshToken(),
            headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  deleteLikePost(postID) {
    return fetch(`${this._dataUrl}/posts/likes/${postID}`, {
      method: "DELETE",
      // ...this._freshToken(),
            headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  changeLikePostStatus(postId, like) {
    return fetch(`${this._dataUrl}/posts/likes/${postId}`, {
      method: like ? "DELETE" : "PUT",
      // ...this._freshToken(),
            headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  deletePost(postID) {
    return fetch(`${this._dataUrl}/posts/${postID}`, {
      method: "DELETE",
      // ...this._freshToken(),
            headers: {
        authorization: this._token,
        "Content-Type": "application/json"
    },
    }).then(onResponce);
  }

  search(searchQuery) {
    return fetch(`${this._dataUrl}/posts/search/?query=${searchQuery}`, {
      // ...this._freshToken(),
    }).then(onResponce);
  }

  signIn(data) {
    return fetch(`${this._dataUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  signUp(data) {
    return fetch(`${this._dataUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(onResponce)
  }

  forgotPassword(email) {
    return fetch(`${this._dataUrl}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(email)
    }).then(onResponce)
  }

  resetPassword(newPassword, newToken) {
    return fetch(`${this._dataUrl}/password-reset/${newToken}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPassword)
    }).then(onResponce)
  }
}

const api = new Api(config);

export default api;
