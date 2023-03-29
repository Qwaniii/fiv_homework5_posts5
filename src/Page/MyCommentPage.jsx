import React, {useEffect, useState, useContext} from "react"
import { UserContext } from "../Context/UserContext"
import MyComment from "../components/MyComments/MyComment"
import api from "../utils/Api"

const MyCommentPage = ({ postFromCommets }) => {
    const {currentUser} = useContext(UserContext)
    const [myComments, getMyComments] = useState([])

    useEffect(() => {
        api.getAllComments()
            .then(data => {
                getMyComments(data.filter(post => post.author._id === currentUser._id))
            })
    }, [currentUser._id])

    return (
        <div className="container">
            <h3>Мои комментарии</h3>
            <div className="comments__wrapper">
                {myComments.map((comment, index) => (
                    <MyComment comment={comment} key={index + comment.post}/>
                ))}
            </div>
        </div>
    )
}

export default MyCommentPage