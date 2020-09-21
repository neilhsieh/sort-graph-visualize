// function whichTransitionEvent() {
//   var el = document.createElement("fake"),
//     transEndEventNames = {
//       WebkitTransition: "webkitTransitionEnd", // Saf 6, Android Browser
//       MozTransition: "transitionend", // only for FF < 15
//       transition: "transitionend", // IE10, Opera, Chrome, FF 15+, Saf 7+
//     };

//   for (var t in transEndEventNames) {
//     if (el.style[t] !== undefined) {
//       return transEndEventNames[t];
//     }
//   }
// }

// const transEndEventName = whichTransitionEvent();

const moveBars = (bar1, bar2) => {
  // console.log(bar1, bar2);
  return new Promise((res) => {
    // const bar1 = document.querySelector(`.bar-${bar1}`);
    // const bar2 = document.querySelector(`.bar-${bar2}`);
    console.log(
      bar1.getAttribute("data-value"),
      bar2.getAttribute("data-value")
    );

    if (!bar1 || !bar2) {
      console.warn(bar1, bar1, bar2, bar2);
      return;
    }

    if (bar1 === bar2) {
      console.log("THE SAME");
      return res();
    }

    // console.log(
    //   "--left assigned",
    //   bar1.getAttribute("data-value"),
    //   bar2.getAttribute("data-value")
    // );

    const bar1Pos = parseInt(
      bar1.style.left.split("px")[0] === "" ? 0 : bar1.style.left.split("px")[0]
    );
    const bar2Pos = parseInt(
      bar2.style.left.split("px")[0] === "" ? 0 : bar2.style.left.split("px")[0]
    );

    const bar1AbsLeft = bar1.getBoundingClientRect().x;
    const bar2AbsLeft = bar2.getBoundingClientRect().x;

    const bar1MoveDist = bar2AbsLeft - bar1AbsLeft;
    const bar2MoveDist = bar1AbsLeft - bar2AbsLeft;

    // console.log(
    //   "----bar moving class added",
    //   bar1.getAttribute("data-value"),
    //   bar2.getAttribute("data-value")
    // );
    bar1.classList.add("bar-moving");
    bar2.classList.add("bar-moving");

    // bar1.style.left = `${bar1MoveDist}px`;
    // bar2.style.left = `${bar2MoveDist}px`;
    bar1.style.left = `${bar1Pos + bar1MoveDist}px`;
    bar2.style.left = `${bar2Pos + bar2MoveDist}px`;
    // console.log(
    //   "------ contains classlist",
    //   bar1.classList.contains("bar-moving"),
    //   bar2.classList.contains("bar-moving")
    // );
    console.log("---- transition started");

    // const removeEvt = (bar1) => {
    //   bar1.removeEventListener("webkitTransitionEnd", webkitListenerEvt, true);
    // };

    // const webkitListenerEvt = (bar1) => {
    //   console.log(bar1.classList.contains("bar-moving"));

    //   console.log("-------- transitionended");
    //   // console.log("");

    //   bar1.classList.remove(`bar-moving`);
    //   bar2.classList.remove(`bar-moving`);
    //   removeEvt(bar1);
    //   res();
    // };
    if (bar1.classList.contains("bar-moving")) {
      bar1.addEventListener(
        "webkitTransitionEnd",
        () => {
          console.log(bar1.classList.contains("bar-moving"));

          console.log("-------- transitionended");
          // console.log("");

          bar1.classList.remove(`bar-moving`);
          bar2.classList.remove(`bar-moving`);
          res();
        },
        { once: true }
      );
    }
  });
  // return p11.res();
};

export default moveBars;
