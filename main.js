class Switch {
  constructor(domNode, callback, resetCallback) {
    this.switchNode = domNode;
    this.callback = callback;
    this.resetCallback = resetCallback;
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
    
    if (newState === "true") {
      this.callback();
    } else {
      this.resetCallback();
    }

    this.switchNode.setAttribute("aria-checked", newState);
  }
}

let accessibilitySwitch, simulationSwitch;

const setUpSwitches = () => {
  const simulationSwitchNode = document.getElementById("switch_simulation");
  const accessibilitySwitchNode = document.getElementById("switch_accessible");

  if (simulationSwitchNode && accessibilitySwitchNode)
  {
    simulationSwitch = new Switch(simulationSwitchNode, simulation.on, simulation.off);
    accessibilitySwitch = new Switch(accessibilitySwitchNode, accessible.on, accessible.off);
  }
};

const confettiEffect = () => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 1.2,
      shapes: ["circle", "square"],
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });
  
    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 2,
      shapes: ["text"],
      shapeOptions: {
        text: {
          value: ["🦄", "🌈"],
        },
      },
    });
  }
  
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

const announceWin = () => {
  const liveRegion = document.getElementById("live_region");
  const alert = document.createElement('p');
  alert.textContent = "You are the winner!";

  setTimeout(() => {
      alert.remove();
  }, 1000);

  liveRegion.appendChild(alert);
}

const winEffect = () => {
  confettiEffect();
}

const onEatBtnClick = () => {
  const eatBtn = document.getElementById("eat_btn");
  const overlay = document.getElementById("overlay");
  const overlayBtn = document.querySelector("#overlay button");
  
  overlay.style.display = "flex";
  eatBtn.style.display = "none";
  overlayBtn.focus();
  winEffect();
  announceWin();
  unsetExperience();

  if (accessibilitySwitch?.switchNode.getAttribute("aria-checked") === "true")
  {
    accessibilitySwitch.resetCallback();
  }
}

const onPointerMove = (ev) => {
  const imgContainer = document.getElementById("img_container");
  const eater = document.getElementById("eater");
  const initialX = imgContainer.getBoundingClientRect().x;
  const eaterWidth = eater.getBoundingClientRect().width;
  eater.style.left = `${ev.clientX - eaterWidth / 2 - initialX}px`;
};

const unsetExperience = () => {
  const imgContainer = document.getElementById("img_container");
  imgContainer.removeEventListener("pointermove", onPointerMove);
}

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

  imgContainer.addEventListener("pointermove", onPointerMove);
  eatBtn.addEventListener("focus", () => {
    eater.style.left = `${finalX - eaterWidth - initialX}px`;
  });
  eatBtn.addEventListener("click", onEatBtnClick);

  overlayBtn.onclick = () => {
    overlay.style.display = "none";
    eatBtn.style.display = "initial";
    setUpExperience();
    if (accessibilitySwitch?.switchNode.getAttribute("aria-checked") === "true")
    {
      accessibilitySwitch.callback();
    }
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
