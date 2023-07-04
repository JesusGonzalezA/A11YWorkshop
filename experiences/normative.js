const onPointerMove = (ev) => {
  const imgContainer = document.getElementById("img_container");
  const eater = document.getElementById("eater");
  const initialX = imgContainer.getBoundingClientRect().x;
  const eaterWidth = eater.getBoundingClientRect().width;
  eater.style.left = `${ev.clientX - eaterWidth / 2 - initialX}px`;
};

const unsetNormativeExperience = () => {
  const imgContainer = document.getElementById("img_container");
  imgContainer.removeEventListener("pointermove", onPointerMove);
};

const setUpNormativeExperience = () => {
  const imgContainer = document.getElementById("img_container");
  imgContainer.addEventListener("pointermove", onPointerMove);
};

window.addEventListener("load", setUpNormativeExperience);
