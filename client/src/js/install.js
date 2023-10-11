const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    //store triggered events
    window.deferredPrompt = event;
    //remove hidden button
    butInstall.classList.toggle("hidden", false);
  });
  
  //click event handler on the `butInstall` element
  butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
      return;
    }
    //show prompt
    promptEvent.prompt();
    //deferred prompt can only be used once, we reset it here
    window.deferredPrompt = null;
  
    butInstall.classList.toggle("hidden", true);
  });
  
  // handler for the `appinstalled` event
  window.addEventListener("appinstalled", (event) => {
    window.deferredPrompt = null;
  });
