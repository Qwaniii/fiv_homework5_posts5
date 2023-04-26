import { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import s from "./post.module.css";
import Tags from "../Tags/Tags";
import cn from "classnames";
import DelBtn from "../DelBtn/DelBtn";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";

export default function Post({
  post,
  onPostLike,
  postDelete,
  setIsLoading,
  setConfirmDelete,
  setModalDelete,
  handleTagSearch
}) {

  const { currentUser } = useContext(UserContext);

  const isAuthor = post?.author?._id === currentUser._id ? true : false;
  const isLike = post.likes.some((id) => id === currentUser._id);
  const location = useLocation();
  const pathArray = ['/my-posts', '/favorite', '/post-user', 'search-tag']

  function handleLikeClick() {
    onPostLike(post);
  }

  const deletePost = () => {
    setModalDelete(true)
    setConfirmDelete(() => () => postDelete(post))
  }

  const created = new Date(post.created_at);

  return (
    <Card className={s.post}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[100] }} aria-label="recipe">
            {isAuthor ? (
              <img
                src={currentUser.avatar}
                className={s.avatar}
                alt={currentUser.name}
              ></img>
            ) : (
              <img
                src={post.author.avatar}
                className={s.avatar}
                alt={post.author.name}
              ></img>
            )}
          </Avatar>
        }
        action={
          isAuthor && (
            <div className={s.deleteBtn}>
              <DelBtn deletePost={deletePost} />
            </div>
          )
        }
        title={
          isAuthor
            ? currentUser.name
            : post.author.name
        }
        subheader={created.toLocaleDateString("ru-RU", {
          month: "2-digit",
          day: "numeric",
          year: "numeric",
        })}
      />
      <Link
        to={
          (pathArray.some(path => (location.pathname).includes(path)))
            ? `/fo_homework4_post4/post/${post._id}`
            : `post/${post._id}`
        }
        onClick={() => setIsLoading(false)}
      >
        <CardMedia
          className={s.image}
          component="img"
          height="194"
          image={post.image}
          alt={post.title}
        />
        <CardContent className={s.text}>
          <Typography variant="body2" color="text.secondary">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {post.text.slice(0, 220)}
            {post.text.length > 220 ? "..." : ""}
            {/* {post.text} */}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing className={s.cardActions}>
        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
          <FavoriteIcon className={cn({ [s.favorite]: isLike })} />
          {post.likes.length > 0 ? (
            <span className={cn(s.numbLike, { [s.favorite]: isLike })}>
              {post.likes.length}
            </span>
          ) : (
            ""
          )}
        </IconButton>
        <IconButton className={s.comments}>
          {post.comments.length > 0 ? (
            <>
              <ChatBubbleOutlinedIcon fontSize="medium" />
              <span className={s.numberComments}>{post.comments.length}</span>
            </>
          ) : (
            ""
          )}
        </IconButton>
        <div className={s.bottomTags}>
          {post.tags.length > 0 && <IconButton  disableRipple className={s.icon} >
            {/* <ShareIcon /> */}
            {post.tags.length < 4 &&
              post.tags.map(
                (tag, index) => tag.length < 10 && <Tags tag={tag} key={index} handleTagSearch={handleTagSearch}/> 
              )}
            {post.tags.length >= 4 &&
              post.tags
                .map(
                  (tag, index) =>
                    tag.length < 10 && <Tags tag={tag} key={index} handleTagSearch={handleTagSearch}/>
                )
                .slice(0, 3)}
          </IconButton>}
        </div>
      </CardActions>
    </Card>
  );
}
