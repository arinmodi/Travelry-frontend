import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Header from "components/Header";
import { Button, CircularProgress } from "@mui/material";
import Comment from "./comment";
import { useLocation, useNavigate } from "react-router";
import axios from "config/axiosInstance";
import { BASE_API_URL } from "utils/constants";
import { getDateAndTime } from "utils/dateUtils";
import NoData from "components/noData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaInfoCircle, FaRegComment } from "react-icons/fa";
import MediaUploader from "components/modal/MediaUploader";
import LoadingModel from "components/modal/LoadingModal";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { MdCancel } from "react-icons/md";

const Media = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const comments = useRef();
   const media = location.state;

   const [messages, setMessages] = useState([]);
   const messageRef = useRef([]);
   const [isLoading, setIsLoading] = useState(false);
   const [msgInput, setMsgInput] = useState("");
   const user = useSelector((state) => state.user);
   const [isCreatorLoading, setIsCreatorLoading] = useState(false);
   const [creator, setCreator] = useState();
   const [creatorModel, setCreatorModal] = useState(false);
   const [dateAndTime, setDateAndTime] = useState();
   const [isDeleting, setIsDeleting] = useState();
   const [stompClient, setStompClient] = useState(null);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 750);
   const [isCommentVisible, setIsCommentVisibe] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 750);
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const addMessages = async () => {
      if (msgInput.trim().length <= 0) {
         toast("Enter valid comment");
      } else {
         try {
            await axios.post(BASE_API_URL + `/${media.id}/comment`, {
               content: msgInput.trim(),
            });
            setMsgInput("");
         } catch (error) {
            console.log(error);
            toast("Someting bad happen");
         }
      }
   };

   const infoClicked = () => {
      const dateTime = getDateAndTime(media.created);
      setDateAndTime(dateTime[0] + ", " + dateTime[1]);
      setCreatorModal(true);
   };

   const onDelete = async () => {
      setCreatorModal(false);
      setIsDeleting(true);
      try {
         await axios.delete(BASE_API_URL + "/diary/media/", {
            data: {
               fileName: media.name,
               mediaId: media.id,
            },
         });
         toast("media deleted");
         navigate(-1);
      } catch (error) {
         console.log(error);
         toast("something bad happen");
      }
      setIsDeleting(false);
   };

   useEffect(() => {
      const getCreator = async () => {
         setIsCreatorLoading(true);
         try {
            const response = await axios.get(
               BASE_API_URL + "/user/" + media.owner
            );
            setCreator(response.data);
         } catch (error) {
            console.log(error);
         }
         setIsCreatorLoading(false);
      };

      const getCommets = async () => {
         setIsLoading(true);
         try {
            const response = await axios(BASE_API_URL + `/${media.id}/comment`);
            const data = [];
            for (let i = 0; i < response.data.length; i++) {
               const dateTime = getDateAndTime(response.data[i].created);
               const cur = response.data[i];
               cur["date"] = dateTime[0];
               cur["time"] = dateTime[1];
               cur["isShow"] = i === 0 || dateTime[0] !== data[i - 1].date;
               cur["isSelfMessage"] = response.data[i].email === user.email;
               data.push(cur);
            }
            messageRef.current = data;
            setMessages(data);
         } catch (error) {}
         setIsLoading(false);
         if (comments.current != null) {
            comments.current.scrollTop = comments.current.scrollHeight;
         }
      };

      getCommets();
      getCreator();
   }, []);

   useEffect(() => {
      const socket = new SockJS("http://localhost:8080/ws-message");
      const stomp = Stomp.over(socket);
      setStompClient(stomp);
      return () => {
         if (stompClient) {
            stompClient.disconnect();
         }
      };
   }, []);

   useEffect(() => {
      if (!stompClient || !media.id) return;
      console.log("stompclient not null");
      var sub;
      stompClient.connect(
         {},
         () => {
            sub = stompClient.subscribe(
               "/topic/comment/" + media.id,
               (paylod) => {
                  const data = [];
                  const cur = JSON.parse(paylod.body);
                  const dateTime = getDateAndTime(cur.created);
                  cur["date"] = dateTime[0];
                  cur["time"] = dateTime[1];
                  cur["isShow"] =
                     messageRef.current.length === 0 ||
                     dateTime[0] !==
                        messageRef.current[messageRef.current.length - 1].date;
                  cur["isSelfMessage"] = cur.email === user.email;
                  data.push(cur);
                  setMessages((msgs) => [...msgs, ...data]);
                  if (comments.current != null) {
                     comments.current.scrollTop = comments.current.scrollHeight;
                  }
               }
            );
         },
         (err) => {
            console.log("error during connecting");
            console.log(err);
         }
      );

      return () => {
         if (sub) {
            sub.unsubscribe();
         }
      };
   }, [stompClient]);

   const commentSectionContent = () => {
      return (
         <>
            <Header />

            <div className="comments" style={{ height: "100%" }} ref={comments}>
               {!isLoading ? (
                  messages.length > 0 ? (
                     messages.map((item, key) => (
                        <Comment key={key} message={item} />
                     ))
                  ) : (
                     <NoData message="No Comments Found" />
                  )
               ) : (
                  <div
                     style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <CircularProgress color={"primary"} />
                  </div>
               )}
            </div>

            <div className="comment-input-container">
               <input
                  type="text"
                  value={msgInput}
                  onChange={(event) => setMsgInput(event.target.value)}
                  placeholder="Enter message"
                  className="message-input"
               />

               <Button
                  variant="contained"
                  className="button-style"
                  onClick={addMessages}
               >
                  Send
               </Button>
            </div>
         </>
      );
   };

   return (
      <div className="media-container">
         <div
            className="media-sub-container"
            style={{ width: isMobile ? "100%" : "60vw" }}
         >
            {media.isVideo ? (
               <video
                  height="100%"
                  width="100%"
                  style={{ objectFit: "contain" }}
                  src={media.url}
                  controls
               />
            ) : (
               <img
                  height="100%"
                  width="100%"
                  style={{ objectFit: "contain" }}
                  src={media.url}
                  alt="media"
               />
            )}

            <div
               className="info-container"
               style={{ left: isMobile ? "80%" : "57%" }}
            >
               <FaInfoCircle className="info-icon" onClick={infoClicked} />
            </div>

            {isMobile && (
               <div className="info-container" style={{ left: "90%" }}>
                  <FaRegComment
                     className="info-icon"
                     onClick={() => setIsCommentVisibe(true)}
                  />
               </div>
            )}
         </div>

         {!isMobile ? (
            <div className="comment-container">
               <div className="comment-sub-container">
                  {commentSectionContent()}
               </div>
            </div>
         ) : (
            isCommentVisible && (
               <div className="comment-container">
                  <div
                     className="comment-sub-container"
                     style={{ width: "100%" }}
                  >
                     {commentSectionContent()}

                     <MdCancel
                        style={{
                           color: "black",
                           marginLeft: "90%",
                           fontSize: "1.5rem",
                           position:"absolute"
                        }}
                        className="hover:cursor-pointer"
                        onClick={() => {
                           setIsCommentVisibe(false);
                        }}
                     />
                  </div>
               </div>
            )
         )}

         <MediaUploader
            open={creatorModel}
            isLoading={isCreatorLoading}
            creator={creator}
            dateAndTime={dateAndTime}
            handleClose={() => setCreatorModal(false)}
            deleteMedia={onDelete}
            isMobile={isMobile}
         />

         <LoadingModel open={isDeleting} message="Deleting" />
      </div>
   );
};

export default Media;
