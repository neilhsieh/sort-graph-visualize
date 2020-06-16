const moveBars = (bar1, bar2) => {
  // console.log(bar1, bar2);
  return new Promise((res) => {
    // const bar1 = document.querySelector(`.bar-${bar1}`);
    // const bar2 = document.querySelector(`.bar-${bar2}`);

    if (!bar1 || !bar2) {
      console.warn(bar1, bar1, bar2, bar2);
      return;
    }
    // const bar1Pos = bar1.offsetLeft;
    // const bar2Pos = bar2.offsetLeft;
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

    bar1.classList.add("bar-moving");
    bar2.classList.add("bar-moving");
    // bar1.style.left = `${bar1MoveDist}px`;
    // bar2.style.left = `${bar2MoveDist}px`;
    bar1.style.left = `${bar1Pos + bar1MoveDist}px`;
    bar2.style.left = `${bar2Pos + bar2MoveDist}px`;

    bar1.addEventListener(
      "webkitTransitionEnd",
      () => {
        bar1.classList.remove(`bar-moving`);
        bar2.classList.remove(`bar-moving`);
        res();
      },
      false
    );
  });
  // return p11.res();
};

export default moveBars;
