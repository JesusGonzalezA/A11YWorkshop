class Switch {
  constructor(domNode) {
    this.switchNode = domNode;
    this.switchNode.addEventListener("click", () => this.toggleStatus());
    this.switchNode.addEventListener("keydown", (event) =>
      this.handleKeydown(event)
    );
  }

  handleKeydown(event) {
    // Only do something when space or return is pressed
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleStatus();
    }
  }

  // Switch state of a switch
  toggleStatus() {
    const currentState =
      this.switchNode.getAttribute("aria-checked") === "true";
    const newState = String(!currentState);

    this.switchNode.setAttribute("aria-checked", newState);
  }
}

const setUpSwitches = () => {
  Array.from(document.querySelectorAll("[role^=switch]")).forEach(
    (element) => new Switch(element)
  );
};

const setUpExperience = () => {
  const experience = document.getElementById("experience");
  if (!experience) return;

  const eatBtn = document.getElementById("eat_btn");
  const overlay = document.getElementById("overlay");
  const overlayBtn = document.querySelector("#overlay button");
  const eater = document.getElementById("eater");
  const imgContainer = document.getElementById("img_container");

  const initialX = imgContainer.getBoundingClientRect().x;
  const eaterWidth = eater.getBoundingClientRect().width;
  const finalX = eatBtn.getBoundingClientRect().x;
  const width = window.innerWidth * 0.6;
  const height = window.innerHeight * 0.8;
  const radius = window.innerHeight * 0.065;
  const coordX = 0.765 * width;
  const coordY = 0.43 * height;

  eatBtn.style.width = `${radius * 2}px`;
  eatBtn.style.height = `${radius * 2}px`;
  eatBtn.style.top = `${coordY - radius}px`;
  eatBtn.style.left = `${coordX - radius}px`;

  eatBtn.addEventListener("focus", () => {
    eater.style.left = `${finalX - eaterWidth - initialX}px`;
  });
  eatBtn.onclick = () => {
    overlay.style.display = "flex";
    eatBtn.style.display = "none";
    overlayBtn.focus();
    unsetNormativeExperience();
  };
  overlayBtn.onclick = () => {
    overlay.style.display = "none";
    eatBtn.style.display = "initial";
    setUpNormativeExperience();
  };
};

const setUpSkipToMain = () => {
  const skipToMain = document.getElementById("skip_content");
  const main = document.getElementsByTagName("main")[0];

  skipToMain.onclick = () => main.focus();
};

const onLoad = () => {
  setUpSkipToMain();
  setUpSwitches();
  setUpExperience();
};

window.addEventListener("load", onLoad);
window.onresize = setUpExperience;
