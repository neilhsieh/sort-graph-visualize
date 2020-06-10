const moveBars = (bar1, bar2) => {
  // console.log(bar1, bar2);
  return new Promise((res) => {
    const bar1Elem = document.querySelector(`.bar-${bar1}`);
    const bar2Elem = document.querySelector(`.bar-${bar2}`);
    if (!bar1Elem || !bar2Elem) {
      console.warn(bar1, bar1Elem, bar2, bar2Elem);
      return;
    }
    const bar1Pos = bar1Elem.offsetLeft;
    const bar2Pos = bar2Elem.offsetLeft;

    const bar1MoveDist = bar2Pos - bar1Pos;
    const bar2MoveDist = -bar1MoveDist;

    bar1Elem.classList.add("bar-moving");
    bar2Elem.classList.add("bar-moving");
    bar1Elem.style.left = `${bar1MoveDist}px`;
    bar2Elem.style.left = `${bar2MoveDist}px`;

    bar1Elem.addEventListener(
      "webkitTransitionEnd",
      () => {
        bar1Elem.classList.remove(`bar-moving`);
        bar2Elem.classList.remove(`bar-moving`);
        res();
      },
      false
    );
  });
  // return p11.res();
};

export default moveBars;
