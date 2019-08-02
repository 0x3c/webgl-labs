import {
  gettingStartedGuide
} from "./src";

window.onload = () => {
  const rootEle = document.getElementById("root");
  const canvasList = (<HTMLElement>rootEle).getElementsByTagName("canvas");
  const canvas = canvasList[0];
  if (!canvas) {
    console.error("Not Found Canvas");
    return;
  }

  // our code here
  gettingStartedGuide.ch1_01(canvas);
};
