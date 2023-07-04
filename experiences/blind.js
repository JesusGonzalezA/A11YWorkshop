  const simulation = {
    on: () => {
      document.body.style.filter = "blur(5px)"
    },
    off: () => {
      document.body.style.filter = null;
    }
  }
  
  const accessible  = {
    on: () => {
      const eatBtn = document.getElementById("eat_btn");
      
      eatBtn.role = "button";
      eatBtn.title = "Eat the donut";
    },
    off: () => {
      const eatBtn = document.getElementById("eat_btn");

      eatBtn.role = "presentation";
      eatBtn.title = "";
    }
  }

  window.addEventListener("load", () => {
    const eatBtn = document.getElementById("eat_btn");

    eatBtn.addEventListener("keypress", (ev) => {
        if (ev.code === "Space" || ev.code === "Enter")
            onEatBtnClick();
    })
  })
  