const onKeyPress = (ev) => {
  const imgContainer = document.getElementById("img_container");
  const eater = document.getElementById("eater");
  const eatBtn = document.getElementById("eat_btn");
  const initialX = imgContainer.getBoundingClientRect().x;
  const finalX = initialX + imgContainer.getBoundingClientRect().width;
  let position = eater.getBoundingClientRect().x;

  if (ev.key === "d" && position < finalX)
  {
    position += 10;
  } else if (ev.key === "a" && position > initialX) {
    position -= 10;
  }
  
  if ((position + initialX) >= eatBtn.getBoundingClientRect().x) {
    eatBtn.focus();
  }
  
  eater.style.left = `${position-initialX}px`;
};

const unSetPersonaExperience = () => {
  const eater = document.getElementById("eater");

  eater.style.left = "0px";
  window.removeEventListener("keypress", onKeyPress);
};

const setUpPersonaExperience = () => {
  window.addEventListener("keypress", onKeyPress);
};

const simulation = {
  on: () => {
    const imgContainer = document.getElementById("img_container");
    imgContainer.removeEventListener("pointermove", onPointerMove);
  },
  off: () => {
    const imgContainer = document.getElementById("img_container");
    imgContainer.addEventListener("pointermove", onPointerMove);
  }
}

const accessible  = {
  on: () => {
    const eatBtn = document.getElementById("eat_btn");
    eatBtn.tabIndex = 0;
    setUpPersonaExperience();
  },
  off: () => {
    const eatBtn = document.getElementById("eat_btn");
    eatBtn.tabIndex = -1;
    unSetPersonaExperience();
  }
}
