// setting the HTML element buttonInstall to a JS constant
const butInstall = document.getElementById('buttonInstall');

// nstalling the PWA
window.addEventListener("beforeinstallprompt", (event) => {
//preventing the browser default
    event.preventDefault();
    //store triggered events
    window.deferredPrompt = event;
    //toggle to make the button hidden 
    butInstall.classList.toggle("hidden", false);
  });
  
  //click event handler on the `butInstall` element
  butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
  // if it is not the prompt event end the function
    if (!promptEvent) {
      return;
    }
    //show prompt
    promptEvent.prompt();
    //deferred prompt can only be used once, we reset it here
    window.deferredPrompt = null;
  //toggle to make the button visible
    butInstall.classList.toggle("hidden", true);
  });
  
  // handler for the `appinstalled` event
  window.addEventListener("appinstalled", (event) => {
    window.deferredPrompt = null;
  });
