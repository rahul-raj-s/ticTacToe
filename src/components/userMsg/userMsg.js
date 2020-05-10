import React, { useState } from "react";
import { useDispatch } from "react-redux";
import firebase from "../../firebase";
import { changeRoute } from "../router/router.action";
import { ThankYou, Home } from "../../icons";
import style from "./userMsg.module.css";
import commonStyle from "../../commonStyle.module.css";

function UserMsg(props) {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [msgStatus, setMsgStatus] = useState(false);
  const dispatch = useDispatch();

  const sendMsg = () => {
    if (msg.length > 3) {
      const database = firebase
        .firestore()
        .collection("gameStore")
        .doc("userMsg");
      database.get().then((doc) => {
        const data = doc.data();
        if (data) {
          database.update({
            msg: [...data.msg, { name, msg }],
          });
        }
      });
      setMsgStatus(true);
    }
  };

  return (
    <div className={style.userMsgContainer}>
      {!msgStatus && (
        <>
          <input
            placeholder="Enter your name"
            className={commonStyle.input}
            onChange={(event) => setName(event.target.value)}
          />
          <textarea
            className={style.userMsg}
            value={msg}
            placeholder="Type your message here"
            onChange={(event) => setMsg(event.target.value)}
          />
          <button className={commonStyle.btn} onClick={sendMsg}>
            send
          </button>
        </>
      )}
      {msgStatus && <img src={ThankYou} alt="" className={style.thankYou} />}
      <div
        variant="info"
        className={commonStyle.dummyBotton}
        onClick={() => {
          dispatch(changeRoute("home"));
        }}
      >
        <img src={Home} alt="home" className={commonStyle.navIcon} />
      </div>
    </div>
  );
}

export default UserMsg;
