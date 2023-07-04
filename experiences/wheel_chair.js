const unSetPersonaExperience = () => {
  const imgContainer = document.getElementById("img_container");
  imgContainer.removeEventListener("pointermove", onPointerMove);
};

const setUpPersonaExperience = () => {
  const imgContainer = document.getElementById("img_container");
  imgContainer.addEventListener("pointermove", onPointerMove);
};

window.addEventListener("load", setUpPersonaExperience);
