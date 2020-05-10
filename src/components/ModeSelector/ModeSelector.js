import React, { useEffect, useState } from "react";
import {
  PlayOnline,
  ErrorReport,
  PlaywithComputer,
  HappyTogether,
  Background,
} from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../redux/tictac.action";
import Poster from "../poster";
import { changeRoute } from "../router/router.action";
import style from "./ModeSelector.module.css";

function ModeSelector(props) {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.TictacReducer);
  const [loadingScreen, setLoadingScreen] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 30);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mode) {
      dispatch(changeRoute("login"));
    }
  }, [mode]);

  return (
    <>
      {loadingScreen ? (
        <div className={style.loader}>
          <img src={Background} alt="" className={style.bgImg} />
          <p>Loading...</p>
        </div>
      ) : (
        <div className={style.modeContainer}>
          <Poster
            mode="Play with Computer"
            icon={<img src={PlaywithComputer} className={style.icon} alt="" />}
            onClick={() => dispatch(setMode("PC"))}
          />
          <Poster
            mode="Happy Together"
            icon={<img src={HappyTogether} className={style.icon} alt="" />}
            onClick={() => dispatch(setMode("NM"))}
          />
          <Poster
            mode="Online Player"
            icon={<img src={PlayOnline} alt="" className={style.icon} />}
            onClick={() => dispatch(setMode("OP"))}
          />
          <Poster
            icon={<img src={ErrorReport} alt="" className={style.icon} />}
            mode="Report Error"
            onClick={() => dispatch(changeRoute("msg"))}
          />
        </div>
      )}
    </>
  );
}

export default React.memo(ModeSelector);
