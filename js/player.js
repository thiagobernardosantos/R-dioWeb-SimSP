(function(){
  var STREAM = "https://hts07.brascast.com:7036/stream";
  var audio = document.getElementById("audio");
  var tuner = document.getElementById("tuner");
  var btn = document.getElementById("play");
  var title = document.getElementById("st-title");
  var sub = document.getElementById("st-sub");
  var vol = document.getElementById("vol");

  function set(state, t, s){
    tuner.classList.toggle("playing", state === "on");
    btn.setAttribute("aria-label", state === "off" ? "Ouvir ao vivo" : "Pausar");
    title.textContent = t; sub.textContent = s;
  }
  function stop(){
    audio.pause(); audio.removeAttribute("src"); audio.load();
    set("off", "Toque para ouvir", "RádioWeb SimSP, ao vivo");
  }
  function start(){
    set("on", "Conectando...", "Aguarde um instante");
    audio.src = STREAM + "?t=" + Date.now();
    audio.volume = parseFloat(vol.value);
    var p = audio.play();
    if (p && p.catch) p.catch(fail);
  }
  function fail(){
    if (!audio.getAttribute("src")) return;
    audio.pause(); audio.removeAttribute("src"); audio.load();
    set("off", "Não foi possível conectar", "Toque no play para tentar de novo");
  }
  btn.addEventListener("click", function(){ audio.getAttribute("src") ? stop() : start(); });
  audio.addEventListener("playing", function(){ set("on", "No ar agora", "RádioWeb SimSP, ao vivo"); });
  audio.addEventListener("waiting", function(){ if (audio.getAttribute("src")) set("on", "Carregando...", "Sua conexão está lenta"); });
  audio.addEventListener("error", fail);
  vol.addEventListener("input", function(){ audio.volume = parseFloat(vol.value); });
})();