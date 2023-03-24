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

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function Post({
  post,
  onPostLike,
  postDelete,
  anchorEl,
  handleClick,
  handleClose,
  setIsLoading,
}) {
  const { currentUser } = useContext(UserContext);

  const isAuthor = post.author._id === currentUser._id ? true : false;
  const isLike = post.likes.some((id) => id === currentUser._id);
  const location = useLocation();
  const pathArray = ['/my-posts', '/favorite']

  function handleLikeClick() {
    onPostLike(post);
  }

  function deletePost() {
    postDelete(post);
  }
  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  const created = new Date(post.created_at);

  return (
    // <Card sx={{ width: 250 }}>
    <Card className={s.post}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[100] }} aria-label="recipe">
            {post.author.avatar === currentUser.avatar ? (
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
            // <IconButton aria-label="settings">
            <div className={s.deleteBtn}>
              <DelBtn deletePost={deletePost} />
            </div>
          )
          // </IconButton>
        }
        title={
          post.author.name === currentUser.name
            ? currentUser.name
            : post.author.name
        }
        // subheader={post.created_at.slice(0, 10).split("-").reverse().join(".")}
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
            {post.text.slice(0, 200)}
            {post.text.length > 200 ? "..." : ""}
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
        <IconButton aria-label="share" className={s.icon}>
          {/* <ShareIcon /> */}
          {post.tags.length < 4 &&
            post.tags.map(
              (tag, index) => tag.length < 10 && <Tags tag={tag} key={index} />
            )}
          {post.tags.length >= 4 &&
            post.tags
              .map(
                (tag, index) =>
                  tag.length < 10 && <Tags tag={tag} key={index} />
              )
              .slice(0, 3)}
        </IconButton>
      </CardActions>
    </Card>
  );
}
