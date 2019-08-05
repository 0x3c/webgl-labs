import {
  gettingStartedGuide
} from "./src";

window.onload = () => {
  const rootEle = <HTMLElement>document.getElementById("root");
  const canvasList = rootEle.getElementsByTagName("canvas");
  const canvas = canvasList[0];
  if (!canvas) {
    console.error("Not Found Canvas");
    return;
  }

  // our code here
  gettingStartedGuide.ch2._02(canvas)
};
