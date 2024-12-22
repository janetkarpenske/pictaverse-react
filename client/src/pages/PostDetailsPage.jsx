import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from './../firebase/config';
import classes from './../components/styles/PostDetailsPage.module.css';
import UserDashboard from "../components/UserDashboard";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditPostForm from "../components/EditPostForm";


export default function PostDetailsPage() {
    const [post, setPost] = useState(null);
    const [postID, setPostID] = useState(null);
    const [open, setOpen] = useState(false);
    const [isEditFormShowing, setIsEditFormShowing] = useState(false);
    const params = useParams();

    const navigate = useNavigate();
    let authenticatedUserUID = useSelector((state => state.user.signedInUserUID));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("Just closing")
        setOpen(false);
    };

    const handleDelete = async () => {
        console.log("Deleting...")
        try {
            await deleteDoc(doc(db, "upUserPosts", params.postId));
            navigate('/dashboard');
        }
        catch (error) {
            console.log(error);
        }
        setOpen(false);
    }

    const cancelEdit = () => {
        setIsEditFormShowing(false);
    }

    const handleEdit = () => {
        setIsEditFormShowing(true);
    }

    useEffect(() => {
        async function fetchPost() {
            try {
                const docRef = doc(db, "upUserPosts", params.postId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPostID(docSnap.id);
                    setPost(docSnap.data());
                } else {
                    alert("No such pet exists");
                }
            }
            catch (error) {
                console.log("Error occurred fetching post from Firestore.")
            }
        }

        fetchPost();
    }, [])

    return (
        <>
            {post && !isEditFormShowing && (
                <>
                    <div className={classes.postInfo}>
                        <h1>{post.upPostName}</h1>
                        <h2>{post.upCity}, {post.upState}</h2>
                        <img src={post.upImage} width="700px" alt="Post Image"></img>
                        <p>{post.upDescription}</p>
                        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris in integer mi adipiscing
                            turpis suscipit urna magna. Aptent at nam nisi arcu viverra congue facilisis per.
                            Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                            donec semper nullam curabitur montes. Viverra est scelerisque dictum ultrices nam.
                            Volutpat duis etiam vulputate magna nisi. Lectus pulvinar venenatis eu quam lacinia magnis
                            taciti nec nascetur.</p>
                        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris in integer mi adipiscing
                            turpis suscipit urna magna. Aptent at nam nisi arcu viverra congue facilisis per.
                            Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                            donec semper nullam curabitur montes. Viverra est scelerisque dictum ultrices nam.
                            Volutpat duis etiam vulputate magna nisi. Lectus pulvinar venenatis eu quam lacinia magnis
                            taciti nec nascetur. Aptent at nam nisi arcu viverra congue facilisis per.
                            Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                            donec semper nullam curabitur montes</p>
                        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris in integer mi adipiscing
                            turpis suscipit urna magna. Aptent at nam nisi arcu viverra congue facilisis per.
                            Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                            donec semper nullam curabitur montes. Viverra est scelerisque dictum ultrices nam.
                            Volutpat duis etiam vulputate magna nisi. Lectus pulvinar venenatis eu quam lacinia magnis
                            taciti nec nascetur.</p>
                    </div>
                    {authenticatedUserUID === post.upUserUID && (
                        <div className={classes.postTools}>
                            <button onClick={handleClickOpen}>Delete</button>
                            <button onClick={handleEdit}>Edit</button>
                        </div>)}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you would like to delete your post?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you would like to delete your post?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleDelete} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
            {isEditFormShowing && (
                <EditPostForm post={post} postId={postID} cancelEdit={() => cancelEdit()} />
            )}
        </>
    )
}